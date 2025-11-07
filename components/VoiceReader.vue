<template>
  <div class="voice-reader">
    <button
      @click="toggleReading"
      :class="[
        'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
        isReading 
          ? 'bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
      ]"
    >
      <Icon
        :name="isReading ? 'ph:ear' : 'ph:ear-slash'"
        :class="[
          'w-4 h-4',
          isReading 
            ? 'text-primary animate-pulse' 
            : 'text-gray-600 dark:text-gray-300'
        ]"
      />
    </button>
    <span ref="announceElement" class="sr-only" aria-live="polite"></span>
  </div>
</template>

<script setup>
import { useVoiceReader } from "~/composables/useVoiceReader";

const { isReading, toggleReading, announceElement } = useVoiceReader();
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
