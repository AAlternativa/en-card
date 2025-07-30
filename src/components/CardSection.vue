<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import BaseCard from './BaseCard.vue'
import BaseButton from './BaseButton.vue'

async function speakWord(word) {
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
} //озвучка

const props = defineProps({
  words: Array,
  onRestart: Function,
})

const remainingWords = ref([])
const cards = ref([])
const score = inject('scoreKey')

onMounted(() => {
  if (props.words.length > 0) {
    remainingWords.value = [...props.words]
    const shuffled = [...remainingWords.value].sort(() => Math.random() - 0.5)
    cards.value = shuffled.slice(0, 20)
  }
})

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
  props.onRestart()
}

const isGameCompleted = computed(() => {
  return (
    remainingWords.value.length > 0 &&
    remainingWords.value.every((card) => card.status === 'success')
  )
})
</script>

<template>
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
</style>
