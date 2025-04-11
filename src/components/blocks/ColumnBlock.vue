<script setup lang="ts">
import { type Column } from '@/types/Column';
import Renderer from './Renderer.vue';
import { Block } from '@/types/Block';

const { block } = defineProps<{
  block: Column;
}>();
</script>

<template>
  <div class="column-content">
    <Renderer :blocks="block.children as Block[]" />
  </div>
</template>