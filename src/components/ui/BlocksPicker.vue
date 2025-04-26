<script setup lang="ts">
import useEditor from '@/store/Editor';
import usePopup from '@/state/PopupState';
import { generateBlock } from '@/utils/DefaultBlocks';

const editor = useEditor();
const { isVisible, parentId, hide } = usePopup();

// Available block types for adding
const availableBlocks = [
  { type: 'text', label: 'Text' },
  { type: 'heading', label: 'Heading' },
  { type: 'image', label: 'Image' },
  { type: 'button', label: 'Button' },
  { type: 'divider', label: 'Divider' },
  { type: 'spacer', label: 'Spacer' },
  { type: 'html', label: 'HTML' },
  { type: 'avatar', label: 'Avatar' },
];

// Function to add a block to a specific parent
const addBlock = (type: string) => {
  // const id = crypto.randomUUID();
  // let newBlock;
  // // Get current order for the new block
  // const childBlocks = editor.getChildBlocks.value(parentId);
  // const order = childBlocks ? childBlocks.length : 0;
  // editor.addBlock(newBlock);
  const childBlocks = editor.getChildBlocks.value(parentId.value);
  const order = childBlocks ? childBlocks.length : 0;
  const block = generateBlock(type, parentId.value, order);
  console.log(block);
  editor.addBlock(block);
  hide();
};
</script>

<template>
  <transition name="fade">
    <div v-if="isVisible" class="popup-overlay" @click="hide">
      <div class="block-menu select-none">
        <div class="block-menu-header">
          <h3 class="text-md font-medium text-gray-800">Add a block</h3>
          <button @click="hide" class="close-button">×</button>
        </div>
        <div class="grid grid-cols-1 gap-1 block-options">
          <button
            v-for="block in availableBlocks"
            :key="block.type"
            @click.stop="addBlock(block.type)"
            class="block-option"
          >
            {{ block.label }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.block-menu {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  padding: 0;
  width: 220px;
  overflow: hidden;
}

.block-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.block-options {
  padding: 8px;
}

.block-option {
  background-color: #f5f7fa;
  border: 1px solid #e5e7eb;
  color: #374151;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 6px;
  text-align: left;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.block-option:hover {
  background-color: #e0e7ff;
  border-color: #c7d2fe;
  color: #4f46e5;
}

.close-button {
  font-size: 22px;
  color: #6b7280;
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;
  line-height: 1;
}

.close-button:hover {
  background-color: #f3f4f6;
  color: #374151;
}

/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
