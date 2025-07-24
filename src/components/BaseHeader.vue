<script setup>
import IconHeart from '../icons/IconHeart.vue'

const { heartValue = '100' } = defineProps({
  heartValue: String,
})
</script>

<template>
  <div class="word-header">
    <span class="word-header__label">ЗАПОМНИ СЛОВО</span>
    <div class="word-header__progress">
      <span>{{ heartValue }}</span>
      <IconHeart />
    </div>
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
