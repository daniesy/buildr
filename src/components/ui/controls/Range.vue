<script setup lang="ts">
import Label from './Label.vue';
import { useHasSlots } from '@/composables/useHasSlots';
import { computed, ref, watch, onMounted } from 'vue';

const model = defineModel<string>();
const { id, name, options, suffix, min, max, step } = withDefaults(defineProps<{
  id?: string;
  name: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}>(), {
  id: () => crypto.randomUUID(),
  min: 0,
  max: 100,
  step: 1
});

const { hasSlot } = useHasSlots();
const sliderTrack = ref<HTMLDivElement | null>(null);
const isDragging = ref(false);

const value = computed({
  get: () => parseInt(model.value?.replace(suffix || '', "") || '0'),
  set: (val: number) => {
    // Handle NaN case
    if (isNaN(val)) {
      val = min;
    }
    model.value = `${val}${suffix || ''}`;
  }
});

// If options are provided, use them to determine the actual values
const getValueFromOptions = (index: number): number => {
  if (!options || options.length === 0) return 0;
  // Ensure index is within bounds
  const safeIndex = Math.max(0, Math.min(options.length - 1, index));
  return parseInt(options[safeIndex]);
};

// Calculate tick positions for display - equally spaced
const tickPositions = computed(() => {
  if (!options || options.length === 0) return [];

  return [...Array(options.length)].map((_, index) => {
    // Position ticks at equal intervals
    const tickPercentage = index / (options.length - 1) * 100;
    return {
      position: `${tickPercentage}%`,
      value: parseInt(options[index])
    };
  });
});

// Find the closest tick index based on a percentage
const findClosestTickIndex = (percentage: number): number => {
  if (!tickPositions.value.length) return 0;

  // Clamp percentage to 0-100 range
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  // Convert percentage to index
  const approximateIndex = clampedPercentage / 100 * (tickPositions.value.length - 1);

  // Round to nearest index
  return Math.round(approximateIndex);
};

// Get the percentage position based on value
const percentage = computed(() => {
  // Handle NaN case
  if (isNaN(value.value)) {
    return 0;
  }

  // If we have options, find the closest option and use its index for positioning
  if (options && options.length > 0) {
    const optionValues = options.map(opt => parseInt(opt));
    const valueIndex = optionValues.findIndex(opt => opt === value.value);

    // If the exact value is found in options
    if (valueIndex !== -1) {
      return valueIndex / (options.length - 1) * 100;
    }

    // If not found, find closest option and use its position
    const closestOption = findClosestOption(value.value);
    const closestIndex = optionValues.findIndex(opt => opt === closestOption);
    if (closestIndex !== -1) {
      return closestIndex / (options.length - 1) * 100;
    }
  }

  // Default calculation if not using options
  return ((value.value - min) / (max - min)) * 100;
});

// Position for the thumb
const thumbPositionStyle = computed(() => {
  return {
    left: `${percentage.value}%`
  };
});

// Find the closest option value to snap to if options are provided
const findClosestOption = (val: number): number => {
  if (!options?.length) return val;

  const numericOptions = options.map(opt => parseInt(opt));
  return numericOptions.reduce((prev, curr) =>
    Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
  );
};

const handleTrackClick = (e: MouseEvent) => {
  if (!sliderTrack.value) return;

  const rect = sliderTrack.value.getBoundingClientRect();
  const clickPosition = e.clientX - rect.left;
  const totalWidth = rect.width;

  // Clamp click position to track bounds
  const clampedPosition = Math.max(0, Math.min(totalWidth, clickPosition));

  // Calculate percentage along the track
  const clickPercentage = (clampedPosition / totalWidth) * 100;

  if (options && options.length > 0) {
    // Find the closest tick index and use its value
    const closestIndex = findClosestTickIndex(clickPercentage);
    value.value = getValueFromOptions(closestIndex);
  } else {
    // Standard calculation if not using options
    let newVal = min + (clampedPosition / totalWidth) * (max - min);
    newVal = Math.round(newVal / step) * step;
    value.value = Math.max(min, Math.min(max, newVal));
  }
};

const startDrag = (e: MouseEvent) => {
  e.preventDefault();
  isDragging.value = true;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
};

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value || !sliderTrack.value) return;

  const rect = sliderTrack.value.getBoundingClientRect();
  const position = e.clientX - rect.left;
  const totalWidth = rect.width;

  // Clamp position to track bounds
  const clampedPosition = Math.max(0, Math.min(totalWidth, position));

  // Calculate percentage along the track
  const dragPercentage = (clampedPosition / totalWidth) * 100;

  if (options && options.length > 0) {
    // Snap to the closest tick
    const closestIndex = findClosestTickIndex(dragPercentage);
    value.value = getValueFromOptions(closestIndex);
  } else {
    // Standard calculation if not using options
    let percentage = clampedPosition / totalWidth;
    percentage = Math.max(0, Math.min(1, percentage));
    let newVal = min + percentage * (max - min);
    newVal = Math.round(newVal / step) * step;
    value.value = Math.max(min, Math.min(max, newVal));
  }
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
};

// Initialize the value if not already set
onMounted(() => {
  if (!model.value) {
    model.value = `${min}${suffix || ''}`;
  }
});
</script>

<template>
  <div>
    <Label :for="id" v-if="hasSlot()" class="mb-4"><slot /></Label>
    <div class="relative flex items-center">
      <slot name="icon" />

      <!-- Custom range slider track -->
      <div
        ref="sliderTrack"
        class="relative ml-4 w-full h-0.5 bg-gray-200 dark:bg-zinc-700 cursor-pointer"
        @click="handleTrackClick"
      >
        <!-- Tick marks (equally spaced) -->
        <div v-if="options" class="absolute w-full top-0">
          <div
            v-for="(tick, index) in tickPositions"
            :key="index"
            class="absolute w-px h-px bg-gray-400 dark:bg-zinc-500 top-0 -translate-x-px"
            :style="{ left: tick.position }"
          ></div>
        </div>

        <!-- Thumb/handle -->
        <div
          class="absolute w-3.5 h-3.5 bg-blue-600 hover:bg-blue-500 hover:ring-4 ring-blue-600/80 rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab"
          :class="{ 'cursor-grabbing': isDragging }"
          :style="thumbPositionStyle"
          @mousedown="startDrag"
        ></div>
      </div>

      <div class="flex-shrink-0 ml-4">
        <input type="number" v-model="value" />
        {{ suffix }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide default input styles */
input[type=range] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  background: transparent;
}

/* Hide input number spinner buttons */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
  field-sizing: content;
}
</style>