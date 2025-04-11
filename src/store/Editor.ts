import { computed, ref } from "vue";
import { type Block } from "@/types/Block";
import { type Text } from "@/types/Text";

type BlockTypes = Block | Text;

const blocks = ref<Map<string, BlockTypes>>(new Map());
const activeBlockId = ref<string | null>(null);

const useEditor = () => {
    const addBlock = (block: BlockTypes) => {
        blocks.value.set(block.id, block);
    }

    const removeBlock = (blockId: string) => {
        blocks.value.delete(blockId);
    }
    const updateBlock = (blockId: string, updatedBlock: Partial<BlockTypes>) => {
        const block = blocks.value.get(blockId);
        if (block) {
            blocks.value.set(blockId, { ...block, ...updatedBlock });
        }
    }

    const clearBlocks = () => {
        blocks.value.clear();
    }

    const getBlock = computed(() => (id: string) => blocks.value.get(id));
    const allBlocks = computed(() => Array.from(blocks.value.values()));
    const rootBlocks = computed(() => Array.from(blocks.value.values()).filter(block => !block.parentId));
    const getChildBlocks = computed(() => (parentId: string) => Array.from(blocks.value.values()).filter(block => block.parentId === parentId));
    const getBlockCount = computed(() => blocks.value.size);

    const activateBlock = (id: string) => {
        if (blocks.value.has(id)) {
            activeBlockId.value = id;
        }
    }

    return {
        blocks,
        addBlock,
        removeBlock,
        updateBlock,
        getBlock,
        allBlocks,
        clearBlocks,
        getBlockCount,
        rootBlocks,
        getChildBlocks,
        activateBlock,
        activeBlockId
    }
}

export default useEditor;
