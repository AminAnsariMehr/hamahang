import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    currentVideo: null,
    isPlaying: false
  })
})