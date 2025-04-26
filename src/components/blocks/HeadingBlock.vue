<script setup lang="ts">
import { computed } from 'vue';
import { type Heading } from '@/types/blocks/Heading';
import ContentEditable from '../ui/ContentEditable.vue';
import useEditor from '@/store/Editor';

const { block } = defineProps<{
  block: Heading;
}>();

const { updateBlock } = useEditor();

const model = computed({
  get: () => block.text,
  set: (value: string) => {
    block.text = value;
    updateBlock(block.id, {
      ...block,
      text: value,
    });
  },
});

// Compute heading tag based on level
const headingTag = computed(() => {
  return `h${block.level || 2}`;
});

// Compute styles for the heading
const headingStyle = computed(() => {
  const style = block.style || {};
  return {
    color: style.textColor || '#000000',
    fontSize: style.fontSize || getDefaultFontSize(),
    fontWeight: style.fontWeight || 'bold',
    fontFamily: style.fontFamily || 'inherit',
    textAlign: style.align || 'left',
    textDecoration: style.textDecoration || 'none',
    textTransform: style.textTransform || 'none',
    backgroundColor: style.backgroundColor || 'transparent',
    borderColor: style.borderColor || 'transparent',
    borderRadius: style.borderRadius ? `${style.borderRadius}px` : '0',
    borderWidth: style.borderWidth ? `${style.borderWidth}px` : '0',
    borderStyle: 'solid',
    paddingTop: style.paddingTop ? `${style.paddingTop}px` : '0',
    paddingRight: style.paddingRight ? `${style.paddingRight}px` : '0',
    paddingBottom: style.paddingBottom ? `${style.paddingBottom}px` : '0',
    paddingLeft: style.paddingLeft ? `${style.paddingLeft}px` : '0',
    marginTop: '0.5em',
    marginBottom: '0.5em',
    lineHeight: '1.2',
  };
});

// Get default font size based on heading level
function getDefaultFontSize(): string {
  switch (block.level) {
    case 1:
      return '2rem';
    case 2:
      return '1.5rem';
    case 3:
      return '1.17rem';
    default:
      return '1.5rem';
  }
}
</script>

<template>
  <div class="heading-block" :style="headingStyle">
    <ContentEditable :tag="headingTag" v-model="model" class="heading" />
  </div>
</template>

<style scoped>
.heading-block {
  word-break: break-word;
}
</style>
