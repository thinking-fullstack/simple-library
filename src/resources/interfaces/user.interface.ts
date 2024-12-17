export interface IUser {
  id: string
  username: string
  email: string
}

export interface IUserState {
  user: IUser | null
  token: string | null
}
