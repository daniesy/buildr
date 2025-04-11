<template>
  <div>
    <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Image Settings</h3>
    <div class="space-y-4">
      <TextInput v-model="src" label="Image URL" />
      <TextInput v-model="alt" label="Alt Text" />
      <TextInput v-model="href" label="Link URL (Optional)" />

      <RadioCards
        v-model="target"
        label="Link Target"
        :options="[
          { label: 'Same Tab', value: '_self' },
          { label: 'New Tab', value: '_blank' },
        ]"
        v-if="href"
      />

      <RadioCards
        v-model="imageAlignment"
        label="Align"
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

       <div class="grid grid-cols-2 gap-4">
        <NumberInput v-model="paddingX" label="Padding X (px)" :min="0" />
        <NumberInput v-model="paddingY" label="Padding Y (px)" :min="0" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { RadioCards, TextInput, NumberInput } from '@/components/ui/controls';
import { FormatAlignLeft, FormatAlignCenter, FormatAlignRight } from '@/components/icons/icons';
import useEditor from '@/store/Editor';
import { type Image } from '@/types/Image';
import { type BlockWithImageStyle } from '@/types/BlockWithImageStyle';


const props = defineProps({
    blockId: {
        type: String,
        required: true,
    },
});

const { updateBlock, getBlock } = useEditor();

// Computed property for the entire block
const block = computed<Image>({
    get: () => getBlock.value(props.blockId) as Image,
    set: (value) => updateBlock(props.blockId, value),
});

// Computed property for the block's style
const style = computed({
    get: () => (block.value as BlockWithImageStyle).style || {},
    set: (value) => block.value = { ...block.value, style: value },
});

// Computed properties for individual fields
const src = computed({
    get: () => block.value.src || '',
    set: (value) => block.value = { ...block.value, src: value },
});

const alt = computed({
    get: () => block.value.alt || '',
    set: (value) => block.value = { ...block.value, alt: value },
});

const href = computed({
    get: () => block.value.href || '',
    set: (value) => block.value = { ...block.value, href: value },
});

const target = computed({
    get: () => block.value.target || '_self',
    set: (value) => block.value = { ...block.value, target: value },
});

// Computed properties for style fields
const imageAlignment = computed({
    get: () => style.value.imageAlignment || 'center',
    set: (value) => style.value = { ...style.value, imageAlignment: value },
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