<template>
  <div class="space-y-4">
    <ColorPicker label="Divider Color" v-model="dividerColor" />
    <SelectInput
      label="Divider Style"
      v-model="dividerStyle"
      :options="[
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' },
      ]"
    />
    <TextInput label="Divider Thickness" v-model="dividerThickness" />
  </div>
</template>

<script setup>
import TextInput from '../ui/controls/TextInput.vue';
import SelectInput from '../ui/controls/SelectInput.vue';
import ColorPicker from '../ui/controls/ColorPicker.vue';
import { ref } from 'vue';

const dividerColor = ref('#000000');
const dividerStyle = ref('solid');
const dividerThickness = ref('1px');
</script>