import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore("usersList", () => {
  const list = ref([
    {
      id: 2,
      tagName: "",
      type: "local",
      login: "",
      password: ""
    }, {
      id: 3,
      tagName: "",
      type: "ldap",
      login: "",
      password: ""
    }
  ])

  function addUser() {
    list.value.push({
      id: Math.ceil(Math.random() * 1000),
      tagName: "",
      type: "local",
      login: "",
      password: ""
    })
  }

  function removeUser(value: number) {
    list.value = list.value.filter(elem => elem.id !== value)
  }

  return { list, addUser, removeUser }
})
