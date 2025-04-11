<template>
  <div>
    <h3 class="text-lg font-medium leading-6 text-gray-900">Column Settings</h3>
    <div class="mt-4">
      <p class="text-sm text-gray-500">No specific settings for columns.</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import useEditor from '@/store/Editor';
import { type Block } from '@/types/Block'; // Assuming Block type is defined

const props = defineProps({
  blockId: {
    type: String,
    required: true,
  },
})

const { updateBlock, getBlock } = useEditor()

const block = computed({
  get: () => getBlock.value(props.blockId) as Block, // Replace with actual type if available
  set: (value) => updateBlock(props.blockId, value),
})
</script>

// Example of a reactive property (if needed in the future)
// const exampleSetting = ref('');
</script>