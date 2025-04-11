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
import generateEmailHTML from './utils/generateEmailHTML';
import { Block } from './types/Block';
import { Avatar } from './types/Avatar';
import { Button } from './types/Button';
import { Columns } from './types/Columns';
const { addBlock, rootBlocks } = useEditor();
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
addBlock({
    id: '2',
    type: 'avatar',
    src: 'https://example.com/avatar.png',
} as Avatar);
addBlock({
    id: '3',
    type: 'button',
    text: 'Click Me',
    href: 'https://example.com',
} as Button);
addBlock({
    id: '4',
    type: 'columns',
    children: [
        {
            id: '5',
            type: 'text',
            text: 'Column 1',
        } as Text,
        {
            id: '6',
            type: 'text',
            text: 'Column 2',
        } as Text,
    ]
} as Columns)
const generatedHTML = ref('');
const generateHTML = () => {
    generatedHTML.value = generateEmailHTML(rootBlocks.value as Block[]);
};
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
    <button @click="generateHTML">Generate HTML</button>
    <pre>{{ generatedHTML }}</pre>
</template>
<style scoped></style>