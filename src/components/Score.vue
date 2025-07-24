<script setup>
import IconHeart from '../icons/IconHeart.vue'

const { heartValue = 100 } = defineProps({
  heartValue: Number,
})
</script>

<template>
  <div class="word-header__progress">
    <span>{{ heartValue }}</span>
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
