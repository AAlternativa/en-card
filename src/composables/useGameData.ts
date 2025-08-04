import { ref } from 'vue'
import type { Card } from '@/types/card'

export const remainingWords = ref<Card[]>([])
export const selectedLevel = ref('IT')
export const score = ref(0)
