<script setup lang="ts">
import { computed } from 'vue';
import { type Avatar } from '@/types/blocks/Avatar';

const { block } = defineProps<{
  block: Avatar;
}>();

// Compute wrapper styles for avatar
const wrapperStyle = computed(() => {
  const style = block.style || {};
  return {
    textAlign: style.imageAlignment || 'center',
    backgroundColor: style.backgroundColor || 'transparent',
    paddingTop: style.paddingTop ? `${style.paddingTop}px` : '0',
    paddingRight: style.paddingRight ? `${style.paddingRight}px` : '0',
    paddingBottom: style.paddingBottom ? `${style.paddingBottom}px` : '0',
    paddingLeft: style.paddingLeft ? `${style.paddingLeft}px` : '0',
  };
});

// Compute avatar specific styles
const avatarStyle = computed(() => {
  const style = block.style || {};
  let borderRadius;

  switch (block.shape) {
    case 'circle':
      borderRadius = '50%';
      break;
    case 'square':
      borderRadius = '0';
      break;
    case 'rounded':
      borderRadius = '8px';
      break;
    default:
      borderRadius = '50%';
  }

  return {
    width: `${block.size || 80}px`,
    height: `${block.size || 80}px`,
    borderRadius: borderRadius,
    borderWidth: `${style.borderWidth || 0}px`,
    borderStyle: 'solid',
    borderColor: style.borderColor || 'transparent',
    objectFit: 'cover',
  };
});
</script>

<template>
  <div class="avatar-container" :style="wrapperStyle">
    <img :src="block.src" :alt="block.alt || 'Avatar'" :style="avatarStyle" />
  </div>
</template>

<style scoped>
.avatar-container {
  display: block;
}
</style>
