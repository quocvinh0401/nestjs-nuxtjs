<template>
    <div class="grid grid-cols-[22.5rem_auto] h-screen">
        <div class="bg-white shadow relative">
            <div class="flex items-center space-x-2 shadow px-3 py-[6px]">
                <button class="bg-gray-400 hover:bg-gray-500 p-2 rounded-full" @click="back">
                    <icon name="ic:outline-clear" size="24" class="text-white" />
                </button>
                <nuxt-link to="/">
                    <img src="/images/logo.png" class="w-14 h-14 cursor-pointer">
                </nuxt-link>
            </div>

            <div class="p-3 shadow">
                <div class="flex justify-between items-center mb-3">
                    <div class="text-2xl font-bold">Your story</div>
                    <button class="p-2 button gray rounded-full">
                        <icon name="ant-design:setting-filled" size="24" />
                    </button>
                </div>
                <div class="flex items-center space-x-2">
                    <avatar :image="currentUser?.avatar" class="!w-14 !h-14" />
                    <span class="font-semibold text-lg">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</span>
                </div>
            </div>
        </div>
        <div class="bg-black flex items-center justify-center overflow-hidden">
            <div class="h-5/6 flex justify-center relative">
                <div v-html="story.body" class="flex justify-center"></div>
                <div class="flex flex-col items-center justify-between text-white absolute h-full aspect-[0.55]">
                    <div class="w-full p-2">
                        <!-- scroll bar -->
                        <div class="relative overflow-hidden">
                            <div class="w-full h-2 bg-gray-400 rounded-lg opacity-50"></div>
                            <div class="absolute h-full bg-gray-default left-0 top-0 rounded-lg timebar"></div>
                        </div>
                        
                        <!--  -->
                        <div class="flex justify-between items-center mt-2">
                            <div class="flex items-center space-x-2">
                                <avatar :image="story.user.avatar" />
                                <span>{{ story.user.firstName }} {{story.user.lastName}}</span>
                                <span>{{ formatTime(story.createdAt) }}</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <icon :name="playButton ? 'ic:round-pause' : 'ic:round-play-arrow'" size="28" @click="playButton = !playButton"/>
                                <icon :name="sound ? 'charm:sound-up' : 'charm:sound-mute'" size="28" @click="sound = !sound"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { formatTime } from '~/libraries/utilities'

definePageMeta({ layout: 'story'})

const { currentUser } = usePrincipal()
const router = useRouter()
const route = useRoute()
const _getStory = useGet('story')

const id_story = route.params.id
const _story = await _getStory(id_story) as any
console.log(_story)
const story = ref(_story)
const playButton = ref<boolean>(true)
const sound = ref<boolean>(true)

const back = () => {
    router.go(-1)
}
</script>


<style scoped>
.timebar {
    animation: animate 8s linear;
}

@keyframes animate {
    0%{
        @apply w-0;
    }

    100%{
        @apply w-full
    }
}
</style>