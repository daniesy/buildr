import { computed, ref, type Ref, watch } from 'vue';
import { BlockType } from '@/types/Block';
import { initDatabase, addHistoryEntry, loadHistory, getHistoryEntry } from '@/utils/db';

const blocks: Ref<Map<string, BlockType>> = ref(new Map());
const activeBlockId = ref<string | null>(null);
const currentEmailId = ref<string | null>(null);

const useEditor = () => {
  const setEmailId = async (emailId: string) => {
    if (emailId === currentEmailId.value) {
      return;
    }
    currentEmailId.value = emailId;
  };

  watch(currentEmailId, async () => {
    if (!currentEmailId.value) return;

    // Initialize database with the current email ID
    await initDatabase(currentEmailId.value);

    // Load history entries for the current email ID
    const historyEntries = await loadHistory(currentEmailId.value);
    if (historyEntries.length) {
      const lastEntry = historyEntries[historyEntries.length - 1];
      blocks.value = new Map(Object.entries(lastEntry.blocks));
    } else {
      blocks.value.clear();
    }
  });

  const pushToHistory = async () => {
    if (!currentEmailId.value) return;
    await addHistoryEntry(currentEmailId.value, blocks.value);
  };

  const addBlock = (block: BlockType) => {
    blocks.value.set(block.id, block);
    pushToHistory();
  };

  const removeBlock = (blockId: string) => {
    blocks.value.delete(blockId);
    pushToHistory();
  };

  const getProperty = computed(() => (blockId: string, key: string) => {
    const block: BlockType | undefined = blocks.value.get(blockId);
    if (!block) return undefined;
    // Check if the key exists on the block
    if (key in block) {
      return (block as BlockType)[key];
    }
  });

  const updateProperty = (blockId: string, key: string, value?: any) => {
    const block: BlockType = blocks.value.get(blockId);
    if (!block) return;

    // Only update if the key exists on the block
    if (key in block) {
      (block as BlockType)[key] = value;
    }
    // Optionally, handle nested keys like 'style'
    else if (key === 'style' && typeof value === 'object') {
      block.style = { ...block.style, ...value };
    }

    pushToHistory();
  };

  const clearBlocks = () => {
    blocks.value.clear();
    pushToHistory();
  };

  const getBlock = computed(() => (id: string) => blocks.value.get(id));
  const allBlocks = computed(() => Array.from(blocks.value.values()));
  const rootBlocks = computed(() =>
    Array.from(blocks.value.values()).filter((block) => !block.parentId),
  );
  const getChildBlocks = computed(
    () => (parentId: string) =>
      Array.from(blocks.value.values()).filter((block) => block.parentId === parentId),
  );
  const getBlockCount = computed((): number => blocks.value.size);

  const activateBlock = (id: string) => {
    if (blocks.value.has(id)) {
      activeBlockId.value = id;
    }
  };

  const undo = async () => {
    if (!currentEmailId.value) return;
    const historyEntries = await loadHistory(currentEmailId.value);
    if (historyEntries.length > 1) {
      const previousEntry = historyEntries[historyEntries.length - 2];
      if (previousEntry) {
        blocks.value = new Map(Object.entries(previousEntry.blocks));
        await pushToHistory();
        // delete last entry
      }
    }
  };

  const redo = async () => {
    if (!currentEmailId.value) return;
    const historyEntries = await loadHistory(currentEmailId.value);
    const nextEntry = historyEntries[historyEntries.length];
    if (nextEntry) {
      blocks.value = new Map(Object.entries(nextEntry.blocks));
      await pushToHistory();
    }
  };

  const usedColors = computed(() => {
    // find the colors used in the blocks
    const colors = new Set<string>();
    blocks.value.forEach((block) => {
      if (block.style && block.style.backgroundColor) {
        colors.add(block.style.backgroundColor);
      }
      if (block.style && block.style.textColor) {
        colors.add(block.style.textColor);
      }
    });

    return Array.from(colors);
  });

  return {
    blocks,
    addBlock,
    removeBlock,
    updateProperty,
    getProperty: getProperty.value,
    getBlock,
    allBlocks,
    clearBlocks,
    getBlockCount,
    rootBlocks,
    undo,
    getChildBlocks,
    redo,
    activateBlock,
    activeBlockId,
    setEmailId,
    usedColors,
  };
};

export default useEditor;
