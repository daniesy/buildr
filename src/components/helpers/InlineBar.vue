<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  CheckIcon,
  CodeBracketIcon,
  XMarkIcon,
} from '@heroicons/vue/24/solid';

import {
  BackgroundColorIcon,
  BoldIcon,
  ClearFormattingIcon,
  IndentIncreaseIcon,
  IndentDecreaseIcon,
  ItalicIcon,
  LinkAddIcon,
  LinkRemoveIcon,
  StrikethroughIcon,
  TextColorIcon,
  UnderlineIcon,
} from '@/components/icons/library';

import type { Position } from '@/utils/ui/PositionedPopup';
import inlineBarState from '@/state/InlineBarState';

import { colors } from '@/utils/Colors';
import { ucFirst } from '@/utils/String';

import InlineTextAlign from '@/components/helpers/InlineTextAlign.vue';

interface Props {
  position?: Position;
  showAlign?: boolean;
  showSource?: boolean;
  showFullScreen?: boolean;
  injectWindow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showSource: false,
  showFullScreen: false,
  showAlign: true,
});

const emit = defineEmits(['changed', 'addUrl', 'changeAlign']);
const isSourceVisible = defineModel<boolean>('isSourceVisible');

const isFullScreen = defineModel<boolean>('isFullScreen');

const isBold = computed({
  get: () => inlineBarState.state.isBold as boolean,
  set: (value: boolean) => {
    inlineBarState.state.isBold = value;
  },
});

const isItalic = computed({
  get: () => inlineBarState.state.isItalic as boolean,
  set: (value: boolean) => {
    inlineBarState.state.isItalic = value;
  },
});

const isUnderline = computed({
  get: () => inlineBarState.state.isUnderline as boolean,
  set: (value: boolean) => {
    inlineBarState.state.isUnderline = value;
  },
});

const isStrikeThrough = computed({
  get: () => inlineBarState.state.isStrikeThrough as boolean,
  set: (value: boolean) => {
    inlineBarState.state.isStrikeThrough = value;
  },
});

// const isSuperscript = computed({
//   get: () => inlineBarState.state.isSuperscript as boolean,
//   set: (value: boolean) => {
//     inlineBarState.state.isSuperscript = value;
//   }
// });
//
// const isSubscript = computed({
//   get: () => inlineBarState.state.isSubscript as boolean,
//   set: (value: boolean) => {
//     inlineBarState.state.isSubscript = value;
//   }
// });

const textColor = computed({
  get: () => inlineBarState.state.textColor as string,
  set: (value: string) => {
    inlineBarState.state.textColor = value;
  },
});

const backgroundColor = computed({
  get: () => inlineBarState.state.backgroundColor as string,
  set: (value: string) => {
    inlineBarState.state.backgroundColor = value;
  },
});

const hasLink = computed({
  get: () => inlineBarState.state.hasLink as boolean,
  set: (value: boolean) => {
    inlineBarState.state.hasLink = value;
  },
});

const bar = ref();
const urlInputVisible = ref(false);
const areColorsVisible = ref(false);
const colorTarget = ref<'text' | 'background'>('text');

let range: Range | undefined;

const align = ref('left');
const url = ref('');
const urlInput = ref();

const toggleBold = () => {
  isBold.value = !isBold.value;
  document.execCommand('bold');
};

const toggleItalic = () => {
  isItalic.value = !isItalic.value;
  document.execCommand('italic');
};

const toggleUnderline = () => {
  isUnderline.value = !isUnderline.value;
  document.execCommand('underline');
};

const toggleStrikethrough = () => {
  isStrikeThrough.value = !isStrikeThrough.value;
  document.execCommand('strikeThrough');
};

// const toggleSuperscript = () => {
//   isSuperscript.value = !isSuperscript.value;
//   document.execCommand("superscript");
// };
//
// const toggleSubscript = () => {
//   isSubscript.value = !isSubscript.value;
//   document.execCommand("subscript");
// };

const toggleTextColors = () => {
  areColorsVisible.value = !areColorsVisible.value;
  colorTarget.value = 'text';
};

