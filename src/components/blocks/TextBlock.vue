<script setup lang="ts">
import { computed } from 'vue';
import { type Text } from '@/types/Text';
import ContentEditable from '../ui/ContentEditable.vue';
import useEditor from '@/store/Editor';

const { block } = defineProps<{
  block: Text;
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
</script>

<template><ContentEditable tag="div" v-model="model" /></template>
