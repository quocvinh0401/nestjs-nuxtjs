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

            <div class="p-3">
                <div class="flex justify-between items-center mb-3">
                    <div class="text-2xl font-bold">Your story</div>
                    <button class="p-2 button gray rounded-full">
                        <icon name="ant-design:setting-filled" size="24" />
                    </button>
                </div>
                <nuxt-link :to="`/story/${currentUser.userId}`">
                    <button class="flex items-center space-x-2 w-full hover:bg-gray-200 p-2 rounded-lg">
                        <div class="w-14 h-14 box-border rounded-full p-[2px] border-[3px] border-blue-500" 
                            :class="newStoriesList(_stories?.find(s => s.id == currentUser?.userId), currentUser.userId).length > 0 ? 'border-blue-500' : 'border-gray-300'">
                            <avatar :image="currentUser?.avatar" class="!w-full !h-full" />
                        </div>
                        <div class="flex flex-col items-start">
                            <span class="font-semibold">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</span>
                            <span class="text-sm">
                                <span class="text-blue-500">{{ newStoriesList(_stories?.find(s => s.id == currentUser?.userId), currentUser.userId).length > 0 ? `${newStoriesList(_stories?.find(s => s.id == currentUser?.userId), currentUser.userId).length} new` : ''}} </span>
                                {{ newStoriesList(_stories?.find(s => s.id == currentUser?.userId), currentUser.userId).length > 0 ? '·' : '' }} {{ formatTime(_stories?.find(s => s.id == currentUser?.userId)?.body.at(-1)?.createdAt) }}
                            </span>
                        </div>
                        <nuxt-link to="/story/create" class="!ml-auto">
                            <button class="p-2 rounded-full gray">
                                <icon name="fluent:add-28-filled" size="24"/>
                            </button>
                        </nuxt-link>
                    </button>
                </nuxt-link>
            </div>

            <div v-if="stories.length == 0" class="text-gray-500 px-3">When friends, groups, and pages post stories their stories will show up here.</div>
            <div v-else v-for="s in stories.filter(_ => _.id != currentUser.userId)" class="px-3">
                <nuxt-link :to="`/story/${s.id}`">
                    <button class="flex items-center space-x-2 w-full hover:bg-gray-200 p-3 rounded-lg ">
                        <div class="w-14 h-14 box-border rounded-full p-[2px] border-[3px] border-blue-500" 
                            :class="newStoriesList(_stories?.find(_ => _.id == s?.id), currentUser.userId).length > 0 ? 'border-blue-500' : 'border-gray-300'">
                            <avatar :image="s?.user.avatar" class="!w-full !h-full" />
                        </div>
                        <div class="flex flex-col items-start">
                            <span class="font-semibold">{{ s.user?.firstName }} {{ s.user?.lastName }}</span>
                            <span class="text-sm">
                                <span class="text-blue-500">{{ newStoriesList(_stories?.find(_s => _s.id == s.user?.userId), currentUser.userId).length > 0 ? `${newStoriesList(_stories?.find(_s => _s.id == s.user?.userId), currentUser.userId).length} new` : ''}} </span>
                                {{ newStoriesList(_stories?.find(_s => _s.id == s.user?.userId), currentUser.userId).length > 0 ? '·' : '' }} {{ formatTime(_stories?.find(_s => _s.id == s.user?.userId)?.body.at(-1)?.createdAt) }}
                            </span>
                        </div>
                        
                    </button>
                </nuxt-link>
            </div>
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { formatTime, newStoriesList } from '~/libraries/utilities';
import { Story as iStory } from '~/shared/story.interface';

const { $bus } = useNuxtApp()
const { currentUser } = usePrincipal()
const router = useRouter()
const { data: _stories, refresh: refreshStory, pending} = useFetchWithCredentials<iStory[]>('stories')

interface PayloadUpdateStory {
    id: string,
    index: number
}

const stories = ref<any>([])

const back = () => {
    router.go(-1)
}

watch(pending, ()=> {
    stories.value = _stories.value
})

const updateStory = (payload: PayloadUpdateStory) => {
    const story = _stories.value?.find(s => s.id == payload.id)
    story?.body[payload.index]?.viewers.push(currentUser.value.userId)  
}

onBeforeMount(()=>{
    $bus.$on('update.story', updateStory)
})

onBeforeUnmount(()=>{
    $bus.$off('update.story')
})
</script>