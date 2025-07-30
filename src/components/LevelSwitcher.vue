<script setup>
defineEmits(['select-level'])
defineProps({ levels: Array, selectedLevel: String })
</script>

<template>
  <div class="level-switcher">
    <button
      v-for="level in levels"
      :key="level"
      :class="['level-button', { active: selectedLevel === level }]"
      @click="$emit('select-level', level)"
    >
      {{ level }}
    </button>
  </div>
</template>

<style scoped>
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
