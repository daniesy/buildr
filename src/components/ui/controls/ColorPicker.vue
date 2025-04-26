<script setup lang="ts">
import Label from './Label.vue';
import { useHasSlots } from '@/composables/useHasSlots';
import { computed, ref, watch, onMounted, nextTick } from 'vue';
import { hexToHsv, hsvToHex, isValidHex, normalizeHex, pickerColors } from '@/utils/Colors';

interface ColorPickerProps {
  id?: string;
  name: string;
  defaultColor?: string;
  usedColors: string[];
  horizontal?: boolean;
  selectedBorderColor: string;
}

const model = defineModel<string>();
const { id, name, defaultColor, selectedBorderColor } = withDefaults(
  defineProps<ColorPickerProps>(),
  {
    id: () => crypto.randomUUID(),
    defaultColor: '#000000',
    usedColors: () => [],
    selectedBorderColor: '#8b3dff',
  },
);

const { hasSlot } = useHasSlots();
const hexValue = ref(model.value || defaultColor);
const pickerOpen = ref(false);

// Color pickers
const colorPickerRef = ref<HTMLDivElement | null>(null);
const colorTriggerRef = ref<HTMLDivElement | null>(null);
const popupRef = ref<HTMLDivElement | null>(null);
const hueSlider = ref<HTMLDivElement | null>(null);
const satBrightnessSquare = ref<HTMLDivElement | null>(null);

// Popup positioning
const popupPosition = ref({
  top: 'auto',
  bottom: 'auto',
  left: 'auto',
  right: 'auto',
  transformOrigin: 'top left',
});

// Mouse tracking
const isDragging = ref(false);
const activeControl = ref<string | null>(null);

// HSV values
const hue = ref(0);
const saturation = ref(0);
const brightness = ref(100);

const borderColor = (color: string, includeActive: boolean = true) => {
  if (color?.toLowerCase() === model.value?.toLowerCase() && includeActive) {
    return selectedBorderColor;
  }

  // check if dark mode
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDarkMode) {
    if (
      color === '#000000' ||
      color === '#000' ||
      color?.toLowerCase() === 'transparent' ||
      !color
    ) {
      return '#444';
    }
  } else {
    if (
      color?.toLowerCase() === '#ffffff' ||
      color?.toLowerCase() === '#fff' ||
      color?.toLowerCase() === 'transparent' ||
      !color
    ) {
      return '#ccc';
    }
  }

  return color;
};

// Set the color from a hex value
const setColorFromHex = (hex: string) => {
  if (isValidHex(hex)) {
    hex = normalizeHex(hex);
    hexValue.value = hex;
    const { h, s, v } = hexToHsv(hex);
    hue.value = h;
    saturation.value = s;
    brightness.value = v;

    // Update the model
    model.value = hex;
  }
};

// Update hex when HSV changes
const updateHexFromHsv = () => {
  const hex = hsvToHex(hue.value, saturation.value, brightness.value);
  hexValue.value = hex;
  model.value = hex;
};

// Handle hex input change
const handleHexChange = (e: Event) => {
  let value = (e.target as HTMLInputElement).value;

  // Add # if not present
  if (value.charAt(0) !== '#') {
    value = `#${value}`;
  }

  hexValue.value = value;

  // If valid hex, update HSV and model
  if (isValidHex(value)) {
    const normalized = normalizeHex(value);
    model.value = normalized;
    const { h, s, v } = hexToHsv(normalized);
    hue.value = h;
    saturation.value = s;
    brightness.value = v;
  }
};

// Calculate the best position for the popup
const calculatePopupPosition = () => {
  if (!colorTriggerRef.value || !popupRef.value) return;

  const triggerRect = colorTriggerRef.value.getBoundingClientRect();
  const popupRect = popupRef.value.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Default position (below the trigger)
  let position = {
    top: `${triggerRect.bottom + 8}px`,
    left: `${triggerRect.left}px`,
    bottom: 'auto',
    right: 'auto',
    transformOrigin: 'top left',
  };

  // Check if popup would go off right edge
  if (triggerRect.left + popupRect.width > viewportWidth) {
    position.left = 'auto';
    position.right = '0px';
    position.transformOrigin = 'top right';
  }

  // Check if popup would go off bottom edge
  if (triggerRect.bottom + popupRect.height > viewportHeight) {
    position.top = 'auto';
    position.bottom = `${window.innerHeight - triggerRect.top + 8}px`;
    position.transformOrigin = position.transformOrigin.replace('top', 'bottom');
  }

  popupPosition.value = position;
};

