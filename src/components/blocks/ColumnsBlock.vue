<script setup lang="ts">
import { computed } from 'vue';
import { type Columns } from '@/types/blocks/Columns';
import ColumnBlock from './ColumnBlock.vue';

const { block } = defineProps<{
  block: Columns;
}>();

// Compute styles for the columns container
const columnsStyle = computed(() => {
  const style = block.style || {};
  return {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: block.gap || '20px',
    backgroundColor: style.backgroundColor || 'transparent',
    borderRadius: style.borderRadius ? `${style.borderRadius}px` : '0',
    borderWidth: style.borderWidth ? `${style.borderWidth}px` : '0',
    borderColor: style.borderColor || 'transparent',
    borderStyle: 'solid',
    paddingTop: style.paddingTop ? `${style.paddingTop}px` : '0',
    paddingRight: style.paddingRight ? `${style.paddingRight}px` : '0',
    paddingBottom: style.paddingBottom ? `${style.paddingBottom}px` : '0',
    paddingLeft: style.paddingLeft ? `${style.paddingLeft}px` : '0',
    alignItems: block.alignment || 'stretch',
  };
});

// Calculate individual column widths if specified
const getColumnWidth = (index: number) => {
  if (block.columnWidths && block.columnWidths.length > index) {
    return block.columnWidths[index];
  }
  // Default to equal width columns
  return `${100 / block.children.length}%`;
};
</script>

<template>
  <div class="columns-container" :style="columnsStyle">
    <div
      v-for="(column, index) in block.children"
      :key="column.id"
      class="column-wrapper"
      :style="{ flex: `0 0 ${getColumnWidth(index)}`, width: getColumnWidth(index) }"
    >
      <ColumnBlock :block="column" />
    </div>
  </div>
</template>

<style scoped>
.columns-container {
  width: 100%;
}

@media (max-width: 640px) {
  .columns-container {
    flex-direction: column !important;
  }

  .column-wrapper {
    width: 100% !important;
    flex: 1 1 auto !important;
  }
}
</style>
