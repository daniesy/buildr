<script setup lang="ts">
import { type Container } from "@/types/Container";
import Renderer from "./Renderer.vue";
import { Block } from "@/types/Block";

const { block } = defineProps<{
  block: Container;
}>();
</script>

<template>
  <div class="container">
    <Renderer :blocks="block.children as Block[]" />
  </div>
</template>