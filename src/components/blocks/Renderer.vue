<script setup lang="ts">
import { type Block } from '@/types/blocks/Block';
import { type Text } from '@/types/blocks/Text';
import { type Column } from '@/types/blocks/Column';
import { type Avatar } from '@/types/blocks/Avatar';
import { type Button } from '@/types/blocks/Button';
import { type Columns } from '@/types/blocks/Columns';
import { type Container } from '@/types/blocks/Container';
import { type Divider } from '@/types/blocks/Divider';
import { type Heading } from '@/types/blocks/Heading';
import { type HTML } from '@/types/blocks/HTML';
import { type Image } from '@/types/blocks/Image';
import { type Spacer } from '@/types/blocks/Spacer';
import TextBlock from './TextBlock.vue';
import AvatarBlock from './AvatarBlock.vue';
import ButtonBlock from './ButtonBlock.vue';
import ColumnsBlock from './ColumnsBlock.vue';
import ContainerBlock from './ContainerBlock.vue';
import DividerBlock from './DividerBlock.vue';
import HeadingBlock from './HeadingBlock.vue';
import HTMLBlock from './HTMLBlock.vue';
import ImageBlock from './ImageBlock.vue';
import SpacerBlock from './SpacerBlock.vue';
import ColumnBlock from './ColumnBlock.vue';
import useEditor from '../../store/Editor';

const { activateBlock, updateBlock, removeBlock, activeBlockId } = useEditor();

const { blocks } = defineProps<{
  blocks: Array<Block>;
}>();

const findComponent = (block: Block) => {
  switch (block.type) {
    case 'text':
      return TextBlock;
    case 'avatar':
      return AvatarBlock;
    case 'button':
      return ButtonBlock;
    case 'columns':
      return ColumnsBlock;
    case 'container':
      return ContainerBlock;
    case 'divider':
      return DividerBlock;
    case 'heading':
      return HeadingBlock;
    case 'html':
      return HTMLBlock;
    case 'image':
      return ImageBlock;
    case 'spacer':
      return SpacerBlock;
    case 'column':
      return ColumnBlock;
    default:
      return null; // Or a default block component
  }
};

const casted = (
  block: Block,
):
  | Text
  | Avatar
  | Button
  | Columns
  | Container
  | Divider
  | Heading
  | HTML
  | Image
  | Spacer
  | Column => {
  switch (block.type) {
    case 'text':
      return block as Text;
    case 'avatar':
      return block as Avatar;
    case 'button':
      return block as Button;
    case 'columns':
      return block as Columns;
    case 'container':
      return block as Container;
    case 'divider':
      return block as Divider;
    case 'heading':
      return block as Heading;
    case 'html':
      return block as HTML;
    case 'image':
      return block as Image;
    case 'spacer':
      return block as Spacer;
    case 'column':
      return block as Column;
    default:
      return block as Block; // Or handle default case
  }
};

const moveBlockUp = (index: number) => {
  if (index > 0) {
    const temp = blocks[index - 1];
    blocks[index - 1] = blocks[index];
    blocks[index] = temp;
    updateBlock(blocks[index - 1].id, blocks[index - 1]);
    updateBlock(blocks[index].id, blocks[index]);
  }
};

const moveBlockDown = (index: number) => {
  if (index < blocks.length - 1) {
    const temp = blocks[index + 1];
    blocks[index + 1] = blocks[index];
    blocks[index] = temp;
    updateBlock(blocks[index + 1].id, blocks[index + 1]);
    updateBlock(blocks[index].id, blocks[index]);
  }
};

const deleteBlock = (blockId: string) => {
  if (activeBlockId.value === blockId) {
    // Clear the active block reference when the active block is deleted
    activateBlock(null);
  }
  removeBlock(blockId);
};
</script>

<template>
  <div v-for="(block, index) in blocks" :key="block.id" class="block-container">
    <div class="block-options" v-if="activeBlockId === block.id">
      <button @click="moveBlockUp(index)" :disabled="index === 0">⬆️</button>
      <button @click="deleteBlock(block.id)">🗑️</button>
      <button @click="moveBlockDown(index)" :disabled="index === blocks.length - 1">⬇️</button>
    </div>
    <div
      @click.prevent="activateBlock(block.id)"
      :class="[
        'transition-all duration-150',
        'relative',
        'group',
        activeBlockId === block.id
          ? 'ring-2 ring-blue-500 ring-offset-2 bg-blue-50/40 shadow-lg rounded-lg z-10'
          : 'hover:ring-1 hover:ring-blue-300 hover:bg-blue-50/10 rounded-lg',
      ]"
      style="cursor: pointer"
    >
      <component :is="findComponent(block)" :block="casted(block)" />
    </div>
  </div>
</template>

<style scoped>
.block-container {
  position: relative;
  margin-bottom: 16px;
}

.block-options {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 8px;
  z-index: 20;
}
</style>
