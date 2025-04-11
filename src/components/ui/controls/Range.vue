<script setup lang="ts">
import Label from './Label.vue';
import { useHasSlots } from '@/composables/useHasSlots';

const model = defineModel();
const { id, name } = defineProps<{
  id: string;
  name: string;
  suffix?: string;
  max?: number;
}>();

const { hasSlot } = useHasSlots();
</script>

<template>
  <div>
    <Label :for="id" v-if="hasSlot()" class="mb-2"><slot /></Label>
    <div class="flex gap-3 items-center text-gray-700 dark:text-zinc-300">
      <slot name="icon" />
      <input
        type="range"
        :id="id"
        :name="name"
        v-model="model"
        :max="max"
        class="w-full bg-gray-200 appearance-none cursor-pointer dark:bg-zinc-700 rounded-md h-1"
      />
      <span class="flex-shrink-0">
        {{ model }}
        <span v-text="suffix"></span>
      </span>
    </div>
  </div>
</template>
