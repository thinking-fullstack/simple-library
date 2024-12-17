<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    @click="$emit('click')"
    class="inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
    :class="`
      ${sizeClasses}
      ${variantClasses}
      ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90'}
      ${props.class}
    `"
  >
    <Spinner v-if="loading" :class="`h-5 w-5 ${textSize} mr-2`" />

    <span>
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Spinner from '@/components/Icons/Spinner.vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  class: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const sizeClasses = computed(() => {
  const sizes = {
    xs: 'px-1 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  return sizes[props.size]
})

const textSize = computed(() => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  return sizes[props.size]
})

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-blue-600 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white focus:ring-gray-500',
    danger: 'bg-red-600 text-white focus:ring-red-500',
    success: 'bg-green-600 text-white focus:ring-green-500',
    warning: 'bg-yellow-500 text-white focus:ring-yellow-400',
    outline:
      'border-2 border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'border-none text-gray-700 bg-transparent hover:bg-gray-100'
  }
  return variants[props.variant]
})
</script>
