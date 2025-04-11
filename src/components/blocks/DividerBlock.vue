<script setup lang="ts">
import { type Divider } from '@/types/Divider';

const { block } = defineProps<{
  block: Divider;
}>();
</script>

<template>
  <hr class="divider" />
</template>