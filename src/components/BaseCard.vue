<script setup lang="ts">
import IconVoice from '@/icons/IconVoice.vue'

defineProps<{
  numberCardValue: number
  cardWordValue: string
  cardWordRuValue: string
  state: 'opened' | 'closed'
  status: 'pending' | 'success' | 'fail'
}>()

const emit = defineEmits(['flip', 'speak', 'answer-yes', 'answer-no'])

function flipAndSpeak() {
  emit('flip')
  emit('speak')
}
</script>

<template>
  <div class="base-card">
    <div class="card-index">
      <span>{{ numberCardValue }}</span>
      <button
        class="card-index__btn-voice"
        @click="emit('speak')"
      >
        <IconVoice />
      </button>
    </div>

    <template v-if="state === 'closed'">
      <p class="card-word">{{ cardWordValue }}</p>
      <button
        class="card-btn"
        @click="flipAndSpeak"
      >
        Перевернуть
      </button>
    </template>

    <template v-else-if="state === 'opened' && status === 'pending'">
      <div class="card-word">
        <p>{{ cardWordValue }}</p>
        <p>{{ cardWordRuValue }}</p>
      </div>
      <div class="btns-true-false">
        <button
          class="btn-true"
          @click="emit('answer-yes')"
        >
          yes
        </button>
        <button
          class="btn-false"
          @click="emit('answer-no')"
        >
          no
        </button>
      </div>
    </template>

    <template v-else-if="status === 'success'">
      <div class="card-word">
        <p>{{ cardWordValue }}</p>
        <p>{{ cardWordRuValue }}</p>
      </div>
      <div class="card-result">
        <span>✔️</span>
        <p>Завершено</p>
      </div>
    </template>

    <template v-else-if="status === 'fail'">
      <div class="card-word">
        <p>{{ cardWordValue }}</p>
        <p>{{ cardWordRuValue }}</p>
      </div>
      <div class="card-result">
        <span>❌</span>
        <p>Завершено</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.base-card {
  width: 250px;
  height: 376px;
  background-color: var(--color-card-bg);
  border-radius: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px;
}

.card-index {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-primary);
  display: flex;
  justify-content: space-between;
}

.card-index__btn-voice {
  border: none;
  background-color: #ffffff00;
}

.card-word {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  margin: 0 auto;
}

.card-btn {
  font-size: 16px;
  height: 30px;
  width: 200px;
  margin: 0 auto;
  padding: auto;
  background-color: #fffda0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: none;
}

.card-btn:hover {
  background-color: var(--color-btn);
  color: var(--color-card-bg);
}

.btn-true {
  border: none;
  font-size: 16px;
  height: 30px;
  width: 70px;
  margin: 0 auto;
  padding: auto;
  background-color: #02ff02;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}

.btn-false {
  border: none;
  font-size: 16px;
  height: 30px;
  width: 70px;
  margin: 0 auto;
  padding: auto;
  background-color: #ff1f32;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}

.btn-true:hover {
  background-color: var(--color-btn);
  color: var(--color-card-bg);
}

.btns-true-false {
  display: flex;
}

.card-result {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}
</style>