const toggleBackgroundColors = () => {
  areColorsVisible.value = !areColorsVisible.value;
  colorTarget.value = 'background';
};

const changeColor = (color?: string) => {
  if (colorTarget.value === 'text') {
    textColor.value = color || '';
    document.execCommand('foreColor', false, color);
  } else {
    backgroundColor.value = color || '';
    document.execCommand('backColor', false, color);
  }

  areColorsVisible.value = false;
};

const clearFormatting = () => {
  isBold.value = false;
  isItalic.value = false;
  isUnderline.value = false;
  document.execCommand('removeFormat');
};

// const toggleSourceVisible = () => {
//   isSourceVisible.value = !isSourceVisible.value;
// };

const toggleShowUrl = () => {
  urlInputVisible.value = !urlInputVisible.value;

  if (urlInputVisible.value) {
    range = (window.$iframeWindow || window).getSelection()?.getRangeAt(0);
    console.log(range);

    setTimeout(() => {
      urlInput.value.focus();
    }, 100);
  }
};

const removeLink = () => {
  document.execCommand('unlink');
  hasLink.value = false;
};

const addLink = () => {
  if (range) {
    const selectedText = range?.toString();
    const urlValue = url.value;

    if (selectedText && urlValue) {
      const link = `<a href="${urlValue}" class="underline text-blue-500" target="_blank">${selectedText}</a>`;
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges(); // clear current selection
        selection.addRange(range); // select the saved range
      }

      setTimeout(() => {
        document.execCommand('insertHTML', false, link);
      });
    }
  }
  toggleShowUrl();
};

const increaseIndent = () => {
  document.execCommand('indent');
};

const decreaseIndent = () => {
  document.execCommand('outdent');
};

const changeAlign = (align: string | undefined) => {
  if (!align) {
    return;
  }
  document.execCommand('justify' + ucFirst(align));
};

// const removeUrl = () => {
//   document.execCommand("unlink");
//   emit("changed");
// };

const style = computed(() => {
  if (!props.position) {
    return '';
  }

  const barWidth = bar.value ? bar.value.offsetWidth : 0;
  const barHeight = bar.value ? bar.value.offsetHeight : 0;

  let left = props.position.x + (props.position.width - barWidth) / 2;
  if (props.position.anchor) {
    if (left < props.position.anchor.x) {
      left = props.position.anchor.x;
    } else if (left + barWidth > props.position.anchor.x + props.position.anchor.width) {
      left = props.position.anchor.x + props.position.anchor.width - barWidth;
    }
  }

  let top = props.position.y - barHeight;
  if (props.position.anchor) {
    if (top < props.position.anchor.y) {
      top = props.position.y + props.position.height;
    }
  }

  return `transform: translate(${left}px, ${top}px)`;
});

watch(align, (value) => {
  emit('changeAlign', value);
});
</script>

