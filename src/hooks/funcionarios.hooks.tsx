import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { employeeTableRef, storage } from '@/lib/firebase'

export type EmployeeType = {
  id?: string
  name: string
  gender: string
  email: string
  street: string
  number: string
  zipCode: string
  city: string
  state: string
  phoneNumber: string
  profilePictrure?: File
  profilePictureUrl?: string
  birthDate: string
  position: string
  admissionDate: string
  department: string
  salary: number
  isActive: boolean
  historic: {
    ocurred: string
    date: string
  }[]
}

export function getEmployees(): EmployeeType[] {
  const [employees, setEmployees] = useState<EmployeeType[]>([])

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getDocs(employeeTableRef)
      console.log(data)
      const employeeData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as EmployeeType[]
      setEmployees(employeeData)
    }
    fetchEmployees()
  }, [])

  return employees
}
export function getEmployeesAtivos(): EmployeeType[] {
  const [employeesAtivos, setEmployeesAtivos] = useState<EmployeeType[]>([])

  useEffect(() => {
    const fetchEmployeesAtivos = async () => {
      const q = query(employeeTableRef, where('ativo', '==', true))
      const querySnapshot = await getDocs(q)

      const promises: Promise<EmployeeType | null>[] = querySnapshot.docs.map(
        async doc => {
          const employeeData = {
            ...doc.data(),
            id: doc.id,
          } as EmployeeType
          if (employeeData.id) {
            employeeData.fotoPerfilUrl = await getFotoPerfil(employeeData.id)
            return employeeData
          }
          return null
        }
      )

      const employeesData = await Promise.all(promises)
      const employeesDataFiltered = employeesData.filter(
        employee => employee !== null
      ) as EmployeeType[]
      setEmployeesAtivos(employeesDataFiltered)
    }
    fetchEmployeesAtivos()
  }, [])

  return employeesAtivos
}

export function getEmployeeById(id: string | undefined): EmployeeType | null {
  const [employee, setEmployee] = useState<EmployeeType | null>(null)

  useEffect(() => {
    if (!id) {
      console.log('ID do usuário não fornecido')
      return
    }

    const fetchEmployee = async () => {
      try {
        const data = await getDocs(employeeTableRef)

        const employeeData = data.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as EmployeeType[]

        const employeeEncontrado = employeeData.find(f => f.id === id)
        if (employeeEncontrado) {
          employeeEncontrado.fotoPerfilUrl = await getFotoPerfil(id)
          setEmployee(employeeEncontrado)
        } else {
          console.log('Funcionário não encontrado')
        }
      } catch (error) {
        console.error('Erro ao buscar funcionário:', error)
      }
    }

    fetchEmployee()
  }, [id])

  return employee
}

export async function getFotoPerfil(id: string): Promise<string> {
  try {
    const fotoPerfilRef = ref(storage, `imagensPerfil/${id}`)
    const url = await getDownloadURL(fotoPerfilRef)

    return url
  } catch (error) {
    console.error('Erro ao obter foto de perfil:', error)
    return ''
  }
}
export async function postEmployee(
  employee: EmployeeType,
  fotoPerfil: File
): Promise<string | undefined> {
  try {
    const docRef = await addDoc(employeeTableRef, employee)
    const employeeId = docRef.id

    await postFotoPerfil(fotoPerfil, employeeId)

    return employeeId
  } catch (error) {
    console.log('Erro ao cadastrar funcionário', error)
    return
  }
}

const postFotoPerfil = async (imagem: File, id: string | undefined) => {
  try {
    const storageRef = ref(storage, `imagensPerfil/${id}`)
    const metadata = {
      contentType: 'image/jpg',
    }
    await uploadBytes(storageRef, imagem, metadata)
  } catch (error) {
    console.log('Erro ao postar imagem de perfil', error)
  }
}

export async function desativarEmployee(id?: string) {
  try {
    const employeeRef = doc(employeeTableRef, id)
    const employeeDoc = await getDoc(employeeRef)
    const employeeData = employeeDoc.data()

    if (employeeData) {
      const novoHistorico = [
        ...(employeeData.historico || []),
        { ocorrido: 'Funcionário desativado', data: new Date().toISOString() },
      ]

      await setDoc(
        employeeRef,
        {
          ...employeeData,
          ativo: false,
          historico: novoHistorico,
        },
        { merge: true }
      )

      return true
    }
  } catch (error) {
    console.error('Erro ao desativar funcionário:', error)
    return false
  }
}
interface NovoDado {
  [key: string]: any
}

export async function alterarDadoEmployee(
  id: string,
  campo: string,
  novoValor: string | File | number
) {
  try {
    const employeeRef = doc(employeeTableRef, id)
    const novoDado: NovoDado = {}

    if (campo === 'fotoPerfil' && novoValor instanceof File) {
      await updateFotoPerfil(id, novoValor)
    } else {
      novoDado[campo] = novoValor

      await updateDoc(employeeRef, novoDado)
      await adicionarNoHistorico(id, campo, novoValor)
    }

    return true
  } catch (error) {
    console.error('Erro ao alterar dado do funcionário:', error)
    return false
  }
}

export async function adicionarNoHistorico(
  id: string,
  campo: string,
  novoValor: string | File | number
) {
  try {
    const employeeRef = doc(employeeTableRef, id)
    const employeeDoc = await getDoc(employeeRef)
    const employeeData = employeeDoc.data()
    let mensagem = ''
    if (campo === 'fotoPerfil') {
      mensagem = `O campo '${campo}' foi alterado.`
    } else {
      mensagem = `O campo '${campo}' foi alterado para '${novoValor}'`
    }
    if (employeeData) {
      const novoHistorico = [
        ...(employeeData.historico || []),
        { ocorrido: mensagem, data: new Date().toISOString() },
      ]

      await setDoc(
        employeeRef,
        {
          ...employeeData,
          historico: novoHistorico,
        },
        { merge: true }
      )

      return true
    }
  } catch (error) {
    console.error('Erro ao adicionar entrada ao histórico:', error)
    return false
  }
}

export async function updateFotoPerfil(id: string, foto: File): Promise<void> {
  try {
    const fotoPerfilRef = ref(storage, `imagensPerfil/${id}`)

    const metadata = {
      contentType: foto.type,
    }
    adicionarNoHistorico(id, 'fotoPerfil', foto)
    await uploadBytes(fotoPerfilRef, foto, metadata)
  } catch (error) {
    console.error('Erro ao atualizar a foto de perfil:', error)
    throw error
  }
}

export async function getEmployeePelaUrl(): Promise<EmployeeType | null> {
  const { id } = useParams<{ id: string }>()
  if (id) {
    return getEmployeeById(id)
  }
  return null
}
