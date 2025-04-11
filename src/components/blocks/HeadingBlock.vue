<script setup lang="ts">
import { type Heading } from '@/types/Heading';
import ContentEditable from '../ui/ContentEditable.vue';
import { computed } from 'vue';
import useEditor from '@/store/Editor';

const { block } = defineProps<{
    block: Heading;
}>();

const { updateBlock } = useEditor();

const model = computed({
    get: () => block.text,
    set: (value: string) => {
        block.text = value;
        updateBlock(block.id, {
            ...block,
            text: value,
        });
    },
});
</script>

<template>
    <ContentEditable tag="h1" v-model="model" class="heading" />
</template>