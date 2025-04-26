<script setup lang="ts">
import { fontSizes } from '@/types/options/Text.js';
import { FontSizeIcon } from '@/components/icons/library.js';
import { Range } from '@/components/ui/controls/components.js';

const model = defineModel<string>();
</script>

<template>
  <Range v-model="model" name="font-size" suffix="px" :options="fontSizes" :max="120"
    >Font Size
    <template #icon>
      <FontSizeIcon class="w-6" />
    </template>
  </Range>
</template>
