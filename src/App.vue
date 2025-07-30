<script setup>
import { provide, ref } from 'vue'
import BaseButton from './components/BaseButton.vue'
import BaseHeader from './components/BaseHeader.vue'
import LevelSwitcher from './components/LevelSwitcher.vue'
//data
import wordListB1 from './data/b1-words.json'
import wordListB2 from './data/b2-words.json'
import wordListA2 from './data/a2-words.json'
import wordListC1 from './data/c1-words.json'
import IT from './data/ITwords.json'
import Clen from './data/Clen.json'
import CardSection from './components/CardSection.vue'

const isShou = ref(true)
const score = ref(0)
provide('scoreKey', score)

const toggleShou = () => {
  isShou.value = !isShou.value
}

const wordMap = {
  A2: wordListA2,
  B1: wordListB1,
  B2: wordListB2,
  C1: wordListC1,
  IT: IT,
  Clen: Clen,
}

const levels = Object.keys(wordMap).map((level) => level.toUpperCase())

const selectedLevel = ref('IT')

const remainingWords = ref([])

function selectLevel(level) {
  selectedLevel.value = level.toUpperCase()
}

function startGame() {
  const level = selectedLevel.value
  const words = wordMap[level]
  remainingWords.value = words.map((item) => ({
    ...item,
    status: 'pending',
    state: 'closed',
  }))
}
</script>

<template>
  <BaseHeader :selected-level="selectedLevel" />

  <div
    v-if="isShou"
    class="app"
  >
    <BaseButton
      @click="
        () => {
          toggleShou()
          startGame()
        }
      "
      >START</BaseButton
    >
    <LevelSwitcher
      :levels="levels"
      :selected-level="selectedLevel"
      @select-level="selectLevel"
    />
  </div>

  <CardSection
    v-if="!isShou"
    :words="remainingWords"
    :on-restart="toggleShou"
  />
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
