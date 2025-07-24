<script setup></script>

<template>
  <button class="button"><slot /></button>
</template>

<style scoped>
.button {
  border: none;
  width: 335px;
  height: 68px;
  color: var(--color-card-bg);
  background-color: var(--color-btn);
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  border-radius: 100px;
  padding: 16px 10px;
  cursor: pointer;
}
</style>
