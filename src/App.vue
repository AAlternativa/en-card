<script setup>
import { ref } from 'vue'
import Button from './components/BaseButton.vue'

const currentDate = ref(new Date().toLocaleDateString('ru-RU'))
</script>

<template>
  <p>{{ currentDate }}</p>
  <Button />
</template>
