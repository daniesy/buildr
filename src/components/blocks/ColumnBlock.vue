<script setup lang="ts">
import { computed, ref } from 'vue';
import { type Column } from '@/types/blocks/Column';
import Renderer from './Renderer.vue';
import { Block } from '@/types/blocks/Block';
import useEditor from '@/store/Editor';
import usePopup from '@/state/PopupState';

const { block } = defineProps<{
  block: Column;
}>();

const { addBlock } = useEditor();
const popup = usePopup();

// Compute styles for the column
const columnStyle = computed(() => {
  const style = block.style || {};
  return {
    backgroundColor: style.backgroundColor || 'transparent',
    borderRadius: style.borderRadius ? `${style.borderRadius}px` : '0',
    borderWidth: style.borderWidth ? `${style.borderWidth}px` : '0',
    borderColor: style.borderColor || 'transparent',
    borderStyle: 'solid',
    paddingTop: style.paddingTop ? `${style.paddingTop}px` : '8px',
    paddingRight: style.paddingRight ? `${style.paddingRight}px` : '8px',
    paddingBottom: style.paddingBottom ? `${style.paddingBottom}px` : '8px',
    paddingLeft: style.paddingLeft ? `${style.paddingLeft}px` : '8px',
    height: '100%',
    position: 'relative',
  };
});

// Show add blocks popup
const handleAddBlock = () => {
  popup.show(block.id);
};
</script>

<template>
  <div class="column-content" :style="columnStyle">
    <Renderer :blocks="block.children as Block[]" />

    <!-- Add block button -->
    <div v-if="!block.children?.length" class="flex justify-center items-center py-4">
      <button
        @click.stop="handleAddBlock"
        class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-md text-sm flex items-center"
      >
        <span class="mr-1">+</span> Add Content
      </button>
    </div>
    <div v-else class="add-block-button">
      <button
        @click.stop="handleAddBlock"
        class="bg-blue-100 hover:bg-blue-200 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center"
      >
        +
      </button>
    </div>
  </div>
</template>

<style scoped>
.column-content {
  width: 100%;
  min-height: 40px;
}

.add-block-button {
  position: absolute;
  bottom: 4px;
  right: 4px;
  z-index: 10;
}
</style>
