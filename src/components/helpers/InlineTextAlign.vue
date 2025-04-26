<script setup lang="ts">
import { computed } from 'vue';

const options = ['left', 'center', 'right', 'full'];

const model = defineModel<string>();

const path = computed(() => {
  switch (model.value) {
    case options[0]:
      return 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12';
    case options[1]:
      return 'M3.75 6.75h16.5M3.75 12h16.5M8 17.25h8.25';
    case options[2]:
      return 'M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25';
    case options[3]:
      return 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5';
    default:
      return 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12';
  }
});

const toggle = () => {
  const value = model.value || 'left';
  const index = options.indexOf(value);
  model.value = options[(index + 1) % options.length];
};
</script>

<template>
  <button @click.prevent="toggle" class="cursor-pointer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-4 h-4 mx-auto"
    >
      <path class="transition-all" stroke-linecap="round" stroke-linejoin="round" :d="path" />
    </svg>
  </button>
</template>
