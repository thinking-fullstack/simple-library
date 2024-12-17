<template>
  <div class="flex flex-col">
    <label v-if="label" class="mb-1 text-sm font-medium text-gray-700">{{ label }}</label>
    <Field :name="name" :type="type" v-slot="{ field, errorMessage }">
      <component
        :is="type === 'text' ? 'textarea' : 'input'"
        v-bind="field"
        :placeholder="placeholder"
        class="form-input"
        :class="{
          'border-gray-200': !errorMessage,
          'border-red-500 focus:border-red-500 focus:ring-red-500': errorMessage
        }"
        :type="type"
        :rows="type === 'text' ? 5 : 1"
      />
      <span v-if="errorMessage" class="text-sm text-red-500" data-test-id="error-message">
        {{ errorMessage }}
      </span>
    </Field>
  </div>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate'

defineProps({
  name: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})
</script>

<style scoped></style>
