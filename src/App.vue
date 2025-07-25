<script setup>
import { onMounted, ref } from 'vue'
import Button from './components/BaseButton.vue'
import BaseHeader from './components/BaseHeader.vue'
import BaseCard from './components/BaseCard.vue'

const cards = ref([])

const isShou = ref(true)
const toggleShou = () => {
  isShou.value = !isShou.value
}

onMounted(async () => {
  const res = await fetch('http://localhost:8080/api/random-words')
  const data = await res.json()

  cards.value = data.map((item) => ({
    word: item.word,
    translation: item.translation,
    state: 'closed',
    status: 'pending',
  }))
})
</script>

<template>
  <BaseHeader />

  <!-- Экран с кнопкой START -->
  <div
    v-if="isShou"
    class="app"
  >
    <Button @click="toggleShou">START</Button>
  </div>

  <!-- Карточки — когда isShou === false -->
  <div
    v-else
    class="cards"
  >
    <BaseCard
      v-for="(card, index) in cards"
      :key="index"
      :number-card-value="index + 1"
      :card-word-value="card.word"
      :card-word-ru-value="card.translation"
      :state="card.state"
      :status="card.status"
      @flip="card.state = 'opened'"
      @answer-yes="card.status = 'success'"
      @answer-no="card.status = 'fail'"
    />
  </div>
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
  gap: 30px;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 30px;
}
</style>
