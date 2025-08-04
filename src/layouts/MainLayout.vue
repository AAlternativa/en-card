<script setup lang="ts">
import BaseHeader from '@/components/BaseHeader.vue'
import { selectedLevel } from '@/composables/useGameData'
</script>

<template>
  <BaseHeader :selected-level="selectedLevel" />
  <router-view />
</template>
