<script setup lang="ts">
import { type Spacer } from "@/types/Spacer";

const { block } = defineProps<{
  block: Spacer;
}>();
</script>

<template>
  <div :style="{ height: block.height + 'px' }"/>
</template>