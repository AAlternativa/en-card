<script setup>
const emit = defineEmits(['flip', 'answerYes', 'answerNo'])

const {
  numberCardValue = 1,
  cardWordValue = 'Loading',
  cardWordRuValue = 'Загрузка',
  state = 'closed',
  status = 'pending',
} = defineProps({
  numberCardValue: Number,
  cardWordValue: String,
  cardWordRuValue: String,
  state: String,
  status: String,
})
</script>

<template>
  <div class="base-card">
    <span class="card-index">{{ numberCardValue }}</span>

    <template v-if="state == 'closed'">
      <p class="card-word">
        {{ cardWordValue }}
      </p>
      <button
        class="card-btn"
        @click="emit('flip')"
      >
        Перевернуть
      </button>
    </template>

    <template v-if="state == 'opened' && status == 'pending'">
      <div class="card-word">
        <p>
          {{ cardWordValue }}
        </p>
        <p>
          {{ cardWordRuValue }}
        </p>
      </div>

      <div class="btns-true-false">
        <button
          class="btn-true"
          @click="emit('answerYes')"
        >
          yes
        </button>

        <button
          class="btn-true"
          @click="emit('answerNo')"
        >
          no
        </button>
      </div>
    </template>

    <template v-if="state == 'opened' && status == 'success'">
      <div class="card-word">
        <p>
          {{ cardWordValue }}
        </p>
        <p>
          {{ cardWordRuValue }}
        </p>
      </div>
      <div class="card-result">
        <span>✔️</span>
        <p>Завершено</p>
      </div>
    </template>

    <template v-if="state == 'opened' && status == 'fail'">
      <div class="card-word">
        <p>
          {{ cardWordValue }}
        </p>
        <p>
          {{ cardWordRuValue }}
        </p>
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
  background-color: var(--color-btn-active);
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
  background-color: var(--color-btn-active);
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
