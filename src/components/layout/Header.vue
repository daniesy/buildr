<template>
  
  <header class="flex items-center justify-between bg-white p-4 text-2xl font-bold">
  

  <div class="flex space-x-2">
    <button
      class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
      @click="undo"
    >
      Undo
    </button>
    <button
      class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
      @click="redo"
    >
      Redo
    </button>

    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="preview"
    >
      Preview
    </button>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="send"
    >
      Send
    </button>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="save"
    >
      Save
    </button>
    <button
      :class="[size === 'mobile' ? 'bg-blue-500 text-white' : 'bg-gray-200', 'hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded']"
      @click="mobileView"
    >
      Mobile View
    </button>
    <button
      :class="[size === 'desktop' ? 'bg-blue-500 text-white' : 'bg-gray-200', 'hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded']"
      @click="desktopView"
    >
      Desktop View
    </button>
  </div>
    </header>
</template>

<script setup>
import useEditor from "@/store/Editor";
import { onMounted, defineEmits, defineProps } from "vue";

const editor = useEditor();

const undo = () => {
  editor.undo();
};

const redo = () => {
  editor.redo();
};

const preview = () => {
  window.open("about:blank", "_blank").document.write("<h1>Preview</h1><p>This is a preview of the email content.</p>");
};
const send = () => {
  console.log("Simulating sending email...");
  // In a real application, this would involve an API call.
};
const save = () => {
  console.log("Simulating saving email...");
  // In a real application, this would involve an API call.
};

const emit = defineEmits(["resize"]);

const mobileView = () => {
  emit("resize", "mobile");
};

const desktopView = () => {
  emit("resize", "desktop");
};

defineProps({
  size: String,
});
</script>