<script setup lang="ts">
import { ref } from 'vue'

const currentDate = ref(new Date().toLocaleDateString('ru-RU'))
</script>

<template>
  <p>{{ currentDate }}</p>
  <p>{{ currentDate }}</p>
  git add .
</template>
