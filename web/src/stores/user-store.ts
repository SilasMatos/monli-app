import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  isFirstAccess: boolean
  theme: string
  language: string
  avatar?: string

  setUser: (user: User) => void
  setToken: (token: string) => void
  login: (user: User, token: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  updateUser: (userData: Partial<User>) => void
  setIsFirstAccess: (isFirst: boolean) => void
  setTheme: (theme: string) => void
  setLanguage: (language: string) => void
  setAvatar: (avatar: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isFirstAccess: false,
      theme: 'light',
      language: 'en',
      avatar: undefined,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
          avatar: user.avatar
        }),

      setToken: (token) =>
        set({
          token,
          isAuthenticated: !!token
        }),

      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          avatar: user.avatar
        }),

      logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        sessionStorage.clear()

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          isFirstAccess: false,
          theme: 'light',
          language: 'en',
          avatar: undefined
        })
      },

      setLoading: (loading) =>
        set({ isLoading: loading }),

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
          avatar: userData.avatar ?? state.avatar
        })),

      setIsFirstAccess: (isFirst) =>
        set({ isFirstAccess: isFirst }),

      setTheme: (theme) =>
        set({ theme }),

      setLanguage: (language) =>
        set({ language }),

      setAvatar: (avatar) =>
        set({ avatar })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isFirstAccess: state.isFirstAccess,
        theme: state.theme,
        language: state.language,
        avatar: state.avatar
      })
    }
  )
)