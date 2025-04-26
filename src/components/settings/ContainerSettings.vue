<template>
  <div>
    <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Container Settings</h3>
    <div class="space-y-4">
      <ColorPicker v-model="backgroundColor" label="Background Color" />

      <div class="grid grid-cols-2 gap-4">
        <NumberInput v-model="borderRadius" label="Border Radius (px)" :min="0" />
        <NumberInput v-model="borderWidth" label="Border Width (px)" :min="0" />
      </div>

      <ColorPicker v-model="borderColor" label="Border Color" />

      <div class="grid grid-cols-2 gap-4">
        <NumberInput v-model="paddingTop" label="Padding Top (px)" :min="0" />
        <NumberInput v-model="paddingRight" label="Padding Right (px)" :min="0" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <NumberInput v-model="paddingBottom" label="Padding Bottom (px)" :min="0" />
        <NumberInput v-model="paddingLeft" label="Padding Left (px)" :min="0" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type Container } from '@/types/blocks/Container';
import { ColorPicker, NumberInput } from '@/components/ui/controls/components';
import useEditor from '@/store/Editor';

const props = defineProps({
  blockId: {
    type: String,
    required: true,
  },
});

const { updateBlock, getBlock } = useEditor();

const block = computed({
  get: () => getBlock.value(props.blockId) as Container,
  set: (value) => updateBlock(props.blockId, value),
});

const style = computed({
  get: () => block.value.style || {},
  set: (value) => (block.value = { ...block.value, style: value }),
});

// Style properties
const backgroundColor = computed({
  get: () => style.value.backgroundColor || 'transparent',
  set: (value) => (style.value = { ...style.value, backgroundColor: value }),
});

const borderRadius = computed({
  get: () => style.value.borderRadius ?? 0,
  set: (value) => (style.value = { ...style.value, borderRadius: value }),
});

const borderWidth = computed({
  get: () => style.value.borderWidth ?? 0,
  set: (value) => (style.value = { ...style.value, borderWidth: value }),
});

const borderColor = computed({
  get: () => style.value.borderColor || 'transparent',
  set: (value) => (style.value = { ...style.value, borderColor: value }),
});

const paddingTop = computed({
  get: () => style.value.paddingTop ?? 0,
  set: (value) => (style.value = { ...style.value, paddingTop: value }),
});

const paddingRight = computed({
  get: () => style.value.paddingRight ?? 0,
  set: (value) => (style.value = { ...style.value, paddingRight: value }),
});

const paddingBottom = computed({
  get: () => style.value.paddingBottom ?? 0,
  set: (value) => (style.value = { ...style.value, paddingBottom: value }),
});

const paddingLeft = computed({
  get: () => style.value.paddingLeft ?? 0,
  set: (value) => (style.value = { ...style.value, paddingLeft: value }),
});
</script>
