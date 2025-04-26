<script setup lang="ts">
import { computed } from 'vue';
import { type Spacer } from '@/types/blocks/Spacer';

const { block } = defineProps<{
  block: Spacer;
}>();

// Compute styles for the spacer
const spacerStyle = computed(() => {
  const style = block.style || {};
  return {
    height: `${block.height || 20}px`,
    backgroundColor: style.spacerColor || 'transparent',
    width: '100%',
  };
});
</script>

<template>
  <div class="spacer-block" :style="spacerStyle" />
</template>

<style scoped>
.spacer-block {
  min-height: 4px;
}
</style>
