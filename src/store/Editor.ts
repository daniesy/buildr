import { computed, ref, type Ref, watch, onMounted } from "vue";
import { openDB, type IDBPDatabase, type ObjectStore } from 'idb';
import { type Block } from "@/types/Block";
import { type Text } from "@/types/Text";

type BlockTypes = Block | Text;

interface HistoryEntry {
    id: number;
    blocks: Record<string, BlockTypes>;
}

const blocks: Ref<Map<string, BlockTypes>> = ref(new Map());
const activeBlockId = ref<string | null>(null);

let db: IDBPDatabase | null = null;
const currentEmailId = ref<string | null>(null);


const initDatabase = async (emailId: string) => {
    db = await openDB('email-builder', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(currentEmailId.value!)) {
                db.createObjectStore(currentEmailId.value!, { keyPath: 'id' });
            }
        }
    });
};
const maxHistorySize = 50;


const addHistoryEntry = async (emailId: string, blocks: Map<string, BlockTypes>) => {
    if (!db) return;
    const tx = db.transaction(emailId, 'readwrite');
    const store: ObjectStore<any, ["id"], "readonly"> = tx.objectStore(emailId);
    const id = Date.now(); // Use timestamp as unique ID
    const entry: HistoryEntry = {
        id,
        blocks: Object.fromEntries(JSON.parse(JSON.stringify(Array.from(blocks.entries()))))
    };
    await store.add(entry);
    const allKeys = await store.getAllKeys()
    if(allKeys.length>maxHistorySize){
        await store.delete(allKeys[0])
    }
    await tx.done;
};

const loadHistory = async (emailId: string): Promise<HistoryEntry[]> => {
    if (!db || !db.objectStoreNames.contains(emailId)) return [];
    const tx = db.transaction(emailId, 'readonly');
    const store: ObjectStore<any, ["id"], "readonly"> = tx.objectStore(emailId);
    return await store.getAll() as HistoryEntry[];
};

const getHistoryEntry = async (emailId: string, id: number): Promise<HistoryEntry | undefined> => {
    if (!db || !db.objectStoreNames.contains(emailId)) return undefined;
    const tx = db.transaction(emailId, 'readonly');
    const store: ObjectStore<any, ["id"], "readonly"> = tx.objectStore(emailId);
    return await store.get(id) as HistoryEntry | undefined;
};





const useEditor = () => {
    const setEmailId = async (emailId: string) => {
        if(emailId===currentEmailId.value){
            return;
        }
        currentEmailId.value = emailId;

    }

    watch(currentEmailId, async () => {
        if (!currentEmailId.value) return;
        if (!db) await initDatabase(currentEmailId.value);

        const historyEntries = await loadHistory(currentEmailId.value);
        if (historyEntries.length) {
            const lastEntry = historyEntries[historyEntries.length - 1];
            blocks.value = new Map(Object.entries(lastEntry.blocks));
        } else {
            blocks.value.clear();
        }
    })
    
    const pushToHistory = async () => {
        if (!currentEmailId.value) return;
        await addHistoryEntry(currentEmailId.value, blocks.value);

    };

    const addBlock = (block: BlockTypes) => {
        blocks.value.set(block.id, block);
        pushToHistory();
    }

    const removeBlock = (blockId: string) => {
        blocks.value.delete(blockId);
        pushToHistory();
    }
    const updateBlock = (blockId: string, updatedBlock: Partial<BlockTypes>) => {
        const block = blocks.value.get(blockId);
        if (block) {
            blocks.value.set(blockId, { ...block, ...updatedBlock });
        }
        pushToHistory();
    }


    const clearBlocks = () => {
        blocks.value.clear();
        pushToHistory();
    }

    const getBlock = computed(() => (id: string) => blocks.value.get(id));
    const allBlocks = computed(() => Array.from(blocks.value.values()));
    const rootBlocks = computed(() => Array.from(blocks.value.values()).filter(block => !block.parentId));
    const getChildBlocks = computed(() => (parentId: string) => Array.from(blocks.value.values()).filter(block => block.parentId === parentId));
    const getBlockCount = computed(():number => blocks.value.size);


    const activateBlock = (id: string) => {
        if (blocks.value.has(id)) {
            activeBlockId.value = id;
        }
    }

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
        undo,
        getChildBlocks,
        redo,
        activateBlock,
        activeBlockId
        , setEmailId
    }
}

export default useEditor;
