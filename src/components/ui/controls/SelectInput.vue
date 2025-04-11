<template>
  <div class="space-y-2">
    <label
      v-if="label"
      class="block text-sm font-medium text-gray-700"
      :for="id"
    >
      {{ label }}
    </label>
    <select
      :id="id"
      v-model="internalValue"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: Array,
    required: true,
    // Example: [{ value: 'value1', label: 'Label 1' }, { value: 'value2', label: 'Label 2' }]
  },
});

const emit = defineEmits(['update:modelValue']);

const id = `select-${Math.random().toString(36).substring(2, 15)}`;
const internalValue = ref(props.modelValue);

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});
</script>