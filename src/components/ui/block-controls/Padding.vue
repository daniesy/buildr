<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import Label from '@/components/ui/controls/Label.vue';
import SmallToggle from '@/components/ui/controls/SmallToggle.vue';
import Range from '@/components/ui/controls/Range.vue';
import { extractByPosition, generateFromPositions, hasDifferentValues } from '@/utils/Css';
import {
  PaddingIcon,
  VerticalAlignBottomIcon,
  VerticalAlignTopIcon,
} from '@/components/icons/library';

const independent = ref(false);
const model = defineModel<string>();

const paddingTop = computed({
  get: () => extractByPosition(model.value, 'top'),
  set: (value: string) =>
    (model.value = generateFromPositions(
      value,
      paddingRight.value,
      paddingBottom.value,
      paddingLeft.value,
    )),
});

const paddingRight = computed({
  get: () => extractByPosition(model.value, 'right'),
  set: (value: string) =>
    (model.value = generateFromPositions(
      paddingTop.value,
      value,
      paddingBottom.value,
      paddingLeft.value,
    )),
});

const paddingBottom = computed({
  get: () => extractByPosition(model.value, 'bottom'),
  set: (value: string) =>
    (model.value = generateFromPositions(
      paddingTop.value,
      paddingRight.value,
      value,
      paddingLeft.value,
    )),
});

const paddingLeft = computed({
  get: () => extractByPosition(model.value, 'left'),
  set: (value: string) =>
    (model.value = generateFromPositions(
      paddingTop.value,
      paddingRight.value,
      paddingBottom.value,
      value,
    )),
});

watch(independent, (newValue: boolean) => {
  if (!newValue) {
    model.value = paddingTop.value;
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
    Padding
    <SmallToggle v-model="independent">Independent paddings</SmallToggle>
  </Label>
  <Range
    v-if="!independent"
    v-model="model"
    suffix="px"
    :min="0"
    :max="50"
    :step="2"
    name="padding"
  >
    <template #icon>
      <PaddingIcon class="w-6" />
    </template>
  </Range>
  <template v-else>
    <Range v-model="paddingTop" suffix="px" :min="0" :max="50" :step="2" name="padding-top">
      <template #icon>
        <VerticalAlignTopIcon class="w-6" />
      </template>
    </Range>
    <Range v-model="paddingRight" suffix="px" :min="0" :max="50" :step="2" name="padding-right">
      <template #icon>
        <VerticalAlignTopIcon class="w-6 rotate-90" />
      </template>
    </Range>
    <Range v-model="paddingBottom" suffix="px" :min="0" :max="50" :step="2" name="padding-bottom">
      <template #icon>
        <VerticalAlignBottomIcon class="w-6" />
      </template>
    </Range>
    <Range v-model="paddingLeft" suffix="px" :min="0" :max="50" :step="2" name="padding-left">
      <template #icon>
        <VerticalAlignBottomIcon class="w-6 rotate-90" />
      </template>
    </Range>
  </template>
</template>
