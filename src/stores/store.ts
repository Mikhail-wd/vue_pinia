import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const usersList = ref([
    {
      id: 2,
      tagName: "fdsafd",
      type: "local",
      login:"loging",
      password:"any"
    }
  ])

  return { usersList }
})
