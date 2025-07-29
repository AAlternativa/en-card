<script setup>
import { computed, provide, ref } from 'vue'
import BaseButton from './components/BaseButton.vue'
import BaseHeader from './components/BaseHeader.vue'
import BaseCard from './components/BaseCard.vue'

import wordListB1 from './data/b1-words.json'
import wordListB2 from './data/b2-words.json'
import wordListA2 from './data/a2-words.json'
import wordListC1 from './data/c1-words.json'
import IT from './data/ITwords.json'

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
  IT: IT,
}

const selectedLevel = ref('IT')

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

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

async function restartGame() {
  score.value = 0
  isShou.value = true
  await loadCards(selectedLevel.value.toLowerCase())
}

const isGameCompleted = computed(() => {
  return (
    remainingWords.value.length > 0 &&
    remainingWords.value.every((card) => card.status === 'success')
  )
})

// function speakWord(word) {
//   const utterance = new SpeechSynthesisUtterance(word)
//   utterance.lang = 'en-US'
//   speechSynthesis.speak(utterance)
//   console.log('Говорим:', word)
// }

function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word)

  // Получаем все доступные голоса
  const voices = speechSynthesis.getVoices()

  // Выбираем голос по имени (или языку)
  const selectedVoice = voices.find(
    (v) => v.name === 'Google US English' // ← можешь изменить!
  )

  // Назначаем голос
  if (selectedVoice) {
    utterance.voice = selectedVoice
  }

  utterance.lang = 'en-US'
  speechSynthesis.speak(utterance)
}

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
      <button
        :class="['level-button', { active: selectedLevel === 'IT' }]"
        @click="selectLevel('IT')"
      >
        IT-words
      </button>
    </div>
  </div>

  <div v-else>
    <div
      v-if="!isGameCompleted"
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
        @answer-yes="() => handleAnswer(card, true)"
        @answer-no="() => handleAnswer(card, false)"
        @speak="() => speakWord(card.word)"
      />
    </div>
    <div class="button-restart">
      <BaseButton
        v-if="
          cards.every((card) => card.status !== 'pending' && !isGameCompleted)
        "
        @click="learnMore"
        >УЧИТЬ ДАЛЬШЕ</BaseButton
      >

      <div
        v-if="isGameCompleted"
        class="app"
      >
        <p>Все карточки угаданы!</p>
        <BaseButton @click="restartGame">Начать заново</BaseButton>
      </div>
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
  margin: 0 auto;
  max-width: 1250px;
  display: flex;
  gap: 40px 10px;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 50px;
  margin-bottom: 80px;
}

@media (max-width: 610px) {
  .cards {
    flex-direction: column;
    padding: 20px 10px;
    align-items: center;
    gap: 20px;
  }
}

.button-restart {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
}

.level-switcher {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
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
