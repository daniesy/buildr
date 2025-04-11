<template>
  <div class="space-y-4">
    <TextInput label="Text" v-model="heading.text" />
    <SelectInput
      label="Level"
      v-model="heading.level"
      :options="[
        { label: 'Level 1', value: 1 },
        { label: 'Level 2', value: 2 },
        { label: 'Level 3', value: 3 },
      ]"
    />
    <SelectInput
      label="Text Align"
      v-model="heading.style.textAlign"
      :options="[
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Justify', value: 'justify' },
      ]"
    />
    <TextInput label="Font Size" v-model="heading.style.fontSize" />
    <ColorPicker label="Color" v-model="heading.style.color" />
  </div>
</template>

<script setup>
import TextInput from '../ui/controls/TextInput.vue';
import SelectInput from '../ui/controls/SelectInput.vue';
import ColorPicker from '../ui/controls/ColorPicker.vue';

const props = defineProps({
  heading: {
    type: Object,
    required: true,
  },
});

const heading = defineModel('heading', { required: true });
</script>