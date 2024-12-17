import api from '@/utils/axios'
import type {
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  IUser
} from '@/resources/interfaces'
import type { LoginCredential } from '@/resources/interfaces'

export class AuthService {
  static login(credentials: LoginCredential): Promise<LoginResponse> {
    return api.post<LoginResponse>('/api/login', credentials).then((res) => res.data)
  }

  static getMe(): Promise<IUser> {
    return api.get<IUser>('/api/me').then((res) => res.data)
  }

  static register(payload: RegisterPayload): Promise<RegisterResponse> {
    return api.post<RegisterResponse>('/api/register', payload).then((res) => res.data)
  }
}
