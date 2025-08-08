import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage'
import { toast } from 'sonner'
import { employeeTableRef, storage } from '@/lib/firebase'
import { handleFirestoreError } from '@/lib/utils/error-handler'
import { useEmployeeStore } from '@/stores/employee-store'
import {
  type CreateEmployeeData,
  EmployeePosition,
  type EmployeeType,
} from '@/types/employee-type'

export const useEmployees = () => {
  const {
    employees,
    setEmployees,
    addEmployee,
    updateEmployeeStore,
    deactivateEmployee,
  } = useEmployeeStore()

  const getEmployees = async () => {
    try {
      const data = await getDocs(employeeTableRef)
      const employeeData = data.docs.map(employeeDoc => ({
        ...employeeDoc.data(),
        uid: employeeDoc.id,
        createdAt: employeeDoc.data().createdAt?.toDate
          ? employeeDoc.data().createdAt.toDate()
          : employeeDoc.data().createdAt,
        updatedAt: employeeDoc.data().updatedAt?.toDate
          ? employeeDoc.data().updatedAt.toDate()
          : employeeDoc.data().updatedAt,
      })) as EmployeeType[]
      setEmployees(employeeData)
    } catch (error) {
      handleFirestoreError(error)
    }
  }

  const getEmployeeById = (id: string) => {
    const employee = employees.find(emp => emp.uid === id)
    return employee || null
  }

  const createEmployee = async ({
    data,
    profilePicture,
  }: {
    data: CreateEmployeeData
    profilePicture?: File
  }) => {
    try {
      let profilePictureUrl: string | undefined
      if (profilePicture) {
        const storagePath = `profilePictures/${Date.now()}_${profilePicture.name}`
        const imageRef = storageRef(storage, storagePath)
        const uploadResult = await uploadBytes(imageRef, profilePicture)
        profilePictureUrl = await getDownloadURL(uploadResult.ref)
      }

      const newEmployeeData = {
        ...data,
        profilePictureUrl,
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      const docRef = await addDoc(employeeTableRef, newEmployeeData)

      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const createdEmployeeWithId = {
          ...docSnap.data(),
          uid: docSnap.id,
          createdAt: docSnap.data().createdAt?.toDate
            ? docSnap.data().createdAt.toDate()
            : docSnap.data().createdAt,
          updatedAt: docSnap.data().updatedAt?.toDate
            ? docSnap.data().updatedAt.toDate()
            : docSnap.data().updatedAt,
        } as EmployeeType
        addEmployee(createdEmployeeWithId)
      }
      toast.success('Employee created successfully!')
      return newEmployeeData
    } catch (error) {
      handleFirestoreError(error)
      return null
    }
  }

  const updateEmployee = async (
    id: string,
    updates: Partial<EmployeeType>,
    profilePicture?: File
  ): Promise<boolean> => {
    try {
      const docRef = doc(employeeTableRef, id)
      const updateData: Partial<EmployeeType> = {
        ...updates,
      }

      if (profilePicture) {
        const storagePath = `profilePictures/${id}_${Date.now()}_${profilePicture.name}`
        const imageRef = storageRef(storage, storagePath)
        const uploadResult = await uploadBytes(imageRef, profilePicture)
        updateData.profilePictureUrl = await getDownloadURL(uploadResult.ref)
      }

      await updateDoc(docRef, updateData)
      await addToHistory(
        id,
        'Employee updated',
        'Employee information was updated'
      )

      updateEmployeeStore(id, {
        ...updates,
        profilePictureUrl: updateData.profilePictureUrl,
        updatedAt: new Date().toISOString(),
      })
      toast.success('Employee updated successfully!')
      return true
    } catch (error) {
      handleFirestoreError(error)
      return false
    }
  }

  const deactivateEmployeeById = async (id: string): Promise<boolean> => {
    try {
      const docRef = doc(employeeTableRef, id)
      await updateDoc(docRef, {
        isActive: false,
        updatedAt: serverTimestamp(),
      })
      await addToHistory(
        id,
        'Employee deactivated',
        'Employee was deactivated from the system'
      )
      deactivateEmployee(id)
      toast.success('Employee deactivated successfully!')
      return true
    } catch (error) {
      handleFirestoreError(error)
      return false
    }
  }

  const addToHistory = async (
    employeeId: string,
    action: string,
    details?: string
  ) => {
    try {
      const docRef = doc(employeeTableRef, employeeId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const currentData = docSnap.data()
        const currentHistory = currentData.history || []
        const newHistoryEntry = {
          action,
          date: new Date().toISOString(),
          details,
        }
        await updateDoc(docRef, {
          history: [...currentHistory, newHistoryEntry],
        })
      }
    } catch (error) {
      console.error('Error adding to history:', error)
    }
  }

  const promoteEmployee = async (
    employeeId: string,
    newPosition: EmployeePosition | string
  ): Promise<boolean> => {
    try {
      const docRef = doc(employeeTableRef, employeeId)
      await updateDoc(docRef, {
        position: newPosition,
        updatedAt: serverTimestamp(),
      })
      await addToHistory(
        employeeId,
        'Employee Promoted',
        `Employee promoted to ${newPosition}`
      )
      updateEmployeeStore(employeeId, {
        position: newPosition,
        updatedAt: new Date().toISOString(),
      })
      toast.success(`Employee promoted to ${newPosition} successfully!`)
      return true
    } catch (error) {
      handleFirestoreError(error)
      return false
    }
  }

  return {
    employees,
    promoteEmployee,
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deactivateEmployeeById,
  }
}
