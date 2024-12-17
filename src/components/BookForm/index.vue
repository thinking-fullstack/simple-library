<template>
  <Form
    ref="formRef"
    class="flex w-full flex-col gap-2"
    :validation-schema="bookSchema"
    @submit="onSubmit"
  >
    <FormInput name="title" label="Title *" placeholder="Book Title" />

    <FormInput name="author" label="Author *" placeholder="Book author" />

    <FormInput name="genre" label="Genre *" placeholder="Book genre" />

    <FormInput
      name="publicationDate"
      label="Publication Date *"
      placeholder="Book publicationDate"
      type="date"
    />

    <FormInput name="description" label="Description" placeholder="Book description" type="text" />

    <div class="ml-auto mt-4">
      <Button v-if="!isNew" variant="danger" class="mr-2 w-fit" @click="onDelete">Delete</Button>
      <Button :loading="isLoading" type="submit" class="w-fit">{{
        isNew ? 'Create' : 'Update'
      }}</Button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import Button from '@/components/Button/index.vue'
import { Form } from 'vee-validate'
import FormInput from '@/components/FormInput/index.vue'
import { IBook, BookParam } from '@/resources/interfaces'
import { watch, PropType, ref } from 'vue'
import { bookSchema } from '@/resources/schemas'

const props = defineProps({
  isNew: {
    type: Boolean,
    default: false
  },
  book: {
    type: Object as PropType<IBook | undefined | null>,
    required: false
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits<{
  (e: 'submit', book: BookParam): void
  (e: 'delete'): void
}>()

const formRef = ref()

watch(
  () => props.book,
  (selectedBook) => {
    if (selectedBook) {
      const value = { ...selectedBook }
      delete value.id
      value.publicationDate = new Date(value.publicationDate).toISOString().slice(0, 10)
      formRef.value?.resetForm({ values: value })
    }
  },
  { immediate: true }
)

const onSubmit = async (e) => {
  emits('submit', e)
}

const onDelete = () => {
  emits('delete')
}
</script>

<style scoped></style>
