<template>
  <div class="flex items-center">
    <input
      :id="label"
      v-model="internalValue"
      type="checkbox"
      class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
    />
    <label :for="label" class="ml-2 block text-sm text-gray-900">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue);

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});
</script>