export type LoginCredential = {
  email: string
  password: string
}

export type RegisterPayload = {
  email: string
  password: string
  username: string
}

export type LoginResponse = {
  token: string
}

export type RegisterResponse = {
  success: boolean
}
