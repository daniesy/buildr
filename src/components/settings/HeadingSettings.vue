<template>
  <div class="space-y-4">
    <TextInput label="Text" v-model="headingText" />
    <SelectInput
      label="Level"
      v-model="headingLevel"
      :options="[
        { label: 'Level 1', value: 1 },
        { label: 'Level 2', value: 2 },
        { label: 'Level 3', value: 3 },
      ]"
    />
    <SelectInput
      label="Text Align"
      v-model="textAlign"
      :options="[
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Justify', value: 'justify' },
      ]"
    />
    <TextInput label="Font Size" v-model="fontSize" />
    <ColorPicker label="Color" v-model="textColor" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type Heading } from '@/types/blocks/Heading';
import { TextInput, SelectInput, ColorPicker } from '@/components/ui/controls/components';
import useEditor from '@/store/Editor';

const props = defineProps({
  blockId: {
    type: String,
    required: true,
  },
});

const { updateBlock, getBlock } = useEditor();

const block = computed({
  get: () => getBlock.value(props.blockId) as Heading,
  set: (value) => updateBlock(props.blockId, value),
});

const headingText = computed({
  get: () => block.value.text || '',
  set: (value) => (block.value = { ...block.value, text: value }),
});

const headingLevel = computed({
  get: () => block.value.level || 1,
  set: (value) => (block.value = { ...block.value, level: value }),
});

const style = computed({
  get: () => block.value.style || {},
  set: (value) => (block.value = { ...block.value, style: value }),
});

const textAlign = computed({
  get: () => style.value.align || 'left',
  set: (value) => (style.value = { ...style.value, align: value }),
});

const fontSize = computed({
  get: () => style.value.fontSize || '',
  set: (value) => (style.value = { ...style.value, fontSize: value }),
});

const textColor = computed({
  get: () => style.value.textColor || '#000000',
  set: (value) => (style.value = { ...style.value, textColor: value }),
});
</script>
