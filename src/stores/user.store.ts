import { defineStore } from 'pinia'
import type { LoginCredential, RegisterPayload, IUserState } from '@/resources/interfaces'
import { AuthService } from '@/services'
import { toast } from 'vue3-toastify'

export const useUserStore = defineStore('user-store', {
  state: (): IUserState => ({
    user: null,
    token: localStorage.getItem('token')
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user
  },

  actions: {
    async login(credentials: LoginCredential) {
      try {
        const res = await AuthService.login(credentials)
        this.token = res.token
        localStorage.setItem('token', res.token)
        await this.getMe()
        toast('Logged in successfully.', {
          type: 'success'
        })
      } catch (e) {
        toast('Failed to login. Please try again.', {
          type: 'error'
        })
        this.user = null
        this.token = null
        await this.logout()
      }
    },
    async logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
    async register(params: RegisterPayload) {
      try {
        await AuthService.register(params)
        toast('Signed up successfully.', {
          type: 'success'
        })
      } catch (e) {
        toast('Registration failed. Please try again.', {
          type: 'error'
        })
      }
    },
    async getMe() {
      try {
        const token = localStorage.getItem('token')
        if (!this.token && token) {
          this.token = token
        }

        if (this.token) {
          this.user = await AuthService.getMe()
          return
        }

        this.user = null
      } catch (e) {
        this.logout()
        throw e
      }
    }
  }
})