// Toggle color picker
const toggleColorPicker = () => {
  pickerOpen.value = !pickerOpen.value;

  if (pickerOpen.value) {
    // Allow time for the DOM to update
    nextTick(() => {
      calculatePopupPosition();
      document.addEventListener('mousedown', handleOutsideClick);
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleResize, true);
    });
  } else {
    document.removeEventListener('mousedown', handleOutsideClick);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('scroll', handleResize, true);
  }
};

// Handle window resize or scroll
const handleResize = () => {
  if (pickerOpen.value) {
    calculatePopupPosition();
  }
};

// Handle click outside
const handleOutsideClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (colorPickerRef.value && !colorPickerRef.value.contains(target)) {
    pickerOpen.value = false;
    document.removeEventListener('mousedown', handleOutsideClick);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('scroll', handleResize, true);
  }
};

// Handle hue slider interaction
const handleHueInteraction = (e: MouseEvent) => {
  if (!hueSlider.value) return;

  const rect = hueSlider.value.getBoundingClientRect();
  const y = e.clientY - rect.top;
  const height = rect.height;

  // Calculate hue (0-360)
  let hueValue = (y / height) * 360;
  hueValue = Math.max(0, Math.min(360, hueValue));

  hue.value = hueValue;
  updateHexFromHsv();
};

// Handle saturation/brightness picker interaction
const handleSatBrightInteraction = (e: MouseEvent) => {
  if (!satBrightnessSquare.value) return;

  const rect = satBrightnessSquare.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const width = rect.width;
  const height = rect.height;

  // Calculate saturation (x-axis, 0-100)
  let sat = (x / width) * 100;
  sat = Math.max(0, Math.min(100, sat));

  // Calculate brightness (y-axis, 0-100, inverted)
  let bright = 100 - (y / height) * 100;
  bright = Math.max(0, Math.min(100, bright));

  saturation.value = sat;
  brightness.value = bright;

  updateHexFromHsv();
};

// Start dragging
const startDrag = (e: MouseEvent, control: string) => {
  e.preventDefault();
  isDragging.value = true;
  activeControl.value = control;

  // Initial update
  if (control === 'hue') {
    handleHueInteraction(e);
  } else if (control === 'satbright') {
    handleSatBrightInteraction(e);
  }

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
};

// Handle drag
const onDrag = (e: MouseEvent) => {
  if (!isDragging.value) return;

  if (activeControl.value === 'hue') {
    handleHueInteraction(e);
  } else if (activeControl.value === 'satbright') {
    handleSatBrightInteraction(e);
  }
};

// Stop drag
const stopDrag = () => {
  isDragging.value = false;
  activeControl.value = null;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
};

// Select a predefined or recent color
const selectColor = (color: string) => {
  setColorFromHex(color);
};

// Current color in HSV for the saturation/brightness gradient
const currentHueColor = computed(() => {
  return hsvToHex(hue.value, 100, 100);
});

// Marker positions
const markerPosition = computed(() => {
  return {
    left: `${saturation.value}%`,
    top: `${100 - brightness.value}%`,
  };
});

const hueSliderPosition = computed(() => {
  return {
    top: `${(hue.value / 360) * 100}%`,
  };
});

// Initialize component
onMounted(() => {
  if (model.value) {
    setColorFromHex(model.value);
  } else if (defaultColor) {
    setColorFromHex(defaultColor);
  }
});
</script>

