<script setup lang="ts">
import Score from './Score.vue'

const { selectedLevel } = defineProps({
  selectedLevel: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="word-header">
    <span class="word-header__label">ЗАПОМНИ СЛОВО</span>
    {{ selectedLevel.toUpperCase() }}
    <Score />
  </div>
</template>

<style scoped>
.word-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  margin: 0;
}

.word-header__label {
  font-weight: bold;
  font-size: 14px;
  color: var(--color-primary);
}
</style>
