<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <h3 class="mb-4">Simple Library Test</h3>

    <div class="card">
      <p class="mb-4 text-xl font-medium">Register your account</p>

      <Form class="flex flex-col gap-y-4" :validation-schema="registerSchema" @submit="onRegister">
        <FormInput name="username" label="Username" placeholder="Enter your username" />

        <FormInput name="email" type="email" label="Email" placeholder="Enter your email" />

        <FormInput
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
        />

        <FormInput
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
        />

        <Button :loading="isLoading" type="submit" class="mt-4">Sign Up</Button>
      </Form>

      <router-link to="/login">
        <p class="typo-link mt-2 text-center text-blue-400">Already have an account? Log in</p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { useUserStore } from '@/stores/user.store'
import { registerSchema } from '@/resources/schemas'
import FormInput from '@/components/FormInput/index.vue'
import Button from '@/components/Button/index.vue'
import { ref } from 'vue'

const userStore = useUserStore()

const isLoading = ref(false)

const onRegister = async (values) => {
  isLoading.value = true
  await userStore.register(values)
  isLoading.value = false
}
</script>
