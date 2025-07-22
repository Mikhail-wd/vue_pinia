<template lang="">
    <table class="table-fixed w-full">
        <thead>
            <tr  class="text-(--light-gray)">
                <th class="text-start py-2 font-light w-35">Метки</th>
                <th class="text-start  py-2 font-light w-15">Тип записи</th>
                <th class="text-start  py-2 font-light w-22">Логин</th>
                <th class="text-start  py-2 font-light w-22">Пароль</th>
                <th class="text-start  py-2 font-light w-2"></th>
            </tr>
        </thead>
        <tbody>
            <User />
        </tbody>
    </table>
</template>

<script lang="ts">
import User from "@/components/User.vue"

export default {
    name: "UsersList",
    components: {
        User
    }
}
</script>

<style lang="">
</style>