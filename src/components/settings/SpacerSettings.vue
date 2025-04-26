<template>
  <div class="space-y-4">
    <NumberInput v-model="height" label="Height" />
    <ColorPicker v-model="spacerColor" label="Spacer Color" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type Spacer } from '@/types/blocks/Spacer';
import { NumberInput, ColorPicker } from '@/components/ui/controls/components';
import useEditor from '@/store/Editor';

const props = defineProps({
  blockId: {
    type: String,
    required: true,
  },
});

const { updateBlock, getBlock } = useEditor();

const block = computed({
  get: () => getBlock.value(props.blockId) as Spacer,
  set: (value) => updateBlock(props.blockId, value),
});

const style = computed({
  get: () => block.value.style || {},
  set: (value) => (block.value = { ...block.value, style: value }),
});

const height = computed({
  get: () => style.value.height ?? 0,
  set: (value) => (style.value = { ...style.value, height: value }),
});

const spacerColor = computed({
  get: () => style.value.spacerColor || '#000000',
  set: (value) => (style.value = { ...style.value, spacerColor: value }),
});
</script>
