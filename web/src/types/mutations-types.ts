export interface LoginMutation {
  email: string
  password: string
}

export interface RegisterMutation {
  name: string,
  email: string,
  password: string,
  confirmpassword: string,
  birthdate: string,
  role: string,
  phone: string,
  username: string,
  typeuser: string
}

export interface createAccount {
  initialBalance: number
  theme: string
  language: string
  currency: string
  notifications: boolean
  emailNotifications: boolean
  twoFactorEnabled: boolean
  avatar?: string
}