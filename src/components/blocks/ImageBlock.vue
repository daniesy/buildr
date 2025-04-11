<script setup lang="ts">
import { type Image } from '@/types/Image';

const { block } = defineProps<{
  block: Image;
}>();
</script>

<template> 
  <img :src="block.src" alt="Image" />
</template>