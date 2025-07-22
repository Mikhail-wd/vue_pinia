import { ref, watch, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'


type userInfoObject = {
  id: number,
  tagName: Array<{ text: string }>,
  type: string,
  login: string,
  password: string
}

type listArray = Array<userInfoObject>

export const useUsersStore = defineStore("usersList", () => {
  const list = ref<listArray>([])
  const listChecker = ref(list.value.length)

  function addUser() {
    list.value.push({
      id: Math.ceil(Math.random() * 1000),
      tagName: [],
      type: "local",
      login: "",
      password: ""
    })
  }

  function setLocalStorage() {
    let tempArray: listArray = []
    list.value.map((element) => {
      if (element.type == "ldap") {
        if (element.login.length !== 0) {
          tempArray.push(element)
        }
      } else {
        if ((element.login.length !== 0) && (element.password.length !== 0)) {
          tempArray.push(element)
        }
      }
    })
    localStorage.setItem("UsersList", JSON.stringify(tempArray))
  }

  function removeUser(value: number) {
    let tempArray = list.value.filter(elem => elem.id !== value)
    list.value = [...tempArray]
    let arrayStorage = localStorage.getItem("UsersList")
    if (arrayStorage !== null) {
      let arrayFromStorage = JSON.parse(arrayStorage)
      localStorage.setItem("UsersList", JSON.stringify(arrayFromStorage.filter((element: { id: number }) => element.id !== value)))
    }
  }

  function changeLogin(id: number, login: string) {
    list.value.map((elem, index) => {
      if (elem.id == id) {
        list.value[index].login = login
        setLocalStorage()
      }
    })
  }
  function changeTagName(id: number, tagName: Array<{ text: string }>) {
    list.value.map((elem, index) => {
      if (elem.id == id) {
        list.value[index].tagName = tagName
        setLocalStorage()
      }
    })
  }

  function changePassword(id: number, password: string) {
    list.value.map((elem, index) => {
      if (elem.id == id) {
        list.value[index].password = password
        setLocalStorage()
      }
    })
  }

  function changeType(id: number, type: string) {
    list.value.map((elem, index) => {
      if (elem.id == id) {
        list.value[index].type = type
        setLocalStorage()
      }
    })
  }
  onMounted(() => {
    let usersList = localStorage.getItem("UsersList")
    if (usersList !== null) {
      list.value = JSON.parse(usersList)
      if (usersList.length == 0) {
        list.value = []
      }
    }
  })

  watch(list.value, () => {
    let tempArray = list.value.filter(elem => (elem.login.length !== 0) && (elem.password.length !== 0))
    console.log(tempArray)
    localStorage.setItem("UsersList", JSON.stringify(tempArray))
  })

  return { list, addUser, removeUser, changeLogin, changePassword, changeType, changeTagName }
})
