<template>
  <div class="space-y-4">
    <NumberInput v-model="height" label="Height" />
    <ColorPicker v-model="spacerColor" label="Spacer Color" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NumberInput from '../ui/controls/NumberInput.vue';
import ColorPicker from '../ui/controls/ColorPicker.vue';

const props = defineProps({
  height: {
    type: Number,
    required: true,
  },
  spacerColor: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:height', 'update:spacerColor']);

const height = ref(props.height);
const spacerColor = ref(props.spacerColor);

watch(height, (newValue) => {
  emit('update:height', newValue);
});

watch(spacerColor, (newValue) => {
  emit('update:spacerColor', newValue);
});
</script>