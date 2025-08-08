export enum EmployeePosition {
  JUNIOR_DEVELOPER = 'Junior Developer',
  MID_LEVEL_DEVELOPER = 'Mid-Level Developer',
  SENIOR_DEVELOPER = 'Senior Developer',
  TEAM_LEAD = 'Team Lead',
  MANAGER = 'Manager',
  HR_SPECIALIST = 'HR Specialist',
  ACCOUNTANT = 'Accountant',
  SALES_REPRESENTATIVE = 'Sales Representative',
  OTHER = 'Other',
}

export interface EmployeeType {
  uid?: string
  name: string
  email: string
  phone: string
  birthDate: Date
  gender: string
  street: string
  number: string
  zipCode: string
  city: string
  state: string
  department: string
  position: EmployeePosition | string
  salary: string
  admissionDate: Date
  profilePictureUrl?: string
  isActive: boolean
  createdAt: Date | string
  updatedAt: Date | string
  history: {
    action: string
    date: string
    details?: string
  }[]
}
export interface CreateEmployeeData {
  name: string
  email: string
  phone: string
  birthDate: Date
  gender: string
  street: string
  number: string
  zipCode: string
  city: string
  state: string
  department: string
  position: string
  salary: string
  admissionDate: Date
}
