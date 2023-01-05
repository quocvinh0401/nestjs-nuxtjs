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
                        <avatar :image="currentUser?.avatar" class="!w-14 !h-14" />
                        <span class="font-semibold text-lg">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</span>
                        <nuxt-link to="/story/create" class="!ml-auto">
                            <button class="p-2 rounded-full gray">
                                <icon name="fluent:add-28-filled" size="24"/>
                            </button>
                        </nuxt-link>
                    </button>
                </nuxt-link>
            </div>

            <div v-if="stories.length == 0" class="text-gray-500 px-3">When friends, groups, and pages post stories their stories will show up here.</div>
            <template v-else v-for="s in stories.filter(_ => _.id != currentUser.userId)">
                <nuxt-link :to="`/story/${s.id}`" class="mx-3">
                    <button class="flex items-center space-x-2 w-full hover:bg-gray-200 p-2 rounded-lg ">
                        <avatar :image="s?.user.avatar" class="!w-14 !h-14" />
                        <span class="font-semibold text-lg">{{ s.user?.firstName }} {{ s.user?.lastName }}</span>
                    </button>
                </nuxt-link>
            </template>
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { Story as iStory } from '~/shared/story.interface';

const { currentUser } = usePrincipal()
const router = useRouter()
const { data: _stories, refresh: refreshStory, pending} = useFetchWithCredentials<iStory[]>('stories')

const stories = ref<any>([])

const back = () => {
    router.go(-1)
}

const temp = () => {
    console.log(router)
}

watch(pending, ()=> {
    stories.value = _stories.value
})
</script>