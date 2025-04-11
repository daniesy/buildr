<template>
  <div class="flex flex-col">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <input
        type="color"
        :id="id"
        v-model="internalValue"
        class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
      />
      <div
        class="ml-2 w-8 h-8 rounded-md"
        :style="{ backgroundColor: internalValue }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: '#ffffff',
  },
});

const emit = defineEmits(['update:modelValue']);

const id = `color-picker-${Math.random().toString(36).substring(2, 15)}`;
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>