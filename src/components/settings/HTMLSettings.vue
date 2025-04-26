<template>
  <div>
    <TextInput label="HTML" v-model="htmlContent" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type HTML } from '@/types/blocks/HTML';
import { TextInput } from '@/components/ui/controls/components';
import useEditor from '@/store/Editor';

const props = defineProps({
  blockId: {
    type: String,
    required: true,
  },
});

const { updateBlock, getBlock } = useEditor();

const block = computed({
  get: () => getBlock.value(props.blockId) as HTML,
  set: (value) => updateBlock(props.blockId, value),
});

const htmlContent = computed({
  get: () => block.value.html || '',
  set: (value) => (block.value = { ...block.value, html: value }),
});
</script>
