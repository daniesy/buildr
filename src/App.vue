<script setup lang="ts">
import { ref } from 'vue';
import Renderer from './components/blocks/Renderer.vue';
import Range from './components/ui/controls/Range.vue';
import useEditor from './store/Editor';
import { type Text } from './types/Text';
import { FormatSize } from './components/icons/icons';
import RadioCards, { Option } from './components/ui/controls/RadioCards.vue';
import FormatAlignLeft from './components/icons/FormatAlignLeft.vue';
import FormatAlignCenter from './components/icons/FormatAlignCenter.vue';
import FormatAlignRight from './components/icons/FormatAlignRight.vue';
import FormatAlignJustify from './components/icons/FormatAlignJustify.vue';

const { addBlock, allBlocks, rootBlocks } = useEditor();
const fontSize = ref(16);
const align = ref('left');
const options: Option[] = [
  { value: 'left' },
  { value: 'center' },
  { value: 'right' },
  { value: 'justify' },
];
addBlock({
  id: '1',
  type: 'text',
  text: 'Hello World',
} as Text);
</script>

<template>
  <Range id="font-size" name="font-size" v-model="fontSize" suffix="px" :max="30">
    Font size <template #icon><FormatSize class="size-4" /></template>
  </Range>
  <RadioCards :options grid="lg:grid-cols-4" v-model="align">
    >test
    <template #item="{ item }">
      <FormatAlignLeft class="size-6" v-if="item === 'left'" />
      <FormatAlignCenter class="size-6" v-if="item === 'center'" />
      <FormatAlignRight class="size-6" v-if="item === 'right'" />
      <FormatAlignJustify class="size-6" v-if="item === 'justify'" />
    </template>
  </RadioCards>
  <Renderer :blocks="rootBlocks" />
</template>

<style scoped></style>
