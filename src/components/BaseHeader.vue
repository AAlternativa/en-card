<script setup>
import { ref } from 'vue'
import Score from './Score.vue'
const score = ref(0)
</script>

<template>
  <div class="word-header">
    <span class="word-header__label">ЗАПОМНИ СЛОВО</span>
    <Score :heart-value="score" />
  </div>
</template>

<style scoped>
.word-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}

.word-header__label {
  font-weight: bold;
  font-size: 14px;
  color: var(--color-primary);
}
</style>
