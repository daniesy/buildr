<script setup lang="ts">
import { type Avatar } from '@/types/Avatar';

const { block } = defineProps<{
  block: Avatar;
}>();
</script>

<template>
  <div class="avatar-container">
    <img :src="block.src" alt="Avatar" />
  </div>
</template>

<style scoped>
.avatar-container {
  /* Add any necessary styling for the container here */
}

img {
  /* Add any necessary styling for the image here */
  border-radius: 50%; /* Example: Make it a circle */
}
</style>