<template>
  <div
    ref="bar"
    class="inline-flex items-center gap-2 rounded-md p-1 backdrop-blur-sm shadow-md text-black dark:text-white transition-all"
    :class="[
      !position
        ? 'relative w-full'
        : 'absolute bg-white/60 dark:bg-zinc-900/60 hover:bg-white/90 dark:hover:bg-zinc-900/90 z-50',
    ]"
    :style="style"
  >
    <form
      @submit.prevent="addLink"
      v-if="urlInputVisible"
      class="absolute left-0 top-0 right-0 bottom-0 flex h-full rounded-md items-center gap-1 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-md z-20 select-none"
    >
      <input
        v-model="url"
        ref="urlInput"
        type="text"
        class="w-32 h-full rounded-md border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 dark:bg-zinc-900 flex-1"
        placeholder="Type the url"
        required
      />
      <button
        type="reset"
        @mouseup.prevent.stop="toggleShowUrl"
        class="rounded-md w-6 h-6 hover:bg-gray-200 dark:hover:bg-zinc-800 cursor-pointer"
      >
        <XMarkIcon class="w-4 h-4 mx-auto text-rose-700 dark:text-rose-400" />
      </button>
      <button
        type="submit"
        class="rounded-md w-6 h-6 hover:bg-gray-200 dark:hover:bg-zinc-800 cursor-pointer"
      >
        <CheckIcon class="w-4 h-4 mx-auto text-teal-600" />
      </button>
    </form>

    <ul
      v-if="areColorsVisible"
      class="absolute left-0 top-0 right-0 bottom-0 flex justify-evenly rounded-md items-center gap-1 px-1 bg-white/80 backdrop-blur-lg z-20 select-none"
    >
      <li
        v-for="{ rgb, bgColor, selectedColor } of colors"
        :key="rgb"
        :class="[
          selectedColor,
          bgColor,
          rgb === (colorTarget === 'text' ? textColor : backgroundColor)
            ? 'ring-3 ring-offset-1 scale-101'
            : '',
        ]"
        class="rounded-full aspect-square w-8 cursor-pointer hover:scale-105 border border-black border-opacity-10"
        @mouseup.prevent.stop="changeColor(rgb)"
      ></li>
      <li
        @mouseup.prevent.stop="changeColor()"
        class="rounded-full aspect-square w-8 cursor-pointer hover:scale-105 border border-black border-opacity-10 flex justify-center items-center bg-white"
      >
        <div class="w-0.5 h-full bg-black -rotate-45"></div>
      </li>
    </ul>

    <button
      :disabled="isSourceVisible"
      @mouseup.prevent.stop="toggleBold"
      class="rounded-md w-6 h-6 hover:bg-gray-200 dark:hover:bg-zinc-800 flex items-center justify-center select-none cursor-pointer"
      :class="{ 'disabled:opacity-50': isSourceVisible }"
    >
      <BoldIcon class="w-4 h-4" :class="{ 'text-blue-500': isBold }" />
    </button>
    <button
      :disabled="isSourceVisible"
      @mouseup.prevent.stop="toggleItalic"
      class="rounded-md w-6 h-6 hover:bg-gray-200 dark:hover:bg-zinc-800 flex items-center justify-center select-none cursor-pointer"
      :class="{ 'disabled:opacity-50': isSourceVisible }"
    >
      <ItalicIcon class="w-4 h-4" :class="{ 'text-blue-500': isItalic }" />
    </button>
    <button
      :disabled="isSourceVisible"
      @mouseup.prevent.stop="toggleUnderline"
      class="rounded-md w-6 h-6 hover:bg-gray-200 dark:hover:bg-zinc-800 flex items-center justify-center select-none cursor-pointer"
      :class="{ 'disabled:opacity-50': isSourceVisible }"
    >
      <UnderlineIcon class="w-4 h-4" :class="{ 'text-blue-500': isUnderline }" />
    </button>

    <button
      :disabled="isSourceVisible"
      @mouseup.prevent.stop="toggleStrikethrough"
      class="rounded-md w-6 h-6 hover:bg-gray-200 dark:hover:bg-zinc-800 flex items-center justify-center select-none cursor-pointer"
      :class="{ 'disabled:opacity-50': isSourceVisible }"
    >
      <StrikethroughIcon class="w-4 h-4" :class="{ 'text-blue-500': isStrikeThrough }" />
    </button>

    <button
      :disabled="isSourceVisible"
      @mouseup.prevent.stop="toggleTextColors"
      class="rounded-md w-6 h-6 hover:bg-gray-200 dark:hover:bg-zinc-800 flex items-center justify-center select-none cursor-pointer"
      :class="{ 'disabled:opacity-50': isSourceVisible }"
    >
      <TextColorIcon class="w-4 h-4" :style="{ color: textColor }" />
    </button>

    <button
      :disabled="isSourceVisible"
      @mouseup.prevent.stop="toggleBackgroundColors"
      class="rounded-md w-6 h-6 hover:bg-gray-200 dark:hover:bg-zinc-800 flex items-center justify-center select-none cursor-pointer"
      :class="{ 'disabled:opacity-50': isSourceVisible }"
    >
      <BackgroundColorIcon class="w-4 h-4" :class="[]" />
    </button>

    <div class="spacer py-1"></div>

    <template v-if="hasLink">
      <button
        v-if="hasLink"
        :disabled="isSourceVisible"
        @mouseup.prevent.stop="removeLink"
        class="rounded-md w-6 h-6 hover:bg-gray-200 dark:hover:bg-zinc-800 cursor-pointer"
        :class="{ 'disabled:opacity-50': isSourceVisible }"
      >
        <LinkRemoveIcon class="w-4 h-4 mx-auto" :class="{ 'text-blue-500': hasLink }" />
      </button>
    </template>

    <button
      v-else
      :disabled="isSourceVisible"
      @mouseup.prevent.stop="toggleShowUrl"
      class="rounded-md w-6 h-6 hover:bg-gray-200 dark:hover:bg-zinc-800 cursor-pointer"
      :class="{ 'disabled:opacity-50': isSourceVisible }"
    >
      <LinkAddIcon class="w-4 h-4 mx-auto" :class="{ 'text-blue-500': hasLink }" />
    </button>

    <div class="spacer py-1"></div>
    <InlineTextAlign
      v-if="showAlign"
      :disabled="isSourceVisible"
      class="rounded-md w-6 h-6 hover:bg-gray-200 dark:hover:bg-zinc-800"
      :class="{ 'disabled:opacity-50': isSourceVisible }"
      v-model="align"
      @update:model-value="changeAlign"
    />

    <button
      :disabled="isSourceVisible"
      @mouseup.prevent.stop="increaseIndent"
      class="rounded-md w-6 h-6 hover:bg-gray-200 dark:hover:bg-zinc-800 cursor-pointer"
      :class="{ 'disabled:opacity-50': isSourceVisible }"
    >
      <IndentIncreaseIcon class="w-4 h-4 mx-auto" />
    </button>

    <button
      :disabled="isSourceVisible"
      @mouseup.prevent.stop="decreaseIndent"
      class="rounded-md w-6 h-6 hover:bg-gray-200 dark:hover:bg-zinc-800 cursor-pointer"
      :class="{ 'disabled:opacity-50': isSourceVisible }"
    >
      <IndentDecreaseIcon class="w-4 h-4 mx-auto" />
    </button>

    <button
      @mouseup.prevent.stop="clearFormatting"
      class="rounded-md w-6 h-6 hover:bg-gray-200 dark:hover:bg-zinc-800 text-base flex items-center justify-center select-none cursor-pointer"
    >
      <ClearFormattingIcon class="w-4 h-4" />
    </button>

    <template v-if="showSource">
      <div class="spacer py-1"></div>

      <button
        @mouseup.prevent.stop="isSourceVisible = !isSourceVisible"
        class="rounded-md w-6 h-6 hover:bg-gray-200 dark:hover:bg-zinc-800 cursor-pointer"
      >
        <CodeBracketIcon class="w-4 h-4 mx-auto" :class="{ 'text-blue-500': isSourceVisible }" />
      </button>
    </template>
    <template v-if="showFullScreen">
      <div class="spacer py-1"></div>

      <button
        @mouseup.prevent.stop="isFullScreen = !isFullScreen"
        class="rounded-md w-6 h-6 hover:bg-gray-200 dark:hover:bg-zinc-800 cursor-pointer"
      >
        <ArrowsPointingInIcon
          v-if="isFullScreen"
          class="w-4 h-4 mx-auto"
          :class="{ 'text-blue-500': isFullScreen }"
        />
        <ArrowsPointingOutIcon
          v-else
          class="w-4 h-4 mx-auto"
          :class="{ 'text-blue-500': isFullScreen }"
        />
      </button>
    </template>
  </div>
</template>

<style scoped>
.spacer {
  &:before {
    content: '';
    display: block;
    width: 2px;
    height: 1rem;
    background-color: rgb(156 163 175 / 0.4) /* bg-gray-400/40 */;
  }
}
.bg-transparent {
  background-image:
    linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position:
    0 0,
    0 4px,
    4px -4px,
    -4px 0px;
}
</style>
