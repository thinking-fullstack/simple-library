import { defineStore } from 'pinia'
import type { IBookState, IBookFilter, BookParam } from '@/resources/interfaces'
import { BookService } from '@/services'
import { toast } from 'vue3-toastify'
import { useUserStore } from '@/stores/user.store'

export const useBookStore = defineStore('book-store', {
  state: (): IBookState => ({
    books: [],
    book: null,
    comments: []
  }),

  actions: {
    async getBook(id: string) {
      try {
        this.book = await BookService.getBook(id)
      } catch (e) {
        this.book = null
        toast('Failed to fetch book', {
          type: 'error'
        })
      }
    },

    async getBooks(filter?: IBookFilter) {
      try {
        this.books = await BookService.getBooks(filter)
      } catch (e) {
        this.books = []
        toast('Failed to get books', {
          type: 'error'
        })
      }
    },

    async createBook(params: BookParam) {
      try {
        await BookService.createBook(params)
        toast('Book created successfully.', {
          type: 'success',
          autoClose: 3000
        })
      } catch (e) {
        toast('Failed to create book', {
          type: 'error'
        })
      }
    },

    async updateBook(id: string, params: BookParam) {
      try {
        await BookService.updateBook(id, params)
        toast('Book updated successfully.', {
          type: 'success',
          autoClose: 3000
        })
      } catch (e) {
        toast('Failed to update book', {
          type: 'error'
        })
      }
    },

    async deleteBook(id: string) {
      try {
        const res = await BookService.deleteBook(id)
        if (res) {
          this.book = null
          this.books = this.books.filter((item) => item.id !== id)
          toast('Book deleted successfully.', {
            type: 'success'
          })
        }
      } catch (e) {
        toast('Failed to delete book', {
          type: 'error'
        })
      }
    },

    async getComments(id: string) {
      try {
        this.comments = await BookService.getComments(id)
      } catch (e) {
        toast('Failed to get comments', {
          type: 'error'
        })
      }
    },

    async addComment(content: string) {
      try {
        // Todo: API integration with backend
        const { user } = useUserStore()
        this.comments.unshift({
          id: `${Date.now()}`,
          author: {
            id: user?.id!,
            username: user?.username!
          },
          content,
          date: new Date()
        })
      } catch (e) {
        toast('Failed to add commnet', {
          type: 'error'
        })
      }
    },

    async deleteComment(id: string) {
      try {
        // Todo: API integration with backend
        this.comments = this.comments.filter((item) => item.id !== id)
      } catch (e) {
        toast('Failed to add commnet', {
          type: 'error'
        })
      }
    }
  }
})
