<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import Label from '@/components/ui/controls/Label.vue';
import SmallToggle from '@/components/ui/controls/SmallToggle.vue';
import Range from '@/components/ui/controls/Range.vue';
import { extractByPosition, generateFromPositions, hasDifferentValues } from '@/utils/Css';
import {
  MarginIcon,
  VerticalAlignBottomIcon,
  VerticalAlignTopIcon,
} from '@/components/icons/library';

const independent = ref(false);
const model = defineModel<string>();

const marginTop = computed({
  get: () => extractByPosition(model.value, 'top'),
  set: (value: string) =>
    (model.value = generateFromPositions(
      value,
      marginRight.value,
      marginBottom.value,
      marginLeft.value,
    )),
});

const marginRight = computed({
  get: () => extractByPosition(model.value, 'right'),
  set: (value: string) =>
    (model.value = generateFromPositions(
      marginTop.value,
      value,
      marginBottom.value,
      marginLeft.value,
    )),
});

const marginBottom = computed({
  get: () => extractByPosition(model.value, 'bottom'),
  set: (value: string) =>
    (model.value = generateFromPositions(
      marginTop.value,
      marginRight.value,
      value,
      marginLeft.value,
    )),
});

const marginLeft = computed({
  get: () => extractByPosition(model.value, 'left'),
  set: (value: string) =>
    (model.value = generateFromPositions(
      marginTop.value,
      marginRight.value,
      marginBottom.value,
      value,
    )),
});

watch(independent, (newValue: boolean) => {
  if (!newValue) {
    model.value = marginTop.value;
  } else {
    model.value = `${model.value} ${model.value} ${model.value} ${model.value}`;
  }
});

onMounted(() => {
  independent.value = hasDifferentValues(model.value || '');
});
</script>

<template>
  <Label class="mb-4 flex items-center justify-between">
    Margin
    <SmallToggle v-model="independent">Independent margins</SmallToggle>
  </Label>
  <Range v-if="!independent" v-model="model" suffix="px" :min="0" :max="50" :step="2" name="margin">
    <template #icon>
      <MarginIcon class="w-6" />
    </template>
  </Range>
  <template v-else>
    <Range v-model="marginTop" suffix="px" :min="0" :max="50" :step="2" name="margin-top">
      <template #icon>
        <VerticalAlignTopIcon class="w-6" />
      </template>
    </Range>
    <Range v-model="marginRight" suffix="px" :min="0" :max="50" :step="2" name="margin-right">
      <template #icon>
        <VerticalAlignTopIcon class="w-6 rotate-90" />
      </template>
    </Range>
    <Range v-model="marginBottom" suffix="px" :min="0" :max="50" :step="2" name="margin-bottom">
      <template #icon>
        <VerticalAlignBottomIcon class="w-6" />
      </template>
    </Range>
    <Range v-model="marginLeft" suffix="px" :min="0" :max="50" :step="2" name="margin-left">
      <template #icon>
        <VerticalAlignBottomIcon class="w-6 rotate-90" />
      </template>
    </Range>
  </template>
</template>
