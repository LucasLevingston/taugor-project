import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserType } from '@/types/user-type'

interface UserState {
  user: UserType | null
  loading: boolean
  error: string | null
  setUser: (user: UserType | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null,
      loading: false,
      error: null,
      setUser: user => set({ user, error: null }),
      setLoading: loading => set({ loading }),
      setError: error => set({ error }),
      clearUser: () => set({ user: null, error: null }),
    }),
    {
      name: 'user-storage',
      partialize: state => ({ user: state.user }),
    }
  )
)
