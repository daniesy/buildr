<template>
  <div>
    <label
      :for="id"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
    </label>
    <div class="mt-1">
      <input
        :id="id"
        v-model="modelValue"
        type="text"
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        :class="{
          'border-red-500 focus:border-red-500 focus:ring-red-500': hasError,
        }"
      />
      <p v-if="hasError" class="mt-2 text-sm text-red-600" :id="`${id}-error`">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const id = computed(() => {
  return `text-input-${props.label.toLowerCase().replace(/\s+/g, "-")}`;
});

const hasError = computed(() => props.error !== "");
const errorMessage = computed(() => props.error);

const modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>