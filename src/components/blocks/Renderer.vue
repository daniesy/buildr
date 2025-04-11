<script setup lang="ts">
import { type Block } from '@/types/Block';
import { type Text } from '@/types/Text';
import TextBlock from './TextBlock.vue';
import useEditor from '../../store/Editor';

const { activateBlock } = useEditor();

const { blocks } = defineProps<{
  blocks: Array<Block>;
}>();

const findComponent = (block: Block) => {
  if (block.type === 'text') {
    return TextBlock;
  }
};

const casted = (block: Block): Text => {
  if (block.type === 'text') {
    return block as Text;
  }
};
</script>

<template>
  <div v-for="block in blocks" :key="block.id" @click.prevent="activateBlock(block.id)">
    <component :is="findComponent(block)" :block="casted(block)" />
  </div>
</template>
