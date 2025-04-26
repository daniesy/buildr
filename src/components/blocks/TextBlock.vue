<script setup lang="ts">
import { computed } from 'vue';
import { type Text } from '@/types/blocks/Text';
import ContentEditable from '../ui/ContentEditable.vue';
import useEditor from '@/store/Editor';
import { TextStyle } from '@/types/styles/TextStyle';

const { block } = defineProps<{
  block: Text;
}>();

const { updateBlock } = useEditor();

const model = computed({
  get: () => block.text,
  set: (value: string) => updateBlock(block.id, 'text', value),
});

// Compute styles for the text block
const blockStyle = computed(() => {
  const style = block.style as TextStyle;
  return {
    color: style.textColor || '#000000',
    fontSize: style.fontSize
      ? isNaN(Number(style.fontSize))
        ? style.fontSize
        : `${style.fontSize}px`
      : '16px',
    fontWeight: style.fontWeight || 'normal',
    fontFamily: style.fontFamily || 'inherit',
    textAlign: style.align || 'left',
    textDecoration: style.textDecoration || 'none',
    textTransform: style.textTransform || 'none',
    lineHeight: style.lineHeight
      ? isNaN(Number(style.lineHeight))
        ? style.lineHeight
        : `${style.lineHeight}%`
      : '140%',
    backgroundColor: style.backgroundColor || 'transparent',
    borderColor: style.borderColor || 'transparent',
    borderRadius: style.borderRadius || undefined,
    borderWidth: style.borderWidth ? `${style.borderWidth}px` : '0',
    borderStyle: style.borderStyle || 'solid',
    padding: style.padding || undefined,
    margin: style.margin || undefined,
  };
});
</script>

<template>
  <ContentEditable tag="div" v-model="model" class="text-block outline-none" :style="blockStyle" />
</template>

<style scoped>
.text-block {
  min-height: 1em;
  word-break: break-word;
}
</style>
