<script setup>
import { computed, provide, ref } from 'vue'
import BaseButton from './components/BaseButton.vue'
import BaseHeader from './components/BaseHeader.vue'
import BaseCard from './components/BaseCard.vue'

import wordListB1 from './data/b1-words.json'
import wordListB2 from './data/b2-words.json'
import wordListA2 from './data/a2-words.json'
import wordListC1 from './data/c1-words.json'

const isShou = ref(true)
const toggleShou = () => {
  isShou.value = !isShou.value
}

const score = ref(0)

const wordMap = {
  A2: wordListA2,
  B1: wordListB1,
  B2: wordListB2,
  C1: wordListC1,
}

const selectedLevel = ref('B1')

const remainingWords = ref([]) // слова, которые ещё не выучены
const cards = ref([])

function selectLevel(level) {
  selectedLevel.value = level.toUpperCase()
  // loadCards(level)
}

function startGame() {
  const level = selectedLevel.value
  remainingWords.value = wordMap[level].map((item) => ({
    word: item.word,
    translation: item.translation,
    state: 'closed',
    status: 'pending',
  }))
  console.log('📦 remainingWords:', remainingWords.value)
  loadCards()
}

function handleAnswer(card, isCorrect) {
  card.status = isCorrect ? 'success' : 'fail'
  score.value += isCorrect ? 1 : 0
}

// async function loadCards(level) {
//   const wordList = wordMap[level]

//   const shuffled = [...wordList].sort(() => Math.random() - 0.5)
//   cards.value = shuffled.slice(0, 20).map((item) => ({
//     word: item.word,
//     translation: item.translation,
//     state: 'closed',
//     status: 'pending',
//   }))
// }

async function loadCards() {
  const shuffled = [...remainingWords.value].sort(() => Math.random() - 0.5)
  cards.value = shuffled.slice(0, 20)
}

async function learnMore() {
  remainingWords.value = remainingWords.value.filter(
    (item) => item.status !== 'success'
  )
  remainingWords.value.forEach((card) => {
    card.status = 'pending'
    card.state = 'closed'
  })
  loadCards()
}

async function restartGame() {
  score.value = 0
  isShou.value = true
  await loadCards(selectedLevel.value.toLowerCase())
}

const learnedCount = computed(() => {
  return (
    wordMap[selectedLevel.value].length -
    remainingWords.value.filter((card) => card.status !== 'success').length
  )
})

provide('scoreKey', score)
</script>

<template>
  <BaseHeader :selected-level="selectedLevel" />

  <div
    v-if="isShou"
    class="app"
  >
    <!-- {{ selectedLevel }} -->

    <BaseButton
      @click="
        () => {
          toggleShou()
          startGame()
        }
      "
    >
      START
    </BaseButton>

    <div class="level-switcher">
      <button
        :class="['level-button', { active: selectedLevel === 'A2' }]"
        @click="selectLevel('a2')"
      >
        a2
      </button>

      <button
        :class="['level-button', { active: selectedLevel === 'B1' }]"
        @click="selectLevel('b1')"
      >
        b1
      </button>
      <button
        :class="['level-button', { active: selectedLevel === 'B2' }]"
        @click="selectLevel('b2')"
      >
        b2
      </button>
      <button
        :class="['level-button', { active: selectedLevel === 'C1' }]"
        @click="selectLevel('c1')"
      >
        c1
      </button>
    </div>
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
    <div class="button-restart">
      <BaseButton @click="restartGame">Начать заново</BaseButton>
      <BaseButton
        v-if="cards.every((card) => card.status !== 'pending')"
        @click="learnMore"
        >УЧИТЬ ДАЛЬШЕ</BaseButton
      >
    </div>
  </div>
  <p>Выучено: {{ learnedCount }}</p>
</template>

<style scoped>
.app {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
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

.level-switcher {
  display: flex;
  gap: 5px;
}

.level-button {
  padding: 10px 30px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  transition: 0.2s;
}

.level-button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
