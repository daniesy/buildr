<template>
  <div>
    <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Text Settings</h3>
    <div class="space-y-4">
      <!-- Corrected prop name: elementTag -> tag -->
      <ContentEditable v-model="text" label="Text" :tag="'div'" />

      <div class="grid grid-cols-2 gap-4">
         <NumberInput v-model="fontSize" label="Font Size (px)" :min="1" />
         <NumberInput v-model="lineHeight" label="Line Height (%)" :min="100" :step="10"/>
      </div>

       <RadioCards
        v-model="align"
        label="Text Align"
        :options="[
          { value: 'left', slot: 'align-left' },
          { value: 'center', slot: 'align-center' },
          { value: 'right', slot: 'align-right' },
        ]"
      >
       <template #align-left><FormatAlignLeft /></template>
       <template #align-center><FormatAlignCenter /></template>
       <template #align-right><FormatAlignRight /></template>
      </RadioCards>

      <ColorPicker v-model="textColor" label="Text Color" />

      <div class="grid grid-cols-2 gap-4">
        <NumberInput v-model="paddingX" label="Padding X (px)" :min="0" />
        <NumberInput v-model="paddingY" label="Padding Y (px)" :min="0" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
// Corrected import path
import { RadioCards, ColorPicker, NumberInput } from '@/components/ui';
import ContentEditable from '@/components/ui/ContentEditable.vue';
import { FormatAlignLeft, FormatAlignCenter, FormatAlignRight } from '@/components/icons/icons';
import useEditor from '@/store/Editor';
import { type Text } from '@/types/Text';
// Corrected import name
import { type TextGeneralStyle } from '@/types/BlockWithTextStyle';


// Use type-based declaration for defineProps
interface Props {
  blockId: string;
}
const props = defineProps<Props>();

const { updateBlock, getBlock } = useEditor();

// Computed property for the entire block
const block = computed({
    get: () => getBlock.value(props.blockId) as Text,
    set: (value) => updateBlock(props.blockId, value),
});

// Computed property for the block's style
const style = computed({
    // Corrected type casting
    get: () => (block.value as { style?: TextGeneralStyle })?.style || {},
    set: (value) => block.value = { ...block.value, style: value },
});

// Computed properties for individual fields
const text = computed({
    get: () => block.value.text || '',
    set: (value) => block.value = { ...block.value, text: value },
});

// Computed properties for style fields
const fontSize = computed({
    get: () => style.value.fontSize ?? 16,
    set: (value) => style.value = { ...style.value, fontSize: value },
});

const lineHeight = computed({
    get: () => style.value.lineHeight ?? 140, // Default to 140%
    set: (value) => style.value = { ...style.value, lineHeight: value },
});

const align = computed({
    get: () => style.value.align || 'left',
    set: (value) => style.value = { ...style.value, align: value },
});

const textColor = computed({
    get: () => style.value.textColor || '#000000',
    set: (value) => style.value = { ...style.value, textColor: value },
});

const paddingX = computed({
    get: () => style.value.paddingX ?? 0,
    set: (value) => style.value = { ...style.value, paddingX: value },
});

const paddingY = computed({
    get: () => style.value.paddingY ?? 0,
    set: (value) => style.value = { ...style.value, paddingY: value },
});

</script>

<style scoped>
/* Optional: Add specific styles for TextSettings if needed */
</style>