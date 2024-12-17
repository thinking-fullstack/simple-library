import type { IUser } from '@/resources/interfaces/user.interface'

export interface IBook {
  id: string
  title: string
  author: string
  genre: string
  publicationDate: Date | string
  description: string
}

export interface IBookComment {
  id: string
  author: Pick<IUser, 'id' | 'username'>
  content: string
  date: Date | string
}

export interface IBookState {
  books: IBook[]
  book: IBook | null
  comments: IBookComment[]
}

export interface IBookFilter {
  query?: string
  date?: string
}

export type BookParam = Omit<IBook, 'id'>

export type DeleteBookResponse = {
  success: boolean
}
