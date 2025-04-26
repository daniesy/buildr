<template>
  <aside
    class="w-96 bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 max-h-screen overflow-auto translate-z-0"
  >
    <h3
      v-if="activeBlockId"
      class="font-bold text-lg p-4 px-3 sticky-top z-1 bg-gray-100 dark:bg-zinc-900"
      @click="pick"
    >
      Settings for {{ activeBlockId }}
    </h3>
    <Finder
      endpoint="https://vault.test/api"
      auth="wvg3v3l0hUr08pbgWCN137eB4SCjFfE5fH9q2eCNDxFFLTuAVzUNI8hV0JfH"
    />

    <div v-if="blockSettings" class="px-3 space-y-6">
      <component :is="blockSettings" :block-id="activeBlockId" />
    </div>
    <div v-else-if="activeBlockId" class="p-4">No settings available for the selected block.</div>
    <div v-else class="p-4">
      <p class="text-gray-500">Select a block to edit its settings.</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import useEditor from '@/store/Editor';
import { toCamelCase, ucFirst } from '@/utils/String';

import { pick, Finder } from '@daniesy/finder';

const { activeBlockId, getBlock } = useEditor();

const blockSettings = computed(() => {
  if (!activeBlockId.value) {
    return null;
  }

  const block = getBlock.value(activeBlockId.value);
  if (!block) {
    return null;
  }

  const name = ucFirst(toCamelCase(block.type));
  return defineAsyncComponent(() => import(`@/components/settings/${name}Settings.vue`));
});
</script>