<template>
  <div ref="colorPickerRef" :class="{ 'flex justify-between items-center gap-3': horizontal }">
    <Label :for="id" v-if="hasSlot()" :class="{ 'mb-4': !horizontal }"><slot /></Label>

    <!-- Color trigger -->
    <div class="flex items-center gap-2">
      <!-- Color swatch -->
      <div
        ref="colorTriggerRef"
        class="w-8 h-8 rounded-full cursor-pointer border-1"
        :style="{ backgroundColor: hexValue, borderColor: borderColor(hexValue, false) }"
        @click="toggleColorPicker"
      ></div>
    </div>

    <!-- Color picker popup with dynamic positioning -->
    <div
      v-if="pickerOpen"
      ref="popupRef"
      class="fixed p-3 bg-white/70 backdrop-blur-md dark:bg-zinc-800 rounded-md shadow-lg z-50 w-64"
      :style="{
        top: popupPosition.top,
        bottom: popupPosition.bottom,
        left: popupPosition.left,
        right: popupPosition.right,
        transformOrigin: popupPosition.transformOrigin,
      }"
    >
      <!-- Main color selection area -->
      <div class="flex gap-3 mb-3">
        <!-- Saturation/Brightness square picker -->
        <div
          ref="satBrightnessSquare"
          class="relative w-48 h-48 cursor-crosshair rounded overflow-hidden"
          @mousedown="startDrag($event, 'satbright')"
          @click="handleSatBrightInteraction"
        >
          <!-- Base color from hue -->
          <div class="absolute inset-0" :style="{ backgroundColor: currentHueColor }"></div>

          <!-- White to transparent gradient (saturation) -->
          <div class="absolute inset-0 bg-gradient-to-r from-white to-transparent"></div>

          <!-- Transparent to black gradient (brightness) -->
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>

          <!-- Selection marker -->
          <div
            class="absolute w-3 h-3 rounded-full border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            :style="markerPosition"
          ></div>
        </div>

        <!-- Hue slider -->
        <div
          ref="hueSlider"
          class="relative w-5 h-48 cursor-pointer rounded overflow-hidden"
          @mousedown="startDrag($event, 'hue')"
          @click="handleHueInteraction"
        >
          <div
            class="absolute inset-0"
            style="
              background: linear-gradient(
                to bottom,
                #ff0000,
                #ffff00,
                #00ff00,
                #00ffff,
                #0000ff,
                #ff00ff,
                #ff0000
              );
            "
          ></div>

          <!-- Hue slider marker -->
          <div
            class="absolute w-full h-0.5 bg-white border-l border-r border-gray-400 dark:border-zinc-600 left-0 -translate-y-1/2 pointer-events-none"
            :style="hueSliderPosition"
          ></div>
        </div>
      </div>

      <!-- Hex input -->
      <div class="mb-3">
        <div class="text-xs text-gray-500 dark:text-zinc-400">hex</div>
        <input
          type="text"
          :id="id"
          :name="name"
          v-model="hexValue"
          class="w-full bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded px-2 py-1 text-sm"
          @input="handleHexChange"
        />
      </div>

      <!-- Used in template (as in screenshot) -->
      <div v-if="usedColors.length > 0" class="mb-2">
        <div class="text-xs text-gray-500 dark:text-zinc-400 mb-1">Used in template</div>
        <ul class="grid grid-cols-6 gap-1">
          <li
            v-for="color in usedColors"
            :key="color"
            class="w-full aspect-square cursor-pointer group rounded-full"
            :style="{ borderColor: borderColor(color) }"
            :class="color === model ? 'border-2' : 'border-1 hover:border-2'"
            @click="selectColor(color)"
          >
            <span
              :style="{ backgroundColor: color }"
              class="block h-full rounded-full group-hover:scale-90 group-active:scale-85 transition-all"
            ></span>
          </li>
        </ul>
      </div>

      <!-- Predefined colors -->
      <div>
        <div class="text-xs text-gray-500 dark:text-zinc-400 mb-1">Predefined</div>
        <ul class="grid grid-cols-6 gap-1">
          <li
            v-for="{ label, color } in pickerColors"
            :key="color"
            class="w-full aspect-square cursor-pointer group rounded-full relative"
            :style="{ borderColor: borderColor(color) }"
            :class="color === model ? 'border-2' : 'border-1 hover:border-2'"
            @click="selectColor(color)"
          >
            <span
              :style="{ backgroundColor: color }"
              class="block h-full rounded-full group-hover:scale-90 group-active:scale-85 transition-all"
            ></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-checkerboard {
  background-image:
    linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position:
    0 0,
    0 4px,
    4px -4px,
    -4px 0;
}
</style>
