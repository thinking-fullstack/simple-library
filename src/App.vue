<template>
  <div class="h-screen bg-gray-50">
    <component :is="this.$route.meta.layout || 'div'" :class="!this.$route.meta.layout && 'h-full'">
      <router-view></router-view>
    </component>
  </div>
</template>

<script setup lang="ts"></script>
