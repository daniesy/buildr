<script setup lang="ts">
import { type HTML } from '@/types/HTML';

const { block } = defineProps<{
  block: HTML;
}>();
</script>

<template>
  <div v-html="block.html"></div>
</template>