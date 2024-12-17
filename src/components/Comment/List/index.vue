<template>
  <div>
    <p class="mb-4 text-lg font-medium">Comments</p>

    <div class="mb-4 flex flex-col gap-2">
      <textarea
        v-model="commentText"
        class="form-input"
        rows="3"
        placeholder="Type here to comment..."
      />
      <Button :disabled="!commentText" class="ml-auto" @click="onSubmit">Submit</Button>
    </div>

    <div class="flex flex-col gap-4">
      <CommentItem v-for="comment in comments" v-bind:key="comment.id" :comment="comment" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBookStore } from '@/stores'
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import Button from '@/components/Button/index.vue'
import CommentItem from '../Item/index.vue'

const bookStore = useBookStore()
const { getComments, addComment } = bookStore
const { comments } = storeToRefs(bookStore)

const props = defineProps<{
  bookId: string
}>()

const commentText = ref('')

const onSubmit = async () => {
  await addComment(commentText.value)
  commentText.value = ''
}

const fetchComments = async () => {
  if (props.bookId) {
    await getComments(props.bookId)
  }
}

watch(
  () => props.bookId,
  () => {
    fetchComments()
  }
)

onMounted(() => {
  fetchComments()
})
</script>

<style scoped></style>
