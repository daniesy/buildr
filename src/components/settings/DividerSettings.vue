<template>
  <div class="space-y-4">
    <ColorPicker label="Divider Color" v-model="dividerColor" />
    <SelectInput
      label="Divider Style"
      v-model="dividerStyle"
      :options="[
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' },
      ]"
    />
    <NumberInput label="Divider Thickness (px)" v-model="dividerThickness" :min="1" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type Divider } from '@/types/blocks/Divider';
import { ColorPicker, SelectInput, NumberInput } from '@/components/ui/controls/components';
import useEditor from '@/store/Editor';
import { DividerStyle } from '@/types/styles/DividerStyle';

const props = defineProps({
  blockId: {
    type: String,
    required: true,
  },
});

const { updateBlock, getBlock } = useEditor();

const block = computed({
  get: () => getBlock.value(props.blockId) as Divider,
  set: (value) => updateBlock(props.blockId, value),
});

const style = computed({
  get: () => block.value.style || {},
  set: (value: DividerStyle) => (block.value = { ...block.value, style: value }),
});

// Style properties
const dividerColor = computed({
  get: () => style.value.dividerColor || '#000000',
  set: (value) => (style.value = { ...style.value, dividerColor: value }),
});

const dividerStyle = computed({
  get: () => style.value.dividerStyle || 'solid',
  set: (value) => (style.value = { ...style.value, dividerStyle: value }),
});

const dividerThickness = computed({
  get: () => parseInt(style.value.dividerThickness || '1'),
  set: (value) => (style.value = { ...style.value, dividerThickness: `${value}px` }),
});
</script>
