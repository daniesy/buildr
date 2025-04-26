<script setup lang="ts">
import { type HTML } from '@/types/blocks/HTML';

const { block } = defineProps<{
  block: HTML;
}>();
</script>

<template>
  <div v-html="block.html"></div>
</template>