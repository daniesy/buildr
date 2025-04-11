<script setup lang="ts">
import { ref, useAttrs } from 'vue';
import { contentEditable as vContentEditable } from '@/directives/contentEditable';

defineProps<{
  tag: string;
}>();

const model = defineModel<string | null | undefined>();
const target = ref<HTMLElement | null>(null);

const focus = () => target.value?.focus();
const getSize = () => target.value?.getBoundingClientRect();
const getHtml = () => target.value?.innerHTML.trim();
const selectAll = () => {
  const selection = window.getSelection();
  const range = document.createRange();
  if (!range) {
    throw new Error('Range cannot be created.');
  }
  range.selectNodeContents(target.value as Node);
  selection?.removeAllRanges();
  selection?.addRange(range);
};

const addBreak = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.execCommand('insertHTML', false, '<br><br>');
  }
};

defineExpose({
  focus,
  getHtml,
  getSize,
  selectAll,
});

const attrs = useAttrs();
</script>

<template>
  <component
    :is="tag"
    ref="target"
    v-content-editable="model"
    @click.alt.prevent="selectAll"
    @keydown.enter="addBreak"
  />
</template>
