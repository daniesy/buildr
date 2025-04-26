import { ref } from "vue";

// Add blocks popup state
const isVisible = ref(false);
const parentId = ref<string | null>(null);

const usePopup = () => {
    const show = (_parentId?: string) => {
        parentId.value = _parentId;
        isVisible.value = true;
    };

    const hide = () => {
        isVisible.value = false;
        parentId.value = null;
    };

    return {
        isVisible,
        parentId,
        show,
        hide
    };
};

export default usePopup;