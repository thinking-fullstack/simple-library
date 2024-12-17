import api from '@/utils/axios'
import type {
  BookParam,
  DeleteBookResponse,
  IBook,
  IBookComment,
  IBookFilter
} from '@/resources/interfaces'

export class BookService {
  static getBook(id: string): Promise<IBook> {
    return api.get<IBook>(`/api/books/${id}`).then((res) => {
      return {
        ...res.data,
        publicationDate: new Date(res.data.publicationDate)
      }
    })
  }

  static getBooks(filter?: IBookFilter): Promise<IBook[]> {
    return api.get<IBook[]>('/api/books').then((res) =>
      res.data
        .filter((book) => {
          if (!filter) {
            return true
          }

          const query = filter.query?.toLowerCase()
          if (
            query &&
            !book.title.toLowerCase().includes(query) &&
            !book.author.toLowerCase().includes(query) &&
            !book.genre.toLowerCase().includes(query)
          ) {
            return false
          }

          if (filter.date) {
            const publishedDate = new Date(book.publicationDate)
            return +publishedDate >= +new Date(filter.date)
          }

          return true
        })
        .map((book) => ({
          ...book,
          publicationDate: new Date(book.publicationDate)
        }))
    )
  }

  static createBook(params: BookParam): Promise<IBook> {
    return api.post<IBook>('/api/books', params).then((res) => {
      return res.data
    })
  }

  static updateBook(id: string, params: BookParam): Promise<IBook> {
    return api.put<IBook>(`/api/books/${id}`, params).then((res) => {
      return res.data
    })
  }

  static deleteBook(id: string): Promise<DeleteBookResponse> {
    return api.delete<DeleteBookResponse>(`/api/books/${id}`).then((res) => {
      return res.data
    })
  }

  static getComments(id: string): Promise<IBookComment[]> {
    return api.get<IBookComment[]>(`/api/books/${id}/comments`).then((res) => {
      return res.data
    })
  }
}
