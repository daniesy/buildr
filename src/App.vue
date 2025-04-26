<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Settings from './components/layout/Settings.vue';
import Header from './components/layout/Header.vue';
import Renderer from './components/blocks/Renderer.vue';
import BlocksPicker from './components/ui/BlocksPicker.vue';
import useEditor from './store/Editor';

const props = defineProps<{
  emailId?: string;
}>();
const { rootBlocks, setEmailId } = useEditor();

onMounted(() => {
  const emailId = props.emailId || crypto.randomUUID();
  setEmailId(emailId);
});

const currentSize = ref('desktop');
const canvasClass = computed(() => (currentSize.value === 'mobile' ? 'mobile-view' : ''));

const resize = (size: 'mobile' | 'desktop') => {
  currentSize.value = size;
};
</script>
<template>
  <div class="flex h-screen">
    <!-- Main Content Area -->
    <main class="flex-1 bg-white p-4">
      <Header :size="currentSize" @resize="resize" />
      <div id="canvas" :class="canvasClass">
        <Renderer :blocks="rootBlocks" />
      </div>
    </main>

    <!-- Sidebar -->

      <Settings />

    <!-- Add Blocks Popup (globally available) -->
    <BlocksPicker />
  </div>
</template>
