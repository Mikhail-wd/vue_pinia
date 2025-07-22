<template>
  <div class="flex flex-col items-center size-dvh gap-10">
    <AddingAccount />
    <UsersList />
  </div>
</template>

<script lang="ts">

import AddingAccount from "@/components/AddingAccounts.vue"
import UsersList from "./components/UsersList.vue";

export default {
  components: {
    AddingAccount,
    UsersList
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Intel+One+Mono:ital,wght@0,300..700;1,300..700&display=swap');
@import "tailwindcss";

:root {
  font-family: "Intel One Mono", monospace;
  --main-blue: #8fb5db;
  --light-gray: #868686;
  font-size: 16px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
}
</style>