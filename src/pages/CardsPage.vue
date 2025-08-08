<script setup lang="ts">
import type { Word, Card } from '@/types/card'
import { computed, inject, onMounted, Ref, ref } from 'vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import { remainingWords, selectedLevel, score } from '@/composables/useGameData'
import router from '@/router'

async function speakWord(word: string) {
  const utterance = new SpeechSynthesisUtterance(word)

  // Получаем все доступные голоса
  const voices = window.speechSynthesis.getVoices()

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

const props = defineProps<{
  // words: Word[]
  // onRestart: () => void
  level: string
}>()

console.log('LEVEL →', props.level)

const cards = ref<Card[]>([])

const levelToFileMap: Record<string, () => Promise<{ default: Word[] }>> = {
  A2: () => import('@/data/a2-words.json'),
  B1: () => import('@/data/b1-words.json'),
  B2: () => import('@/data/b2-words.json'),
  C1: () => import('@/data/c1-words.json'),
  IT: () => import('@/data/ITwords.json'),
  Clen: () => import('@/data/Clen.json'),
}

onMounted(async () => {
  const loader = levelToFileMap[props.level]

  if (!loader) {
    console.error('Нет словаря для уровня:', props.level)
    return
  }

  const { default: wordList } = await loader()

  selectedLevel.value = props.level

  remainingWords.value = wordList.map((word) => ({
    ...word,
    status: 'pending',
    state: 'closed',
  }))

  cards.value = [...remainingWords.value]
    .sort(() => Math.random() - 0.5)
    .slice(0, 20)
})

function handleAnswer(card: Card, isCorrect: boolean) {
  card.status = isCorrect ? 'success' : 'fail'
  score.value += isCorrect ? 1 : 0
}

const MAX_CARDS = 20

async function loadCards() {
  const shuffled = [...remainingWords.value].sort(() => Math.random() - 0.5)
  cards.value = shuffled.slice(0, MAX_CARDS)
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
  // props.onRestart()
  router.push({ name: 'start' })
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
    <div class="button-end">
      <BaseButton
        v-if="
          cards.every((card) => card.status !== 'pending' && !isGameCompleted)
        "
        @click="learnMore"
        >Учить дальше</BaseButton
      >

      <div
        v-if="!isGameCompleted"
        class="button-end"
      >
        <BaseButton @click="restartGame">Закончить</BaseButton>
        <p>Прогресс не сохранится</p>
      </div>
    </div>

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

.button-end {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
}
</style>
