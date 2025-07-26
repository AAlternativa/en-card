<script setup>
import { onMounted, provide, ref } from 'vue'
import BaseButton from './components/BaseButton.vue'
import BaseHeader from './components/BaseHeader.vue'
import BaseCard from './components/BaseCard.vue'
import wordList from './data/words.json'

const cards = ref([])

const isShou = ref(true)
const toggleShou = () => {
  isShou.value = !isShou.value
}

const score = ref(0)

function handleAnswer(card, isCorrect) {
  card.status = isCorrect ? 'success' : 'fail'
  score.value += isCorrect ? 10 : -4
}

provide('scoreKey', score)

async function loadCards() {
  // const res = await fetch('http://localhost:8080/api/random-words')
  // const data = await res.json()
  // cards.value = data.map((item) => ({
  //   word: item.word,
  //   translation: item.translation,
  //   state: 'closed',
  //   status: 'pending',
  // }))

  const shuffled = [...wordList].sort(() => Math.random() - 0.5)
  cards.value = shuffled.slice(0, 50).map((item) => ({
    word: item.word,
    translation: item.translation,
    state: 'closed',
    status: 'pending',
  }))
}

onMounted(async () => {
  loadCards()
})

async function restartGame() {
  score.value = 0
  isShou.value = true

  await loadCards()
}
</script>

<template>
  <BaseHeader />

  <div
    v-if="isShou"
    class="app"
  >
    <BaseButton @click="toggleShou">START</BaseButton>
  </div>

  <div v-else>
    <div class="cards">
      <BaseCard
        v-for="(card, index) in cards"
        :key="index"
        :number-card-value="index + 1"
        :card-word-value="card.word"
        :card-word-ru-value="card.translation"
        :state="card.state"
        :status="card.status"
        @flip="card.state = 'opened'"
        @answer-yes="() => handleAnswer(card, true)"
        @answer-no="() => handleAnswer(card, false)"
      />
    </div>
    <div
      class="button-restart"
      @click="restartGame"
    >
      <BaseButton>Начать заново</BaseButton>
    </div>
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
  gap: 40px 10px;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 50px;
  margin-bottom: 80px;
}

.button-restart {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
}
</style>
