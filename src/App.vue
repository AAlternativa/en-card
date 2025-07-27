<script setup>
import { provide, ref } from 'vue'
import BaseButton from './components/BaseButton.vue'
import BaseHeader from './components/BaseHeader.vue'
import BaseCard from './components/BaseCard.vue'

import wordListB1 from './data/b1-words.json'
import wordListB2 from './data/b2-words.json'
import wordListA2 from './data/a2-words.json'
import wordListC1 from './data/c1-words.json'

const cards = ref([])

const isShou = ref(true)
const toggleShou = () => {
  isShou.value = !isShou.value
}

const score = ref(0)

const wordMap = {
  a2: wordListA2,
  b1: wordListB1,
  b2: wordListB2,
  c1: wordListC1,
}

const selectedLevel = ref('B1')

function selectLevel(level) {
  selectedLevel.value = level
  loadCards(level)
}

function handleAnswer(card, isCorrect) {
  card.status = isCorrect ? 'success' : 'fail'
  score.value += isCorrect ? 1 : 0
}

provide('scoreKey', score)

async function loadCards(level) {
  const wordList = wordMap[level]

  const shuffled = [...wordList].sort(() => Math.random() - 0.5)
  cards.value = shuffled.slice(0, 20).map((item) => ({
    word: item.word,
    translation: item.translation,
    state: 'closed',
    status: 'pending',
  }))
}

async function restartGame() {
  score.value = 0
  isShou.value = true

  await loadCards()
}
</script>

<template>
  <BaseHeader :selected-level="selectedLevel" />

  <div
    v-if="isShou"
    class="app"
  >
    <!-- {{ selectedLevel }} -->

    <BaseButton @click="toggleShou">START</BaseButton>
    <div class="level-switcher">
      <button
        :class="['level-button', { active: selectedLevel === 'a2' }]"
        @click="selectLevel('a2')"
      >
        a2
      </button>

      <button
        :class="['level-button', { active: selectedLevel === 'b1' }]"
        @click="selectLevel('b1')"
      >
        b1
      </button>
      <button
        :class="['level-button', { active: selectedLevel === 'b2' }]"
        @click="selectLevel('b2')"
      >
        b2
      </button>
      <button
        :class="['level-button', { active: selectedLevel === 'c1' }]"
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
