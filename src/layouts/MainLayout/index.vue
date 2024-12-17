<template>
  <div class="flex min-h-screen flex-col bg-gray-50">
    <nav class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex">
              <router-link
                to="/"
                class="typo-link inline-flex items-center px-1 pt-1 text-gray-900"
              >
                Home
              </router-link>
            </div>
          </div>
          <div class="flex items-center">
            <router-link
              to="/login"
              class="flex items-center gap-1 px-3 py-2 text-gray-900 hover:text-red-700"
              @click="onLogout"
            >
              <LogOut />
              Logout
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="mx-auto w-full max-w-7xl flex-1 py-6 sm:px-6 lg:px-8">
      <slot></slot>
    </main>

    <footer class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p class="text-center text-gray-500">© 2024 Simple Library Test. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores'
import LogOut from '@/components/Icons/LogOut.vue'

const { logout } = useUserStore()

const onLogout = () => {
  logout()
}
</script>
