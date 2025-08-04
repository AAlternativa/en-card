<script setup lang="ts">
import { provide } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import LevelSwitcher from '@/components/LevelSwitcher.vue'
import { remainingWords, selectedLevel, score } from '@/composables/useGameData'
import type { Word } from '@/types/card'

// JSON-файлы
import wordListA2 from '@/data/a2-words.json'
import wordListB1 from '@/data/b1-words.json'
import wordListB2 from '@/data/b2-words.json'
import wordListC1 from '@/data/c1-words.json'
import IT from '@/data/ITwords.json'
import Clen from '@/data/Clen.json'

// Глобально пробрасываем score
provide('scoreKey', score)

const router = useRouter()

// Словари по уровням
const wordMap = {
  A2: wordListA2,
  B1: wordListB1,
  B2: wordListB2,
  C1: wordListC1,
  IT: IT,
  Clen: Clen,
} as const

// Тип уровня
type WordLevel = keyof typeof wordMap

// Список уровней для отображения
const levels = Object.keys(wordMap) as WordLevel[]

// Выбор уровня
function selectLevel(level: string) {
  selectedLevel.value = level.toUpperCase() as WordLevel
  console.log('УРОВЕНЬ ВЫБРАН:', selectedLevel.value)
}

// Переход на карточки
function startGame() {
  const level = selectedLevel.value

  if (!level || !(level in wordMap)) {
    console.error('Неверный уровень:', level)
    return
  }

  const words = wordMap[level as keyof typeof wordMap]

  remainingWords.value = words.map((item: Word) => ({
    ...item,
    status: 'pending',
    state: 'closed',
  }))

  router.push(`/cards/${level}`)
}
</script>

<template>
  <BaseHeader :selected-level="selectedLevel" />

  <div class="app">
    <BaseButton
      :disabled="!selectedLevel"
      @click="startGame"
    >
      START
    </BaseButton>

    <LevelSwitcher
      :levels="levels"
      :selected-level="selectedLevel"
      @select-level="selectLevel"
    />
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
</style>
