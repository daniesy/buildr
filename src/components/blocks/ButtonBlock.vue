<script setup lang="ts">
import { computed } from 'vue';
import { type Button } from '@/types/blocks/Button';
import useEditor from '@/store/Editor';

const { block } = defineProps<{
  block: Button;
}>();

const { updateBlock } = useEditor();

// Size classes mapping
const sizeClasses = {
  xs: 'text-xs px-2 py-1',
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-5 py-2.5',
};

// Compute styles for the button
const buttonStyle = computed(() => {
  const style = block.style || {};
  return {
    color: style.textColor || '#ffffff',
    backgroundColor: style.backgroundColor || '#3b82f6',
    borderRadius: style.borderRadius ? `${style.borderRadius}px` : '4px',
    borderWidth: style.borderWidth ? `${style.borderWidth}px` : '0',
    borderColor: style.borderColor || 'transparent',
    borderStyle: 'solid',
    fontWeight: style.fontWeight || 'medium',
    textAlign: 'center',
    display: 'inline-block',
    cursor: 'pointer',
    textDecoration: 'none',
    paddingTop: style.paddingTop ? `${style.paddingTop}px` : '8px',
    paddingRight: style.paddingRight ? `${style.paddingRight}px` : '16px',
    paddingBottom: style.paddingBottom ? `${style.paddingBottom}px` : '8px',
    paddingLeft: style.paddingLeft ? `${style.paddingLeft}px` : '16px',
  };
});

// Handle text updates
const handleTextChange = (e: Event) => {
  const target = e.target as HTMLElement;
  updateBlock(block.id, {
    ...block,
    text: target.innerText,
  });
};
</script>

<template>
  <a
    :href="block.href"
    :style="buttonStyle"
    class="button"
    contenteditable="true"
    @input="handleTextChange"
    :target="block.target || '_self'"
  >
    {{ block.text }}
  </a>
</template>

<style scoped>
.button {
  transition: all 0.2s;
  outline: none;
}
.button:focus {
  outline: 2px solid rgba(59, 130, 246, 0.5);
}
</style>
