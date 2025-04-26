<template>
  <fieldset aria-label="Choose a memory option">
    <Label v-if="hasSlot()" class="mb-4">
      <slot />
    </Label>
    <div class="mt-2 grid grid-cols-2 gap-4" :class="grid">
      <label
        v-for="{ value, label } in options"
        :key="value"
        class="group select-none flex cursor-pointer items-center justify-center rounded-md px-2 py-2 text-sm font-semibold uppercase sm:flex-1 focus:ring-2 ring-blue-700 hover:text-blue-600 ring-offset-2 dark:ring-offset-zinc-800"
        :class="{
          'ring-0 bg-blue-600 text-white hover:bg-blue-500 hover:text-white!': isActive(value),
          'ring-1 ring-gray-300 dark:ring-zinc-700 bg-white dark:bg-black text-gray-900 dark:text-zinc-100 hover:bg-gray-50 dark:hover:bg-zinc-900 focus-within:ring-inset':
            !isActive(value),
        }"
      >
        <input :id="value" type="radio" :name="value" :value class="sr-only" v-model="model" />
        <span class="group-hover:scale-125 transition-transform">
          <slot name="item" :item="value">
            <span>{{ label || value }}</span>
          </slot>
        </span>
      </label>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useHasSlots } from '@/composables/useHasSlots';
import { Option } from '@/types/options/Option';
import Label from './Label.vue';

const model = defineModel<string>();
const { options } = defineProps<{
  options: Option[];
  grid?: string;
}>();
const { hasSlot } = useHasSlots();

const isActive = computed(() => (name: string) => name === model.value);
</script>
