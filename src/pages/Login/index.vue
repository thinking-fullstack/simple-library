<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <h3 class="mb-4">Simple Library Test</h3>

    <div class="card">
      <p class="mb-4 text-xl font-medium">Sign in to your account</p>

      <Form class="flex flex-col gap-y-4" @submit="handleLogin" :validation-schema="loginSchema">
        <FormInput name="email" type="email" label="Email" placeholder="Enter your email" />
        <FormInput
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
        />
        <Button :loading="isLoading" type="submit" class="mt-4">Login</Button>
      </Form>

      <router-link to="/register" data-test-id="link-to-register">
        <p class="typo-link mt-2 text-center text-blue-400">Don't have an account? Sign Up</p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user.store'
import { useRouter } from 'vue-router'
import { Form } from 'vee-validate'
import FormInput from '@/components/FormInput/index.vue'
import Button from '@/components/Button/index.vue'
import { loginSchema } from '@/resources/schemas'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  await userStore.login({
    email: email.value,
    password: password.value
  })
  await router.push('/')
  isLoading.value = false
}
</script>
