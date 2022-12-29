<template>
    <!-- {{ user.firstName }} {{ user.lastName }} | Social Media -->
    <div class="bg-white">
        <!-- background -->
        <div>
            <div class="flex justify-center">
                <div class="relative h-96 aspect-[27/10] overflow-hidden shadow rounded-b-lg">
                    <img :src="user.background || '/images/background-default.jpg'"
                        class="w-full object-cover rounded-b-lg -translate-y-1/2" alt="">
                    <button
                        class="absolute bottom-5 right-5 bg-gray-default hover:bg-gray-200 active:bg-gray-300 p-2 rounded-lg flex items-center space-x-2">
                        <icon name="bi:camera-fill" size="20" />
                        <span class="font-semibold">Edit cover photo</span>
                    </button>
                </div>
            </div>
        </div>
        <!-- info -->
        <div class="flex justify-center">
            <div class="flex items-start space-x-4 w-2/3 border-b relative pb-5">
                <div class="absolute -translate-y-1/4">
                    <avatar :image="user.avatar" class="!w-40 border-4 border-white" />
                    <button class="p-2 rounded-full bg-gray-default absolute bottom-2 right-2">
                        <icon name="bi:camera-fill" size="20" />
                    </button>
                </div>

                <div class="flex-1 flex items-end justify-between mt-4 pl-40">
                    <div class="grid gap-1">
                        <div class="font-bold text-3xl">{{ user.firstName }} {{ user.lastName }}</div>
                        <div class="font-semibold text-gray-600">{{ user.friends.length }} friends</div>
                        <div class="flex">
                            <avatar class="!w-8" />
                            <avatar class="!w-8" />
                            <avatar class="!w-8" />
                            <avatar class="!w-8" />
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button
                            class="flex items-center space-x-1 px-2 py-1 rounded-lg text-white bg-blue-500 hover:bg-blue-600">
                            <icon name="ic:outline-add-circle-outline" size="20" />
                            <span class="font-semibold">Add to story</span>
                        </button>
                        <button
                            class="flex items-center space-x-1 px-2 py-1 rounded-lg bg-gray-default hover:bg-gray-200 active:bg-gray-300">
                            <icon name="mdi:pencil" size="20" />
                            <span class="font-semibold">Edit profile</span>
                        </button>
                    </div>
                </div>
            </div>
            <div></div>
        </div>

        <div>{{ test }}</div>
        <button @click="test1">Test</button>
    </div>
    <nuxt-page></nuxt-page>
</template>

<script setup lang="ts">
import { User } from '~/shared/user.interface';

const route = useRoute()

const { userId } = route.query
const _getUser = useGet('user')
const user = await _getUser(userId!, { id: userId }) as User

const test = useCookie<number>('test', { default: () => 2, path: '/' })
const test1 = () => {
    test.value = (test.value || 0) + 1
}
</script>