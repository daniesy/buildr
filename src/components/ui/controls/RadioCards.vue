<template>
  <fieldset aria-label="Choose a memory option">
    <Label v-if="hasSlot()" class="mb-2">
      <slot />
    </Label>
    <div class="mt-2 grid grid-cols-2 gap-3" :class="grid">
      <label
        v-for="{ value, label } in options"
        :key="value"
        class="flex cursor-pointer items-center justify-center rounded-md px-3 py-3 text-sm font-semibold uppercase sm:flex-1 focus:ring-2 ring-blue-700 hover:text-blue-600 ring-offset-2 dark:ring-offset-zinc-800"
        :class="{
          'ring-0 bg-blue-600 text-white hover:bg-blue-500 hover:text-white!': isActive(value),
          'ring-1 ring-gray-300 dark:ring-zinc-700 bg-white dark:bg-black text-gray-900 dark:text-zinc-100 hover:bg-gray-50 dark:hover:bg-zinc-900 focus-within:ring-inset':
            !isActive(value),
        }"
      >
        <input :id="value" type="radio" :name="value" :value class="sr-only" v-model="model" />
        <slot name="item" :item="value">
          <span>{{ label || value }}</span>
        </slot>
      </label>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useHasSlots } from '@/composables/useHasSlots';
import Label from './Label.vue';

export interface Option {
  value: string;
  label?: string;
}

const model = defineModel<string>();
const { options } = defineProps<{
  options: Option[];
  grid?: string;
}>();
const { hasSlot } = useHasSlots();

const isActive = computed(() => (name: string) => name === model.value);
</script>
