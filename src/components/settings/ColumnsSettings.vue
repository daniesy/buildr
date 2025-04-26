<script setup>
import { defineModel, computed } from 'vue';
import {
  NumberInput,
  TextInput,
} from '@/components/ui/controls/components';
import useEditor from '@/store/Editor';
const props = defineProps({
  blockId: {
    type: String,
    required: true,
  },
});
const { updateBlock } = useEditor();
const block = defineModel();
const gap = computed({ get: () => block.value.gap, set: (value) => updateBlock(props.blockId, { gap: value }), });
const alignment = computed({ get: () => block.value.alignment, set: (value) => updateBlock(props.blockId, { alignment: value }), });
const columnCount = computed({ get: () => block.value.columnCount, set: (value) => updateBlock(props.blockId, { columnCount: value }), });
const columnWidths = computed({ get: () => block.value.columnWidths, set: (value) => updateBlock(props.blockId, { columnWidths: value }), });
</script>
<template>
  <div>
    <h3 class="text-lg font-medium leading-6 text-gray-900">Columns Settings</h3>
    <div class="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div class="sm:col-span-3">
        <TextInput v-model="gap" label="Gap" />
      </div>
      <div class="sm:col-span-3">
        <TextInput v-model="alignment" label="Alignment" />
      </div>
      <div class="sm:col-span-3">
        <NumberInput v-model="columnCount" label="Column Count" />
      </div>
      <div class="sm:col-span-3">
        <TextInput v-model="columnWidths" label="Column Widths" />
      </div>
    </div>
  </div>
</template>
</script>