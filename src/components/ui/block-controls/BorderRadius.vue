<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Label from '@/components/ui/controls/Label.vue';
import SmallToggle from '@/components/ui/controls/SmallToggle.vue';
import Range from '@/components/ui/controls/Range.vue';
import { extractByPosition, generateFromPositions } from '@/utils/Css';
import {
  BorderRadiusIcon,
  VerticalAlignBottomIcon,
  VerticalAlignTopIcon,
} from '@/components/icons/library';

const independent = ref(false);
const model = defineModel<string>();

const borderRadiusTopLeft = computed({
  get: () => extractByPosition(model.value, 'top-left'),
  set: (value: string) =>
    (model.value = generateFromPositions(
      value,
      borderRadiusTopRight.value,
      borderRadiusBottomRight.value,
      borderRadiusBottomLeft.value,
    )),
});

const borderRadiusTopRight = computed({
  get: () => extractByPosition(model.value, 'top-right'),
  set: (value: string) =>
    (model.value = generateFromPositions(
      borderRadiusTopLeft.value,
      value,
      borderRadiusBottomRight.value,
      borderRadiusBottomLeft.value,
    )),
});

const borderRadiusBottomRight = computed({
  get: () => extractByPosition(model.value, 'bottom-right'),
  set: (value: string) =>
    (model.value = generateFromPositions(
      borderRadiusTopLeft.value,
      borderRadiusTopRight.value,
      value,
      borderRadiusBottomLeft.value,
    )),
});

const borderRadiusBottomLeft = computed({
  get: () => extractByPosition(model.value, 'bottom-left'),
  set: (value: string) =>
    (model.value = generateFromPositions(
      borderRadiusTopLeft.value,
      borderRadiusTopRight.value,
      borderRadiusBottomRight.value,
      value,
    )),
});

watch(independent, (newValue: boolean) => {
  if (!newValue) {
    model.value = borderRadiusTopLeft.value;
  } else {
    model.value = `${model.value} ${model.value} ${model.value} ${model.value}`;
  }
});
</script>

<template>
  <Label class="mb-4 flex items-center justify-between">
    Border Radius
    <SmallToggle v-model="independent">Independent radius</SmallToggle>
  </Label>
  <Range
    v-if="!independent"
    v-model="model"
    suffix="px"
    :min="0"
    :max="50"
    :step="2"
    name="border-radius"
  >
    <template #icon>
      <BorderRadiusIcon class="w-6" />
    </template>
  </Range>
  <template v-else>
    <Range
      v-model="borderRadiusTopLeft"
      suffix="px"
      :min="0"
      :max="50"
      :step="2"
      name="border-radius-top"
    >
      <template #icon>
        <VerticalAlignTopIcon class="w-6 -rotate-45" />
      </template>
    </Range>
    <Range
      v-model="borderRadiusTopRight"
      suffix="px"
      :min="0"
      :max="50"
      :step="2"
      name="border-radius-right"
    >
      <template #icon>
        <VerticalAlignTopIcon class="w-6 rotate-45" />
      </template>
    </Range>
    <Range
      v-model="borderRadiusBottomRight"
      suffix="px"
      :min="0"
      :max="50"
      :step="2"
      name="border-radius-bottom"
    >
      <template #icon>
        <VerticalAlignBottomIcon class="w-6 -rotate-45" />
      </template>
    </Range>
    <Range
      v-model="borderRadiusBottomLeft"
      suffix="px"
      :min="0"
      :max="50"
      :step="2"
      name="border-radius-left"
    >
      <template #icon>
        <VerticalAlignBottomIcon class="w-6 rotate-45" />
      </template>
    </Range>
  </template>
</template>
