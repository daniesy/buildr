import { computed, useSlots } from "vue";

export function useHasSlots() {
    const slots = useSlots();

    const hasSlot = computed(() => (name: string = 'default') => !!slots[name]);    

    return {
        hasSlot,
    }
}