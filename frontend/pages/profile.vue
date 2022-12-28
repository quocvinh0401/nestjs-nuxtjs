<template>
    <!-- {{ user.firstName }} {{ user.lastName }} | Social Media -->
    <div class="bg-white">
        <!-- background -->
        <div>
            <div class="flex justify-center">
                <div class="relative h-96 aspect-[27/10] overflow-hidden shadow rounded-b-lg">
                    <img :src="user.background || '/images/background-default.jpg'" class="w-full object-cover rounded-b-lg -translate-y-1/2" alt="">
                    <button class="absolute bottom-5 right-5 bg-gray-default hover:bg-gray-200 active:bg-gray-300 p-2 rounded-lg flex items-center space-x-2">
                        <icon name="bi:camera-fill" :size="20"/>
                        <span class="font-semibold">Edit cover photo</span>
                    </button>
                </div>
            </div>
        </div>
        <!-- info -->
        <div class="flex justify-center">
            <div class="flex">
                <div class="relative">
                    <avatar :image="user.avatar" class="w-40 h-40 border-4 border-white"/>
                    <button class="p-2 rounded-full bg-gray-default absolute bottom-2 right-2">
                        <icon name="bi:camera-fill" :size="20"/>
                    </button>
                </div>

                <div>
                    <div>{{ user.firstName }} {{ user.lastName }}</div>
                    <div>{{ user.friends.length }}</div>
                </div>

                <div>
                    <button>Add to story</button>
                    <button>Edit profile</button>
                </div>
            </div>
            <div></div>
        </div>
    </div>
    <nuxt-page></nuxt-page>
</template>

<script setup lang="ts">
import { User } from '~/shared/user.interface';

const route = useRoute()

const { userId } = route.query
const _getUser = useGet('user')
const user = await _getUser(userId!, { id: userId }) as User
</script>