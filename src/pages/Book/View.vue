<template>
  <div class="px-4">
    <div class="mb-8">
      <h2 class="text-center">{{ book?.title || '' }}</h2>
      <div class="text-right text-blue-700">
        <router-link to="/" class="typo-link flex w-fit items-center gap-1 text-sm font-normal">
          <ArrowLeft />
          Back to List
        </router-link>
      </div>
    </div>

    <div class="flex flex-col flex-wrap justify-center gap-2 sm:flex-row">
      <div class="mr-8">
        <img src="/src/assets/images/book.png" alt="book" class="mx-auto mb-3 w-48" />
      </div>

      <div v-if="!isLoading && book" class="flex w-full flex-col gap-4 sm:w-96">
        <div>
          <p class="text-gray-600">Title:</p>
          <p class="font-semibold">{{ book?.title }}</p>
        </div>

        <div>
          <p class="text-gray-600">Author:</p>
          <p class="font-semibold">{{ book?.title }}</p>
        </div>

        <div>
          <p class="text-gray-600">Genre:</p>
          <p class="font-semibold">{{ book?.genre }}</p>
        </div>

        <div>
          <p class="text-gray-600">Published At:</p>
          <p class="font-semibold">{{ new Date(book?.publicationDate)?.toDateString() }}</p>
        </div>

        <div>
          <p class="text-gray-600">Description:</p>
          <p class="font-semibold">{{ book?.description }}</p>
        </div>
      </div>

      <div class="my-8 h-[1px] w-full bg-gray-200 lg:mx-8 lg:h-auto lg:w-[1px]" />

      <div class="w-full flex-1 lg:w-auto">
        <CommentList :bookId="id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookStore } from '@/stores'
import CommentList from '@/components/Comment/List/index.vue'
import ArrowLeft from '@/components/Icons/ArrowLeft.vue'

const route = useRoute<{ id: string }>()
const bookStore = useBookStore()

const { getBook } = bookStore
const { book } = storeToRefs(bookStore)

const isLoading = ref(false)

const id = computed<string>(() => (route.params.id as string) || '')

onMounted(async () => {
  if (id.value) {
    isLoading.value = true
    await getBook(id.value as string)
    isLoading.value = false
  }
})
</script>

<style scoped></style>
