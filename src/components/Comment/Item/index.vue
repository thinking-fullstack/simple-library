<template>
  <div class="flex rounded-br-xl rounded-tl-xl border bg-white p-4 shadow-md">
    <div
      class="mr-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-400 capitalize text-white"
    >
      {{ comment.author.username[0] }}
    </div>

    <div class="w-full">
      <div class="flex gap-2">
        <span class="font-semibold">{{ isAuthor ? 'You' : comment.author.username }}</span>
        <span class="text-sm text-gray-400">{{
          new Date(comment.date)?.toLocaleDateString()
        }}</span>

        <Button
          v-if="isAuthor"
          variant="ghost"
          size="xs"
          class="ml-auto"
          @click="onDelete"
          data-test-id="delete-comment"
        >
          <Delete />
        </Button>
      </div>
      <p class="text-gray-700">{{ comment.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBookComment } from '@/resources/interfaces'
import { useUserStore, useBookStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import Delete from '@/components/Icons/Delete.vue'
import Button from '@/components/Button/index.vue'
import { useAlert } from '@/plugins/alert'

const showAlert = useAlert()
const userStore = useUserStore()
const { deleteComment } = useBookStore()

const { user } = storeToRefs(userStore)

const props = defineProps<{ comment: IBookComment }>()

const isAuthor = computed(() => user.value?.id === props.comment.author.id)

const onDelete = () => {
  showAlert({
    title: 'Delete Comment',
    content: 'Are you sure to delete this comment?',
    confirm: async () => {
      await deleteComment(props.comment.id)
    }
  })
}
</script>

<style scoped></style>
