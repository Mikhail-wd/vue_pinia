<template lang="">
    <table class="table-fixed w-full">
        <thead>
            <tr  class="text-(--light-gray)">
                <th class="text-start py-2 font-light w-35">Меткиs</th>
                <th class="text-start  py-2 font-light w-15">Тип записи</th>
                <th class="text-start  py-2 font-light w-22">Логин</th>
                <th class="text-start  py-2 font-light w-22">Пароль</th>
                <th class="text-start  py-2 font-light w-2"></th>
            </tr>
        </thead>
        <tbody class="p-10">
            <User v-for="user of usersStore.list" :key="user.id" :userInfo="user"/>
        </tbody>
    </table>
    <div>
    </div>
</template>

<script lang="ts">
import User from "@/components/User.vue"
import { useUsersStore } from "@/stores/store";

export default {
    name: "UsersList",
    components: {
        User
    },
    setup() {
        const usersStore = useUsersStore()
        return { usersStore }
    }
}
</script>

<style lang="">
</style>