<script setup lang="ts">
import { ref, onMounted, defineProps, computed } from 'vue';
import Settings from './components/layout/Settings.vue';
import Header from "./components/layout/Header.vue";
import Renderer from "./components/blocks/Renderer.vue";
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


const props = defineProps<{
  emailId?: string;
}>();
const { addBlock, rootBlocks, setEmailId, undo, redo } = useEditor();

onMounted(() => {  
    const emailId = props.emailId || crypto.randomUUID();
    setEmailId(emailId);
});



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
const currentSize = ref('desktop');
const canvasClass = computed(() =>
  currentSize.value === "mobile" ? "mobile-view" : ""
);

const resize = (size: "mobile" | 'desktop') => {
  currentSize.value = size;
};

</script>
<template>
  <div class="flex h-screen">
    <!-- Main Content Area -->
    <main class="flex-1 bg-white p-4">
      <Header
        :size="currentSize"
        @resize="resize"
      />
        <div id="canvas" :class="canvasClass">
              <Renderer :blocks="rootBlocks" />
        </div>
    </main>

    <!-- Sidebar -->
    <aside class="w-96 bg-gray-100 p-4">
      <Settings />
    </aside>
  </div>
</template>