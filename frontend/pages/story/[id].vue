<template>
    <div class="bg-black flex items-center justify-center overflow-hidden">
        <button class="p-3 bg-white shadow rounded-full">
            <icon name="material-symbols:arrow-back-ios-rounded"/>
        </button>

        <div class="h-5/6 flex justify-center relative">
            <div v-html="story.body[order - 1].content" class="flex justify-center"></div>
            <div class="flex flex-col items-center justify-between text-white absolute h-full aspect-[0.55]">
                <div class="w-full p-2">
                    <!-- scroll bar -->
                    <div class="flex space-x-2 w-full">
                        <div v-for="s in story.body.length" class="relative overflow-hidden w-full">
                            <div class="w-full h-2 bg-gray-400 rounded-lg opacity-50"></div>
                            <div class="absolute h-full bg-gray-default left-0 top-0 rounded-lg"
                                :style="{ width: `${width <= s * 100 ? ((width - (s - 1) * 100) % 100) : 100}%` }">
                            </div>
                        </div>
                    </div>

                    <!--  -->
                    <div class="flex justify-between items-center mt-2">
                        <div class="flex items-center space-x-2">
                            <avatar :image="story.user.avatar" />
                            <span>{{ story.user.firstName }} {{ story.user.lastName }}</span>
                            <span>{{ formatTime(story.createdAt) }}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button>
                                <icon :name="playButton ? 'ic:round-pause' : 'ic:round-play-arrow'" size="28"
                                    @click="playHandler" />
                            </button>
                            <button>
                                <icon :name="sound ? 'charm:sound-up' : 'charm:sound-mute'" size="28"
                                    @click="sound = !sound" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button class="p-3 bg-white shadow rounded-full">
            <icon name="material-symbols:arrow-forward-ios-rounded"/>
        </button>
    </div>
</template>

<script setup lang="ts">
import { formatTime } from '~/libraries/utilities'

definePageMeta({ layout: 'story-detail' })

const route = useRoute()
const _getStory = useGet('story')

const id_story = route.params.id
const story = ref()
await _getStory(id_story).then(res => story.value = res.find(r => r.id == id_story))
const order = ref<number>(1)
const playButton = ref<boolean>(true)
const sound = ref<boolean>(true)
const width = ref(0)

let interval

const playHandler = () => {
    playButton.value = !playButton.value
    if (playButton.value) {
        clearInterval(interval)
        interval = setInterval(() => {
            width.value += 1
        }, 50)
    } else {
        clearInterval(interval)
    }
}

watch(width, () => {
    if (width.value == order.value * 100) order.value += 1
})

watch(order, () => {
    if (order.value == story.value.body.length + 1) navigateTo('/')
})

onMounted(() => {
    interval = setInterval(() => {
        width.value += 1
    }, 50)
})

onBeforeMount(() => {
    clearInterval(interval)
})
</script>
