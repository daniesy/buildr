<template>
  <div>
    <TextInput label="HTML" v-model="html" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TextInput from '../ui/controls/TextInput.vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const html = ref(props.modelValue);

watch(html, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>