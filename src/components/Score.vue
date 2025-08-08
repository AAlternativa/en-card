<script setup lang="ts">
import { inject, provide } from 'vue'
import IconHeart from '../icons/IconHeart.vue'
import { score } from '@/composables/useGameData'
</script>

<template>
  <div class="word-header__progress">
    <span>{{ score }}/100</span>
    <IconHeart />
  </div>
</template>

<style scoped>
.word-header__progress {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: var(--color-btn-active);
  min-width: 110px;
  height: 48px;
  border-radius: 24px;
  padding: 0px 0px;
}
</style>
