<script setup lang="ts">
import { ref } from "vue";
import inlineBarState from "@/state/InlineBarState";
import { hasSelectedLink } from "@/utils/ui/Selection";
import InlineBar from "@/components/helpers/InlineBar.vue";
import ContentEditable from "../ContentEditable.vue";
import Label from '@/components/ui/controls/Label.vue';

interface Props {
  id?: string;
  showAlign?: boolean;
}

withDefaults(defineProps<Props>(), {
  id: () => crypto.randomUUID(),
  showAlign: true,
});

const model = defineModel<string>();
const isSourceVisible = ref(false);
const isFullScreen = ref(false);

const checkModifiers = () => {
  inlineBarState.state.isBold = document.queryCommandState("bold") || false;
  inlineBarState.state.isItalic = document.queryCommandState("italic") || false;
  inlineBarState.state.isUnderline = document.queryCommandState("underline") || false;
  inlineBarState.state.isStrikeThrough = document.queryCommandState("strikeThrough") || false;
  // inlineBarState.state.isSuperscript = document.queryCommandState("superscript");
  // inlineBarState.state.isSubscript = document.queryCommandState("subscript");
  inlineBarState.state.textColor = document.queryCommandValue("foreColor") || "#000000";
  inlineBarState.state.backgroundColor = document.queryCommandValue("backColor") || "";
  inlineBarState.state.hasLink = hasSelectedLink();
};

const handlePaste = (event: ClipboardEvent) => {
  const text = event.clipboardData?.getData("text/plain") || "";
  document.execCommand("insertText", false, text);
};

const handleMouseUp = () => {
  checkModifiers();
};
</script>

<template>
  <Teleport to="#full-screen-editor" :disabled="!isFullScreen">
    <div
      class="shrink-0 text-white"
      :class="{
        'fullscreen fixed w-screen h-screen top-0 left-0 z-50 p-10 bg-white/90 dark:bg-black/90 backdrop-blur-2xl':
          isFullScreen
      }"
    >
      <Label v-if="!isFullScreen" class="mb-4" :for="id">
        <slot />
      </Label>
      <div
        class=" relative rounded-md border-0 py-1.5 px-2 bg-white dark:bg-black text-gray-700 dark:text-zinc-300 shadow-xs ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 placeholder:text-gray-400 dark:placeholder:text-zinc-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 dark:focus-within:ring-blue-600 sm:text-sm sm:leading-6"
      >
        <InlineBar
          class="mb-2"
          show-source
          show-full-screen
          v-model:is-source-visible="isSourceVisible"
          v-model:is-full-screen="isFullScreen"
          :show-align="showAlign"
        />
        <textarea
          v-if="isSourceVisible"
          v-model="model"
          class="w-full outline-hidden p-0 ring-none border-none text-gray-700 dark:text-zinc-300 dark:bg-zinc-900"
          :class="[isFullScreen ? 'h-full' : 'max-h-96']"
        />
        <ContentEditable
          v-else
          tag="p"
          class="resize-y overflow-auto outline-hidden text-base"
          :class="[isFullScreen ? 'h-full' : 'min-h-32 max-h-96']"
          v-model="model"
          @mouseup.prevent="handleMouseUp"
          @paste.prevent="handlePaste"
        />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
textarea {
  field-sizing: content;
  -webkit-field-sizing: content;
}
</style>
