import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { EmployeeType } from '@/types/employee-type'

interface EmployeeState {
  employees: EmployeeType[]

  setEmployees: (employees: EmployeeType[]) => void
  addEmployee: (employee: EmployeeType) => void
  updateEmployeeStore: (id: string, updates: Partial<EmployeeType>) => void
  deactivateEmployee: (id: string) => void
}

export const useEmployeeStore = create<EmployeeState>()(
  persist(
    set => ({
      employees: [],

      setEmployees: employees => set({ employees }),

      addEmployee: employee =>
        set(state => ({
          employees: [...state.employees, employee],
        })),

      updateEmployeeStore: (uid, updates) =>
        set(state => ({
          employees: state.employees.map(emp =>
            emp.uid === uid ? { ...emp, ...updates } : emp
          ),
        })),

      deactivateEmployee: uid =>
        set(state => ({
          employees: state.employees.map(emp =>
            emp.uid === uid ? { ...emp, isActive: false } : emp
          ),
        })),
    }),
    {
      name: 'employee-storage',
      partialize: state => ({
        employees: state.employees,
      }),
    }
  )
)
