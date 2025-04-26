<template>
  <div>
    <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Button Settings</h3>
    <div class="space-y-4">
      <TextInput v-model="text" label="Text" />
      <TextInput v-model="href" label="Link URL" />

      <RadioCards
        v-model="size"
        label="Size"
        :options="[
          { label: 'XS', value: 'xs' },
          { label: 'SM', value: 'sm' },
          { label: 'MD', value: 'md' },
          { label: 'LG', value: 'lg' },
        ]"
      />

      <RadioCards
        v-model="target"
        label="Target"
        :options="[
          { label: 'Same Tab', value: '_self' },
          { label: 'New Tab', value: '_blank' },
        ]"
      />

      <ColorPicker v-model="backgroundColor" label="Background Color" />
      <ColorPicker v-model="textColor" label="Text Color" />

      <div class="grid grid-cols-2 gap-4">
        <NumberInput v-model="paddingX" label="Padding X (px)" :min="0" />
        <NumberInput v-model="paddingY" label="Padding Y (px)" :min="0" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <NumberInput v-model="borderRadius" label="Border Radius (px)" :min="0" />
        <NumberInput v-model="borderWidth" label="Border Width (px)" :min="0" />
      </div>
      <ColorPicker v-model="borderColor" label="Border Color" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  ColorPicker,
  NumberInput,
  RadioCards,
  TextInput,
} from '@/components/ui/controls/components';
import useEditor from '@/store/Editor';
import { type Button } from '@/types/blocks/Button';
import { type BlockWithButtonStyle } from '@/types/styles/BlockWithButtonStyle';

const props = defineProps({
  blockId: {
    type: String,
    required: true,
  },
});

const { updateBlock, getBlock } = useEditor();

// Computed property for the entire block
const block = computed({
  get: () => getBlock.value(props.blockId) as Button,
  set: (value) => updateBlock(props.blockId, value),
});

// Computed property for the block's style
const style = computed({
  get: () => (block.value as BlockWithButtonStyle).style || {},
  set: (value) => (block.value = { ...block.value, style: value }),
});

// Computed properties for individual fields, using block.value
const text = computed({
  get: () => block.value.text || '',
  set: (value) => (block.value = { ...block.value, text: value }),
});

const href = computed({
  get: () => block.value.href || '',
  set: (value) => (block.value = { ...block.value, href: value }),
});

const size = computed({
  get: () => block.value.size || 'md',
  set: (value) => (block.value = { ...block.value, size: value }),
});

const target = computed({
  get: () => block.value.target || '_self',
  set: (value) => (block.value = { ...block.value, target: value }),
});

// Computed properties for style fields
const backgroundColor = computed({
  get: () => style.value.backgroundColor || '#000000',
  set: (value) => (style.value = { ...style.value, backgroundColor: value }),
});

const textColor = computed({
  get: () => style.value.textColor || '#ffffff',
  set: (value) => (style.value = { ...style.value, textColor: value }),
});

const paddingX = computed({
  get: () => style.value.paddingX ?? 16, // Default value if undefined
  set: (value) => (style.value = { ...style.value, paddingX: value }),
});

const paddingY = computed({
  get: () => style.value.paddingY ?? 8, // Default value if undefined
  set: (value) => (style.value = { ...style.value, paddingY: value }),
});

const borderRadius = computed({
  get: () => style.value.borderRadius ?? 4, // Default value if undefined
  set: (value) => (style.value = { ...style.value, borderRadius: value }),
});

const borderWidth = computed({
  get: () => style.value.borderWidth ?? 0, // Default value if undefined
  set: (value) => (style.value = { ...style.value, borderWidth: value }),
});

const borderColor = computed({
  get: () => style.value.borderColor || '#000000',
  set: (value) => (style.value = { ...style.value, borderColor: value }),
});
</script>
