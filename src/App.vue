<script setup>
import { ref } from 'vue'
import Button from './components/BaseButton.vue'
import BaseHeader from './components/BaseHeader.vue'
import BaseCard from './components/BaseCard.vue'

const currentDate = ref(new Date().toLocaleDateString('ru-RU'))

const cards = ref([
  {
    word: 'apple',
    translation: 'яблоко',
    state: 'closed', // или 'opened'
    status: 'pending', // или 'success', 'fail'
  },
])
</script>

<template>
  <BaseHeader />
  <div class="app">
    <Button>START</Button>
  </div>

  <BaseCard
    numberCardValue="1"
    :cardWordValue="cards[0].word"
    :cardWordRuValue="cards[0].translation"
  />

  <p>{{ currentDate }}</p>
</template>

<style scoped>
.app {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
