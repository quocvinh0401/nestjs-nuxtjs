<template>
    <div class="flex items-center justify-center w-full h-screen">
        <div class="grid grid-cols-2 gap-4 max-w-4xl">
            <!-- left side -->
            <div class="mt-10">
                <h1 class="font-bold text-5xl text-blue-500 mb-4">Social Network</h1>
                <h3 class="text-2xl">Social Network helps you connect and share with the people in your life.</h3>
            </div>
            <!-- right side -->
            <div class="flex flex-col space-y-4 items-center border rounded-xl p-4 bg-white shadow-md">
                <input type="text" placeholder="Email address or phone number" v-model="user.username" >
                <input type="password" placeholder="Password" v-model="user.password">
                <button class="bg-blue-500 hover:bg-blue-600 w-full" @click="login">Log in</button>
                <span class="text-blue-500 cursor-pointer hover:underline">Forgotten password?</span>
                <button class="bg-green-500 hover:bg-green-600">Create New Account</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User } from '~/shared/account.interface';

const user = ref<User>({
    username: '',
    password: ''
})

const login = () => {
    localStorage.setItem('user', JSON.stringify(user.value))
}
</script>

<style scoped>
input {
    @apply w-full;
    @apply p-3 rounded-xl border;
    @apply outline-blue-600
}

button {
    @apply p-3 rounded-xl;
    @apply text-white font-semibold text-xl
}
</style>