<script setup lang="ts">

import { SimpleEditor } from '@/components/ui/controls/components';

const model = defineModel<string>();
</script>

<template>
  <SimpleEditor v-model="model" :show-align="false">Content</SimpleEditor>
</template>
