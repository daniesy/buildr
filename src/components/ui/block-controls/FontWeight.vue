<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { fontWeights } from '@/types/options/Text';
import RadioCards from '@/components/ui/controls/RadioCards.vue';
import SmallToggle from '@/components/ui/controls/SmallToggle.vue';

const model = defineModel<string>();
const granular = ref(false);

const fontWeightsToDisplay = computed(() =>
  granular.value ? fontWeights : fontWeights.filter(({ initial }) => initial),
);

onMounted(() => {
  if (model.value) {
    granular.value = !fontWeights.find(({ value }) => value === model.value)?.initial || false;
  }
});
</script>

<template>
  <RadioCards
    :options="fontWeightsToDisplay"
    v-model="model"
    name="font-weight"
    grid="sm:grid-cols-2 md:grid-cols-3"
  >
    <div class="flex items-center justify-between">
      Font Weight
      <SmallToggle v-model="granular">Granular weights</SmallToggle>
    </div>
    <template #item="{ item }">
      <span :style="`font-weight: ${item}`" class="text-2xl">A</span>
    </template>
  </RadioCards>
</template>
