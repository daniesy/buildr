<script setup lang="ts">

import { textAligns } from '@/types/options/Text';
import { FormatAlignCenterIcon, FormatAlignLeftIcon, FormatAlignRightIcon } from '@/components/icons/library';
import RadioCards from '@/components/ui/controls/RadioCards.vue';

const model = defineModel<'left' | 'center' | 'right'>();
</script>

<template>
  <RadioCards :options="textAligns" v-model="model" name="text-align" grid="md:grid-cols-3">Text Align
    <template #item="{ item }">
      <FormatAlignLeftIcon v-if="item === 'left'" class="w-5" />
      <FormatAlignCenterIcon v-if="item === 'center'" class="w-5" />
      <FormatAlignRightIcon v-if="item === 'right'" class="w-5" />
    </template>
  </RadioCards>
</template>
