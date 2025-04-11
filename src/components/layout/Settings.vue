<template>
  <div class="p-4">
    <h3 v-if="activeBlockId" class="font-bold text-lg p-4">
      Settings
    </h3>
    <div v-if="currentSettingsComponent" class="p-4">
      <component :is="currentSettingsComponent" />
    </div>
    <div v-else class="p-4">
      No settings available for the selected block.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useEditor from '@/store/Editor';

const { activeBlockId, getBlock } = useEditor();

const currentSettingsComponent = computed(async () => {
  if (!activeBlockId.value) {
    return null;
  }

  const block = getBlock.value(activeBlockId.value);
  if (!block) {
    return null;
  }

  let componentName = '';
  switch (block.type) {
    case 'text':
      componentName = 'TextSettings';
      break;
    case 'image':
      componentName = 'ImageSettings';
      break;
    case 'columns':
      componentName = 'ColumnsSettings';
      break;
    // Add more cases for other block types as needed
    default:
      return null;
  }

  try {
    const component = await import(`@/components/settings/${componentName}.vue`);
    return component.default;
  } catch (error) {
    console.error(`Error loading settings component for ${block.type}:`, error);
    return null;
  }
});
</script>