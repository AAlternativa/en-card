<script setup>
import { ref } from 'vue'

const {
  numberCardValue = 1,
  cardWordValue = 'Loading',
  cardWordRuValue = 'Загрузка',
} = defineProps({
  numberCardValue: Number,
  cardWordValue: String,
  cardWordRuValue: String,
})

const isFlipped = ref(true)
const toggleFlip = () => {
  isFlipped.value = !isFlipped.value
}
</script>

<template>
  <div class="base-card">
    <span class="card-index">{{ numberCardValue }}</span>
    <p
      v-show="isFlipped == true"
      class="card-word"
    >
      {{ cardWordValue }}
    </p>
    <p
      v-show="isFlipped == false"
      class="card-word"
    >
      {{ cardWordRuValue }}
    </p>
    <btn
      class="card-btn"
      @click="toggleFlip"
    >
      Перевернуть
    </btn>
  </div>
</template>

<style scoped>
.base-card {
  width: 250px;
  height: 376px;
  background-color: var(--color-card-bg);
  border-radius: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px;
}

.card-index {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-primary);
}

.card-word {
  margin: 0 auto;
  font-size: 20px;
}

.card-btn {
  font-size: 16px;
  height: 30px;
  width: 200px;
  margin: 0 auto;
  padding: auto;
  background-color: var(--color-btn-active);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}

.card-btn:hover {
  background-color: var(--color-btn);
  color: var(--color-card-bg);
}
</style>
