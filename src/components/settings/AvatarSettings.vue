<template>
  <div>
    <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Avatar Settings</h3>
    <div class="space-y-4">
      <TextInput v-model="src" label="Image URL" />
      <TextInput v-model="alt" label="Alt Text" />

      <div class="grid grid-cols-2 gap-4">
        <NumberInput v-model="size" label="Size (px)" :min="10" />
        <RadioCards
          v-model="shape"
          label="Shape"
          :options="[
            { label: 'Circle', value: 'circle' },
            { label: 'Square', value: 'square' },
          ]"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <NumberInput v-model="borderWidth" label="Border Width (px)" :min="0" />
        <ColorPicker v-model="borderColor" label="Border Color" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { RadioCards, TextInput, ColorPicker, NumberInput } from '@/components/ui/controls';
import useEditor from '@/store/Editor';
import { type Avatar } from '@/types/Avatar';
import { type AvatarStyle } from '@/types/AvatarStyle';


const props = defineProps({
    blockId: {
        type: String,
        required: true,
    },
});

const { updateBlock, getBlock } = useEditor();

// Computed property for the entire block
const block = computed({
    get: () => getBlock.value(props.blockId) as Avatar,
    set: (value) => updateBlock(props.blockId, value),
});

// Computed property for the block's style
const style = computed({
    get: () => block.value.style || {},
    set: (value) => block.value = { ...block.value, style: value },
});

// Computed properties for individual fields, using block.value
const src = computed({
    get: () => block.value.src || '',
    set: (value) => block.value = { ...block.value, src: value },
});

const alt = computed({
    get: () => block.value.alt || '',
    set: (value) => block.value = { ...block.value, alt: value },
});

const size = computed({
    get: () => block.value.size ?? 48,
    set: (value) => block.value = { ...block.value, size: value },
});

const shape = computed({
    get: () => block.value.shape || 'circle',
    set: (value) => block.value = { ...block.value, shape: value },
});

// Computed properties for style fields
const borderWidth = computed({
    get: () => style.value.borderWidth ?? 0,
    set: (value) => style.value = { ...style.value, borderWidth: value },
});

const borderColor = computed({
    get: () => style.value.borderColor || '#000000',
    set: (value) => style.value = { ...style.value, borderColor: value },
});

</script>