<template>
    <div class="bg-black flex items-center justify-center overflow-hidden">
        <button class="p-2 bg-gray-400 hover:bg-white hover:-translate-x-2 transition-all shadow rounded-full" :class="order == 1 ? 'invisible' : ''"
            @click="changeOrder('previous')">
            <icon name="material-symbols:keyboard-arrow-left" size="30"/>
        </button>

        <div class="h-5/6 aspect-[0.55] flex justify-center relative mx-4">
            <div v-html="story?.body[order - 1]?.content" class="flex justify-center"></div>
            <div class="flex flex-col items-center justify-between text-white absolute h-full aspect-[0.55]">
                <div class="w-full p-2">
                    <!-- scroll bar -->
                    <div class="flex space-x-2 w-full">
                        <div v-for="s in story?.body.length" class="relative overflow-hidden w-full">
                            <div class="w-full h-[5px] bg-gray-400 rounded-lg opacity-50"></div>
                            <div class="absolute h-full bg-gray-default opacity-70 left-0 top-0 rounded-lg"
                                :style="{ width: `${width <= s * 100 ? ((width - (s - 1) * 100) % 100) : 100}%` }">
                            </div>
                        </div>
                    </div>

                    <!--  -->
                    <div class="flex justify-between items-center mt-2">
                        <div class="flex items-center space-x-2">
                            <avatar :image="story?.user.avatar" />
                            <span>{{ story?.user.firstName }} {{ story?.user.lastName }}</span>
                            <span>{{ formatTime(story?.body[order - 1]?.createdAt) }}</span>
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
                            <div class="relative">
                                <button @click="optionHandler">
                                    <icon name="mdi:dots-horizontal" size="28"/>
                                </button>
                                <div v-if="option" class="deleteContainer">
                                    <button class="text-black flex items-center space-x-2 hover:bg-gray-200 p-1 rounded-lg" @click="deleteAction">
                                        <icon name="ion:trash-outline" size="20"/>
                                        <span>Delete photo</span>
                                    </button>
                                    <div class="absolute right-0 top-0">
                                        <svg height="12" viewBox="0 0 21 12" width="21" fill="white" style="transform: scale(-1, -1) translate(0px, 6px);">
                                            <path d="M20.685.12c-2.229.424-4.278 1.914-6.181 3.403L5.4 10.94c-2.026 2.291-5.434.62-5.4-2.648V.12h20.684z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button class="p-2 bg-gray-400 hover:bg-white hover:translate-x-2 transition-all shadow rounded-full" :class="order == story?.body?.length ? 'invisible' : ''"
            @click="changeOrder('next')">
            <icon name="material-symbols:keyboard-arrow-right" size="30"/>
        </button>
    </div>
</template>

<script setup lang="ts">
import { formatTime } from '~/libraries/utilities'

definePageMeta({ layout: 'story-detail' })

const { $bus } = useNuxtApp()
const route = useRoute()
const _getStory = useGet('story')
const { currentUser } = usePrincipal()
const _patchStory = usePatch('story')

const id_story = route.params.id
const story = ref()
const order = ref<number>(1)
const playButton = ref<boolean>(true)
const option = ref<boolean>(false)
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

const optionHandler = () => {
    option.value = !option.value
    playHandler()
}

const deleteAction = () => {
    if (order.value == story.value.body.length) navigateTo('/')

    story.value.body.splice(order.value - 1, 1)
    clearInterval(interval)
    width.value = (order.value - 1) * 100
    interval = setInterval(() => {
        width.value += 1
    }, 50)
    playButton.value = !playButton.value
    option.value = !option.value
}

const changeOrder = (type: string) => {
    
    if (type == 'next'){
        if (order.value == story.value.body.length) return
        clearInterval(interval)
        width.value = order.value * 100
        order.value += 1
        interval = setInterval(() => {
            width.value += 1
        }, 50)
    } else {
        if (order.value == 1) return
        clearInterval(interval)
        order.value -= 1
        width.value = (order.value - 1) * 100
        interval = setInterval(() => {
            width.value += 1
        }, 50)
    }
    playButton.value = true
}

watch(width, () => {
    if (width.value == order.value * 100) order.value += 1
})

watch(order, () => {
    if (order.value == story.value.body.length + 1) navigateTo('/')
    if (!story.value.body[order.value - 1]?.viewers.includes(currentUser.value.userId)) {
        $bus.$emit('update.story', {
            index: order.value - 1,
            id: id_story
        })
        _patchStory(story.value.body[order.value-1].id, {id: story.value.body[order.value-1].id})
    }
})

onMounted(() => {
    interval = setInterval(() => {
        width.value += 1
    }, 50)
})

onBeforeUnmount(() => {
    clearInterval(interval)
})

onBeforeMount(async ()=>{
    await _getStory(id_story)
        .then(res => {
            story.value = res.find(r => r.id == id_story)
            const index = story.value.body.findIndex(_ => !_.viewers.includes(currentUser.value.userId))
            if (index >= 0){
                order.value = index + 1
                width.value = index * 100
                $bus.$emit('update.story', {
                    index: order.value - 1,
                    id: id_story
                })
                _patchStory(story.value.body[order.value-1].id, {id: story.value.body[order.value-1].id}) 
            }

        })
})
</script>


<style scoped>
.deleteContainer {
    @apply absolute right-0 bg-white shadow p-2 rounded-lg;
    @apply text-sm font-semibold whitespace-nowrap;
}

/* .deleteContainer::before {
    content: '';
    @apply absolute right-0 top-0;
    @apply w-5 h-5 bg-red-600
} */
</style>