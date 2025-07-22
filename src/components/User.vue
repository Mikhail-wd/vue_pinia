<template ref="tagName">
    <tr>
        <td>
            <input placeholder="Название" class="p-2 w-9/10 box" maxlength="50" v-model="userInfo.tagName"
                ref="tag-Name" v-on:change="checkTag" />
        </td>
        <td class="flex flex-col wrap-nowrap w-9/10">
            <div class="p-2 w-9/10 box-target">
                <p class="p-2 flex flex-raw wrap-nowrap items-center">
                    <span>{{ userInfo.type == "local" ? "Локальная" : "LDAP" }}</span>
                    <img src="@/assets/chevron-down.svg" alt="chevron" class="w-[24px] h-[24px]">
                </p>
                <ul class="drop-down">
                    <li v-on:click="setDropDown('local')" value="local">Локальная</li>
                    <li v-on:click="setDropDown('ldap')" value="ldap">LDAP</li>
                </ul>
            </div>
        </td>

        <template v-if="userInfo.type == 'ldap'">
            <td colspan=2>
                <input placeholder="Значение" class="p-2 w-9/10 box" required maxlength="100" ref="tag-login"
                    v-model="userInfo.login" v-on:blur="checkLogin" type="text" />
            </td>
        </template>

        <template v-if="userInfo.type == 'local'">
            <td>
                <input placeholder="Значение" class="p-2 w-9/10 box " required maxlength="100" ref="tag-login"
                    v-model="userInfo.login" v-on:blur="checkLogin" />
            </td>
            <td class="flex wrap-nowrap">
                <input placeholder="Пароль" :type="showPassword ? 'password' : 'text'" class="p-2 w-10/10 box password"
                    v-model="userInfo.password" v-on:blur="checkPassword" ref="tag-password" />
                <img src="@/assets/eye.svg" alt="eye" class="eye-switcher" v-on:click="toggleShowPassword" required
                    maxlength="100" />
            </td>
        </template>

        <td><img src="@/assets/trash.svg" alt="trash" v-on:click="usersList.removeUser(userInfo.id)" /></td>
    </tr>
</template>

<script setup lang="ts">
import { ref, watch, useTemplateRef, onMounted, computed } from 'vue';
import { useUsersStore } from '@/stores/store';

type userInfoObject = {
    id: number,
    tagName: string,
    type: string,
    login: string,
    password: string
}

const props = defineProps({
    userInfo: {
        type: Object,
        required: true,
        default: () => { }
    }
})

const usersList = useUsersStore()
const showPassword = ref(true)
const setupDropdown = ref("local")
const tagName = useTemplateRef<HTMLInputElement>("tag-Name")
const tagLogin = useTemplateRef<HTMLInputElement>("tag-login")
const tagPassword = useTemplateRef<HTMLInputElement>("tag-password")

const userInfo = ref<userInfoObject>({
    id: props.userInfo.id,
    tagName: props.userInfo.tagName,
    type: props.userInfo.type,
    login: props.userInfo.login,
    password: props.userInfo.password
})

function setDropDown(value: string) {
    setupDropdown.value = value
    userInfo.value.type = value
    usersList.changeType(userInfo.value.id, value)
}

function toggleShowPassword() {
    showPassword.value = !showPassword.value
}

function checkPassword() {
    if (tagPassword.value !== null) {
        if (userInfo.value.password.length == 0) {
            usersList.changePassword(userInfo.value.id, userInfo.value.password)
            tagPassword.value.className = "p-2 w-10/10 box password error"
        } else {
            usersList.changePassword(userInfo.value.id, userInfo.value.password)
            tagPassword.value.className = "p-2 w-10/10 box password"
        }
    }
}

function checkLogin() {
    if (tagLogin.value !== null) {
        if (userInfo.value.login.length == 0) {
            usersList.changeLogin(userInfo.value.id, userInfo.value.login)
            tagLogin.value.className = "p-2 w-9/10 box error"
        } else {
            usersList.changeLogin(userInfo.value.id, userInfo.value.login)
            tagLogin.value.className = "p-2 w-9/10 box"
        }
    }
}

function checkTag() {
    let tempArray: Array<{ text: string }> = []
    tagName.value?.value.split(';').map(element => tempArray.push({ text: element }))
    usersList.changeTagName(userInfo.value.id, tempArray)
}

watch(userInfo.value, () => {
    if (tagName.value !== null) {
        if (userInfo.value.tagName.length == 50) {
            tagName.value.blur()
        }
    }
})
</script>

<style scoped>
p {
    color: var(--light-gray);
}

.password {
    padding-right: 50px;
}

.box,
.box-target {
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
    gap: 1px;
    border-radius: 6px;
    border: solid 1px var(--main-blue);
}

.eye-switcher {
    position: relative;
    right: 30px;
}

.box-target:hover {
    cursor: pointer;
}

.box-target>p {
    color: black;
    padding: 0;
}

img:hover {
    cursor: pointer;
}

.drop-down {
    display: none;
    flex-direction: column;
    gap: 10px;
    background-color: white;
    margin-top: 30px;
    margin-left: -6px;
    border: 0px;
    position: absolute;
}

.box-target:hover .drop-down {
    display: flex;
}

.drop-down>li {
    padding: 6px 6px 6px 0px;
}

.drop-down>li:hover {

    cursor: pointer;
}

.error {
    border: solid 1px red;
}

td {
    padding: 5px 0 5px 0;
}
</style>