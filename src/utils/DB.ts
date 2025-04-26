import { openDB, type IDBPDatabase } from 'idb';
import { Block } from '@/types/Block';
import { Text } from '@/types/Text';

type BlockTypes = Block | Text;

interface HistoryEntry {
    id: number;
    blocks: Record<string, BlockTypes>;
}

let DB: IDBPDatabase | null = null;
const maxHistorySize = 50;

/**
 * Initialize the database for a specific email ID
 */
export const initDatabase = async (emailId: string) => {
    try {
        // First try to open the database without specifying a version
        // This will open it with the latest version that exists
        DB = await openDB('email-builder');
        
        // Check if the object store exists for this email ID
        if (!DB.objectStoreNames.contains(emailId)) {
            // Close the current database connection
            const currentVersion = DB.version;
            DB.close();
            
            // Reopen with an incremented version to create the new store
            DB = await openDB('email-builder', currentVersion + 1, {
                upgrade(database) {
                    if (!database.objectStoreNames.contains(emailId)) {
                        database.createObjectStore(emailId, { keyPath: 'id' });
                    }
                }
            });
        }
    } catch (error) {
        // If database doesn't exist yet, create it with version 1
        if (error.name === 'NoSuchDatabaseError') {
            DB = await openDB('email-builder', 1, {
                upgrade(database) {
                    database.createObjectStore(emailId, { keyPath: 'id' });
                }
            });
        } else {
            console.error('Database initialization error:', error);
            throw error;
        }
    }
};

/**
 * Add a history entry to the database
 */
export const addHistoryEntry = async (emailId: string, blocks: Map<string, BlockTypes>) => {
    if (!DB) return;
    
    try {
        const tx = DB.transaction(emailId, 'readwrite');
        const store = tx.objectStore(emailId);
        const id = Date.now(); // Use timestamp as unique ID
        const entry: HistoryEntry = {
            id,
            blocks: Object.fromEntries(JSON.parse(JSON.stringify(Array.from(blocks.entries()))))
        };
        
        await store.add(entry);
        
        // Maintain max history size
        const allKeys = await store.getAllKeys();
        if (allKeys.length > maxHistorySize) {
            await store.delete(allKeys[0]);
        }
        
        await tx.done;
        return id;
    } catch (error) {
        console.error('Error adding history entry:', error);
        throw error;
    }
};

/**
 * Load all history entries for an email ID
 */
export const loadHistory = async (emailId: string): Promise<HistoryEntry[]> => {
    if (!DB || !DB.objectStoreNames.contains(emailId)) return [];
    
    try {
        const tx = DB.transaction(emailId, 'readonly');
        const store = tx.objectStore(emailId);
        return await store.getAll() as HistoryEntry[];
    } catch (error) {
        console.error('Error loading history:', error);
        return [];
    }
};

/**
 * Get a specific history entry by ID
 */
export const getHistoryEntry = async (emailId: string, id: number): Promise<HistoryEntry | undefined> => {
    if (!DB || !DB.objectStoreNames.contains(emailId)) return undefined;
    
    try {
        const tx = DB.transaction(emailId, 'readonly');
        const store = tx.objectStore(emailId);
        return await store.get(id) as HistoryEntry | undefined;
    } catch (error) {
        console.error('Error getting history entry:', error);
        return undefined;
    }
};

/**
 * Clear the database for a specific email ID
 */
export const clearEmailHistory = async (emailId: string): Promise<void> => {
    if (!DB || !DB.objectStoreNames.contains(emailId)) return;
    
    try {
        const tx = DB.transaction(emailId, 'readwrite');
        const store = tx.objectStore(emailId);
        await store.clear();
        await tx.done;
    } catch (error) {
        console.error('Error clearing email history:', error);
        throw error;
    }
};