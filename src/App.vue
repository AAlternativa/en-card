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
    state: 'closed',
    status: 'pending',
  },
  {
    word: 'dog',
    translation: 'собака',
    state: 'closed',
    status: 'pending',
  },
  {
    word: 'cat',
    translation: 'кот',
    state: 'closed',
    status: 'pending',
  },
  {
    word: 'house',
    translation: 'дом',
    state: 'closed',
    status: 'pending',
  },
  {
    word: 'house',
    translation: 'дом',
    state: 'closed',
    status: 'pending',
  },
])
</script>

<template>
  <BaseHeader />
  <div class="app">
    <Button>START</Button>
  </div>

  <div class="cards">
    <BaseCard
      v-for="(card, index) in cards"
      :key="index"
      :numberCardValue="index + 1"
      :cardWordValue="card.word"
      :cardWordRuValue="card.translation"
      :state="card.state"
      :status="card.status"
      @flip="card.state = 'opened'"
      @answerYes="card.status = 'success'"
      @answerNo="card.status = 'fail'"
    />
  </div>

  <p>{{ currentDate }}</p>
</template>

<style scoped>
.app {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cards {
  display: flex;
  justify-content: space-between;
}
</style>
