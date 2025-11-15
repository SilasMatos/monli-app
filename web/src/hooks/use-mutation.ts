import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Login, Register, Logout, CreateAccount } from '@/services/mutations'
import { useRouter } from 'next/navigation'
import { RegisterMutation, LoginMutation, createAccount } from '@/types/mutations-types'
import { toast } from 'sonner'

export function useLogin(
  options?: UseMutationOptions<any, Error, LoginMutation>
) {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (payload: LoginMutation) => Login(payload),
    retry: 0,
    ...options
  })
}

export const useRegister = (options?: UseMutationOptions<any, Error, RegisterMutation>) => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (payload: RegisterMutation) => Register(payload),
    retry: 0,
    ...options
  })
}

export const useLogout = (options?: UseMutationOptions<any, Error, void>) => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => Logout(),
    retry: 0,
    ...options
  })
}


export const useCreateAccount = (
  options?: UseMutationOptions<any, Error, createAccount>
) => {
  const router = useRouter()

  return useMutation({
    mutationKey: ['createAccount'],
    mutationFn: (payload: createAccount) => CreateAccount(payload),
 
    retry: 0,
    ...options
  })
}