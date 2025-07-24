<script setup>
import { ref } from 'vue'
import Button from './components/BaseButton.vue'
import BaseHeader from './components/BaseHeader.vue'
import BaseCard from './components/BaseCard.vue'

const currentDate = ref(new Date().toLocaleDateString('ru-RU'))
</script>

<template>
  <BaseHeader />
  <div class="app">
    <Button>START</Button>
  </div>

  <BaseCard
    numberCardValue="1"
    cardWordValue="dick"
    cardWordRuValue="член"
  />

  <p>{{ currentDate }}</p>
</template>

<style scoped>
.app {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
