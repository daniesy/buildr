<template>
  <TextContent v-model="text" />
  <div class="flex gap-3 justify-between">
    <ColorPicker
      v-model="textColor"
      :used-colors="usedColors"
      default-color="#fff"
      name="text-color"
      horizontal
    >
      Text Color
    </ColorPicker>
    <ColorPicker
      v-model="backgroundColor"
      :used-colors="usedColors"
      default-color="transparent"
      name="background-color"
      horizontal
    >
      Background Color
    </ColorPicker>
  </div>
  <FontSize v-model="fontSize" />
  <FontWeight v-model="fontWeight" />
  <TextAlign v-model="align" />
  <Padding v-model="padding" />
  <Margin v-model="margin" />
  <BorderRadius v-model="borderRadius" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import useEditor from '@/store/Editor';
import { TextStyle } from '@/types/styles/TextStyle';
import {
  BorderRadius,
  FontSize,
  FontWeight,
  Margin,
  Padding,
  TextAlign,
  TextContent,
} from '@/components/ui/block-controls/all';
import ColorPicker from '@/components/ui/controls/ColorPicker.vue';

const { blockId } = defineProps<{
  blockId: string;
}>();

const { updateProperty, getProperty, usedColors } = useEditor();

const text = computed<string>({
  get: () => getProperty(blockId, 'text') as string,
  set: (value: string) => updateProperty(blockId, 'text', value),
});

const style = computed<TextStyle>({
  get: () => getProperty(blockId, 'style') as TextStyle,
  set: (value: TextStyle) => updateProperty(blockId, 'style', value),
});

const fontSize = computed<string>({
  get: () => style.value.fontSize,
  set: (value: string) => (style.value.fontSize = value),
});

const fontWeight = computed<string>({
  get: () => style.value.fontWeight,
  set: (value: string) => (style.value.fontWeight = value),
});

const align = computed<'left' | 'center' | 'right'>({
  get: () => style.value.align,
  set: (value: 'left' | 'center' | 'right') => (style.value.align = value),
});

const padding = computed<string>({
  get: () => style.value.padding,
  set: (value: string) => (style.value.padding = value),
});

const margin = computed<string>({
  get: () => style.value.margin,
  set: (value: string) => (style.value.margin = value),
});

const borderRadius = computed<string>({
  get: () => style.value.borderRadius,
  set: (value: string) => (style.value.borderRadius = value),
});

const backgroundColor = computed<string>({
  get: () => style.value.backgroundColor,
  set: (value: string) => (style.value.backgroundColor = value),
});

const textColor = computed<string>({
  get: () => style.value.textColor,
  set: (value: string) => (style.value.textColor = value),
});
</script>
