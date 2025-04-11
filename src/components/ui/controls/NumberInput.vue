<template>
  <div class="space-y-1">
    <label v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <input
      type="number"
      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).valueAsNumber)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  modelValue: number;
}>();

defineEmits(["update:modelValue"]);
</script>