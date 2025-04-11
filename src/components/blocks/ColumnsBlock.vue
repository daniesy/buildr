<script setup lang="ts">
import { type Columns } from '@/types/Columns';
import ColumnBlock from './ColumnBlock.vue';

const { block } = defineProps<{
  block: Columns;
}>();
</script>

<template>
  <div class="columns">
    <div v-for="(column, index) in block.children" :key="index" class="column">
      <ColumnBlock :block="column" />
    </div>
  </div>
</template>