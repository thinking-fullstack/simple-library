<template>
  <div class="h-full w-full px-4">
    <h2 class="mb-8 text-center">Book list</h2>

    <div class="mb-6 space-y-4">
      <div class="flex flex-col flex-wrap gap-4 sm:flex-row">
        <div class="flex items-center space-x-2">
          <span class="hidden text-sm font-semibold sm:block">Search:</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by title, author or genre..."
            class="form-input h-10 w-full sm:w-72"
            @input="debouncedSearch"
          />
        </div>

        <div class="flex items-center space-x-2">
          <span class="hidden text-sm font-semibold sm:block">Published Before:</span>
          <input
            v-model="dateFilter"
            type="date"
            placeholder="Search by title, author or genre..."
            class="form-input h-10 w-full sm:w-48"
          />
        </div>

        <Button class="ml-auto" @click="onGoToCreate">Create</Button>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center py-8">
      <Spinner class="h-20 w-20" />
    </div>
    <div
      v-else
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <div
        v-for="book in books"
        v-bind:key="book.id"
        class="relative rounded-lg bg-white shadow duration-200 hover:shadow-md"
      >
        <div class="absolute right-2 top-2 flex justify-center gap-2">
          <Menu as="div" class="relative inline-block text-left">
            <MenuButton
              class="flex h-5 w-5 items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <Dots />
            </MenuButton>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem v-for="action in actions" v-bind:key="action.label" v-slot="{ active }">
                    <div
                      :class="[
                        active ? action.activeClass : action.class,
                        'flex cursor-pointer items-center gap-2 px-3 py-2 text-sm'
                      ]"
                      @click="action.callback(book)"
                    >
                      <component :is="action.icon" class="h-4 w-4" />
                      <a href="#" class="text-xs">{{ action.label }}</a>
                    </div>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>

        <div class="p-6 text-center">
          <img
            src="/src/assets/images/book.png"
            alt="book"
            class="mx-auto mb-3 h-auto w-32 rounded-md"
          />
          <p class="text-base font-medium text-gray-800">
            {{ book.title }}
          </p>
          <p class="text-sm">
            {{ book.genre }} / {{ (book.publicationDate as Date).getFullYear() }}
          </p>
          <p class="text-sm italic">{{ book.author }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useAlert } from '@/plugins/alert'
import { useBookStore } from '@/stores'
import Spinner from '@/components/Icons/Spinner.vue'
import Edit from '@/components/Icons/Edit.vue'
import Button from '@/components/Button/index.vue'
import Delete from '@/components/Icons/Delete.vue'
import Eye from '@/components/Icons/Eye.vue'
import Dots from '@/components/Icons/Dots.vue'
import type { IBook } from '@/resources/interfaces'

const router = useRouter()
const showAlert = useAlert()
const bookStore = useBookStore()

const { getBooks, deleteBook } = bookStore
const { books } = storeToRefs(bookStore)

const searchQuery = ref<string>()
const dateFilter = ref<string>()
const isLoading = ref(false)
const timeout = ref()

const onDelete = (book: IBook) => {
  showAlert({
    title: 'Delete Book',
    content: `Are you sure to delete "${book.title}" ?`,
    confirm: async () => {
      await deleteBook(book.id)
    }
  })
}

const onEdit = (book: IBook) => {
  router.push(`/${book.id}/edit`)
}

const onView = (book: IBook) => {
  router.push(`/${book.id}/view`)
}

const actions = ref([
  {
    label: 'Edit',
    class: 'text-gray-700',
    activeClass: 'bg-gray-100 text-gray-900',
    icon: Edit,
    callback: onEdit
  },
  {
    label: 'View',
    class: 'text-green-700',
    activeClass: 'bg-green-100 text-green-900',
    icon: Eye,
    callback: onView
  },
  {
    label: 'Delete',
    class: 'text-red-700',
    activeClass: 'bg-red-100 text-red-900',
    icon: Delete,
    callback: onDelete
  }
])

const onGoToCreate = () => {
  router.push('/new')
}

const debouncedSearch = () => {
  clearTimeout(timeout.value)
  timeout.value = setTimeout(() => {
    fetchBooks()
  }, 500)
}

const fetchBooks = async () => {
  try {
    isLoading.value = true
    await getBooks({
      query: searchQuery.value,
      date: dateFilter.value
    })
  } finally {
    isLoading.value = false
  }
}

watch([dateFilter], () => {
  fetchBooks()
})

onMounted(() => {
  fetchBooks()
})
</script>

<style scoped></style>
