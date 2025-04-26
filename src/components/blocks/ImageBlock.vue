<script setup lang="ts">
import { computed } from 'vue';
import { type Image } from '@/types/blocks/Image';

const { block } = defineProps<{
  block: Image;
}>();

// Compute wrapper styles for image alignment
const wrapperStyle = computed(() => {
  const style = block.style || {};
  return {
    textAlign: style.imageAlignment || 'center',
    backgroundColor: style.backgroundColor || 'transparent',
    borderRadius: style.borderRadius ? `${style.borderRadius}px` : '0',
    borderWidth: style.borderWidth ? `${style.borderWidth}px` : '0',
    borderColor: style.borderColor || 'transparent',
    borderStyle: 'solid',
    paddingTop: style.paddingTop ? `${style.paddingTop}px` : '0',
    paddingRight: style.paddingRight ? `${style.paddingRight}px` : '0',
    paddingBottom: style.paddingBottom ? `${style.paddingBottom}px` : '0',
    paddingLeft: style.paddingLeft ? `${style.paddingLeft}px` : '0',
  };
});

// Compute image specific styles
const imageStyle = computed(() => {
  const style = block.style || {};
  return {
    width: style.imageWidth || 'auto',
    height: style.imageHeight || 'auto',
    maxWidth: '100%',
    borderRadius: style.borderRadius ? `${style.borderRadius}px` : '0',
  };
});
</script>

<template>
  <div class="image-block" :style="wrapperStyle">
    <a v-if="block.href" :href="block.href" :target="block.target || '_self'">
      <img :src="block.src" :alt="block.alt || 'Image'" :style="imageStyle" />
    </a>
    <img v-else :src="block.src" :alt="block.alt || 'Image'" :style="imageStyle" />
  </div>
</template>

<style scoped>
.image-block {
  max-width: 100%;
}
</style>
