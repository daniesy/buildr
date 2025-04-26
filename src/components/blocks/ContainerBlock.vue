<script setup lang="ts">
import { computed, ref } from 'vue';
import { type Container } from '@/types/blocks/Container';
import Renderer from './Renderer.vue';
import { Block } from '@/types/blocks/Block';
import useEditor from '@/store/Editor';

const { block } = defineProps<{
  block: Container;
}>();

const { addBlock } = useEditor();
const showAddBlockMenu = ref(false);

// Compute styles for the container
const containerStyle = computed(() => {
  const style = block.style || {};
  return {
    backgroundColor: style.backgroundColor || 'transparent',
    borderRadius: style.borderRadius ? `${style.borderRadius}px` : '0',
    borderWidth: style.borderWidth ? `${style.borderWidth}px` : '0',
    borderColor: style.borderColor || 'transparent',
    borderStyle: 'solid',
    paddingTop: style.paddingTop ? `${style.paddingTop}px` : '16px',
    paddingRight: style.paddingRight ? `${style.paddingRight}px` : '16px',
    paddingBottom: style.paddingBottom ? `${style.paddingBottom}px` : '16px',
    paddingLeft: style.paddingLeft ? `${style.paddingLeft}px` : '16px',
    marginBottom: '20px',
    position: 'relative',
  };
});

const toggleAddBlockMenu = () => {
  showAddBlockMenu.value = !showAddBlockMenu.value;
};

// Close block menu when clicking outside
const closeBlockMenu = (event: MouseEvent) => {
  if (showAddBlockMenu.value) {
    showAddBlockMenu.value = false;
  }
};

// Available block types for adding inside container
const availableBlocks = [
  { type: 'text', label: 'Text' },
  { type: 'heading', label: 'Heading' },
  { type: 'image', label: 'Image' },
  { type: 'button', label: 'Button' },
  { type: 'divider', label: 'Divider' },
  { type: 'spacer', label: 'Spacer' },
  { type: 'html', label: 'HTML' },
  { type: 'avatar', label: 'Avatar' },
  { type: 'columns', label: 'Columns' },
];

// Function to add a new block to this container
const addBlockToContainer = (type: string) => {
  const id = crypto.randomUUID();
  let newBlock;

  switch (type) {
    case 'text':
      newBlock = {
        id,
        type: 'text',
        text: 'Your text here',
        order: block.children.length,
        parentId: block.id,
        children: [],
        style: {
          textColor: '#000000',
          fontSize: '16px',
          fontWeight: 'normal',
          align: 'left',
        },
      };
      break;

    case 'heading':
      newBlock = {
        id,
        type: 'heading',
        text: 'Heading',
        level: 2,
        order: block.children.length,
        parentId: block.id,
        children: [],
        style: {
          textColor: '#000000',
          fontSize: '24px',
          fontWeight: 'bold',
          align: 'left',
        },
      };
      break;

    case 'image':
      newBlock = {
        id,
        type: 'image',
        src: 'https://via.placeholder.com/300x200',
        alt: 'Image description',
        href: '',
        order: block.children.length,
        parentId: block.id,
        children: [],
        style: {
          imageWidth: '100%',
          imageHeight: 'auto',
          imageAlignment: 'center',
        },
      };
      break;

    case 'button':
      newBlock = {
        id,
        type: 'button',
        text: 'Click Me',
        href: '#',
        size: 'md',
        order: block.children.length,
        parentId: block.id,
        children: [],
        style: {
          backgroundColor: '#3b82f6',
          textColor: '#ffffff',
          borderRadius: 4,
        },
      };
      break;

    case 'divider':
      newBlock = {
        id,
        type: 'divider',
        order: block.children.length,
        parentId: block.id,
        children: [],
        style: {
          dividerColor: '#e5e7eb',
          dividerStyle: 'solid',
          dividerThickness: '1px',
        },
      };
      break;

    case 'spacer':
      newBlock = {
        id,
        type: 'spacer',
        height: 40,
        order: block.children.length,
        parentId: block.id,
        children: [],
        style: {
          spacerColor: 'transparent',
        },
      };
      break;

    case 'html':
      newBlock = {
        id,
        type: 'html',
        html: '<div>Custom HTML</div>',
        order: block.children.length,
        parentId: block.id,
        children: [],
        style: {},
      };
      break;

    case 'avatar':
      newBlock = {
        id,
        type: 'avatar',
        src: 'https://via.placeholder.com/150',
        alt: 'Avatar',
        size: 80,
        shape: 'circle',
        order: block.children.length,
        parentId: block.id,
        children: [],
        style: {
          imageWidth: '80px',
          imageHeight: '80px',
          imageAlignment: 'center',
        },
      };
      break;

    case 'columns':
      newBlock = {
        id,
        type: 'columns',
        gap: '20px',
        alignment: 'top',
        columnCount: 2,
        columnWidths: ['50%', '50%'],
        order: block.children.length,
        parentId: block.id,
        children: [
          {
            id: crypto.randomUUID(),
            type: 'column',
            order: 0,
            parentId: id,
            children: [],
            style: {},
          },
          {
            id: crypto.randomUUID(),
            type: 'column',
            order: 1,
            parentId: id,
            children: [],
            style: {},
          },
        ],
        style: {},
      };
      break;

    default:
      return;
  }

  addBlock(newBlock);
  showAddBlockMenu.value = false;
};
</script>

<template>
  <div class="container-block" :style="containerStyle">
    <Renderer :blocks="block.children as Block[]" />

    <!-- Add block button and menu -->
    <div v-if="!block.children.length" class="flex justify-center items-center py-4">
      <button
        @click.stop="toggleAddBlockMenu"
        class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-md text-sm flex items-center"
      >
        <span class="mr-1">+</span> Add Content
      </button>
    </div>
    <div v-else class="add-block-button">
      <button
        @click.stop="toggleAddBlockMenu"
        class="bg-blue-100 hover:bg-blue-200 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center"
      >
        +
      </button>

      <!-- Block type menu -->
      <div v-if="showAddBlockMenu" class="block-menu">
        <div class="grid grid-cols-1 gap-1">
          <button
            v-for="block in availableBlocks"
            :key="block.type"
            @click.stop="addBlockToContainer(block.type)"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-1 px-2 rounded text-left"
          >
            {{ block.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-block {
  width: 100%;
  min-height: 40px;
}

.add-block-button {
  position: absolute;
  bottom: 4px;
  right: 4px;
  z-index: 10;
}

.block-menu {
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 4px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 4px;
  width: 120px;
}
</style>
