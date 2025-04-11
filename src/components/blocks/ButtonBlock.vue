<script setup lang="ts">
import { type Button } from "@/types/Button";

const { block } = defineProps<{
  block: Button;
}>();
</script>

<template>
  <a :href="block.href" class="button">{{ block.text }}</a>
</template>