<template>
  <div class="px-4">
    <div class="mb-8">
      <h2 class="text-center">{{ isNew ? 'New Book' : 'Book Detail' }}</h2>
      <div class="text-right text-blue-700">
        <router-link to="/" class="typo-link flex w-fit items-center gap-1 text-sm font-normal">
          <ArrowLeft />
          Back to List
        </router-link>
      </div>
    </div>

    <div class="flex flex-col justify-center gap-2 sm:flex-row">
      <div class="mr-8">
        <img src="/src/assets/images/book.png" alt="book" class="mx-auto mb-3 w-48" />
      </div>

      <div class="w-full sm:w-96">
        <BookForm
          :is-new="isNew"
          :is-loading="isLoading"
          :book="book"
          @submit="onSubmit"
          @delete="onDelete"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBookStore } from '@/stores'
import type { BookParam } from '@/resources/interfaces'
import { useAlert } from '@/plugins/alert'
import BookForm from '@/components/BookForm/index.vue'
import ArrowLeft from '@/components/Icons/ArrowLeft.vue'

const route = useRoute<{ id: string }>()
const router = useRouter()
const bookStore = useBookStore()
const showAlert = useAlert()

const { createBook, updateBook, getBook, deleteBook } = bookStore
const { book } = storeToRefs(bookStore)

const isLoading = ref(false)

const id = computed<string>(() => (route.params.id as string) || '')
const isNew = computed<boolean>(() => !route.params.id)

const onSubmit = async (params: BookParam) => {
  if (isNew.value) {
    await createBook(params)
    router.push('/')
  } else {
    await updateBook(book.value.id, params)
  }
}

const onDelete = async () => {
  if (book.value) {
    showAlert({
      title: 'Delete Book',
      content: `Are you sure to delete "${book.value?.title}" ?`,
      confirm: async () => {
        await deleteBook(id.value)
        router.push('/')
      }
    })
  }
}

onMounted(async () => {
  if (id.value) {
    book.value = null
    isLoading.value = true
    await getBook(id.value as string)
    isLoading.value = false
  }
})
</script>

<style scoped></style>
