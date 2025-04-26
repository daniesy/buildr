<template>
  <SwitchGroup as="div" class="flex items-center select-none">
    <SwitchLabel as="span" class="mr-3 text-sm" v-if="hasSlot" @click.prevent="model = !model">
      <span class="font-medium text-gray-700 dark:text-zinc-300 cursor-pointer"><slot /></span>
    </SwitchLabel>
    <Switch
      v-model="model"
      :class="[
        model ? 'bg-blue-600' : 'bg-gray-200 dark:bg-zinc-800',
        'relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
      ]"
    >
      <span
        aria-hidden="true"
        :class="[
          model ? 'translate-x-3' : 'translate-x-0',
          'pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
        ]"
      />
    </Switch>
  </SwitchGroup>
</template>

<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';
import { useHasSlots } from '@/composables/useHasSlots';

const model = defineModel<boolean | undefined>();
const { hasSlot } = useHasSlots();
</script>
