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
  phoneNumber: string // Changed from 'phone' to 'phoneNumber'
  birthDate: string // Changed from 'dateOfBirth' to 'birthDate'
  gender: string
  street: string
  number: string
  zipCode: string
  city: string
  state: string
  department: string
  position: EmployeePosition | string // Use the enum or allow custom string
  salary: number
  admissionDate: string
  profilePictureUrl?: string
  isActive: boolean
  createdAt: Date | string // Firestore Timestamp will be converted to Date on client
  updatedAt: Date | string // Firestore Timestamp will be converted to Date on client
  history: {
    action: string
    date: string
    details?: string
  }[]
}
export interface CreateEmployeeData {
  name: string
  email: string
  phoneNumber: string
  birthDate: string
  gender: string
  street: string
  number: string
  zipCode: string
  city: string
  state: string
  department: string
  position: string
  salary: number
  admissionDate: string
}
