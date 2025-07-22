<template lang="">
    <div class="w-full flex flex-col gap-5">
        <div class="flex flex-row gap-10 items-center">
            <h1 class="font-bold text-[24px]">Учетные записи</h1>
            <div class="border-solid border-1 rounded-[6px] border-(--main-blue)  p-[10px]">
                <img src="@/assets/add.svg" alt="Add" class="flex"/>
            </div>
        </div>
        <div class="flex flex-row gap-10 items-center rounded-[6px] bg-(--main-blue) p-2">
            <img src="@/assets/question.svg" alt="question">
            <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddingAccount"
}
</script>
<style lang="ts">

</style>