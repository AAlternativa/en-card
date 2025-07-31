export interface Word {
  word: string
  translation: string
}

export interface Card extends Word {
  status: 'pending' | 'success' | 'fail'
  state: 'closed' | 'opened'
}
