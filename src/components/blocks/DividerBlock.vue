<script setup lang="ts">
import { computed } from 'vue';
import { type Divider } from '@/types/blocks/Divider';

const { block } = defineProps<{
  block: Divider;
}>();

// Compute styles for the divider
const dividerStyle = computed(() => {
  const style = block.style || {};
  return {
    borderTop: `${style.dividerThickness || '1px'} ${style.dividerStyle || 'solid'} ${style.dividerColor || '#e5e7eb'}`,
    marginTop: style.paddingTop ? `${style.paddingTop}px` : '16px',
    marginBottom: style.paddingBottom ? `${style.paddingBottom}px` : '16px',
    marginLeft: style.paddingLeft ? `${style.paddingLeft}px` : '0',
    marginRight: style.paddingRight ? `${style.paddingRight}px` : '0',
    width: '100%',
  };
});
</script>

<template>
  <hr class="divider" :style="dividerStyle" />
</template>

<style scoped>
.divider {
  border: none;
  height: 0;
}
</style>
