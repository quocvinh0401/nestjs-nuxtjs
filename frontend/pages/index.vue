<template>
    <div class="flex justify-between space-x-2 relative pr-1">
        <!-- left side -->
        <navigation-default></navigation-default>
        <!-- middle -->
        <div class="flex-1 flex justify-center">
            <div
                class="flex-1 basis-[30rem] md:min-w-[30rem] max-w-[30rem] lg:min-w-[37rem] lg:basis-[37rem] lg:w-[37rem] pt-4 flex flex-col space-y-5 relative container">
                <!-- story reel -->
                <div>
                    <div class="grid grid-cols-2 space-x-2 my-1 mx-2">
                        <div class="cursor-pointer hover:bg-gray-200 px-5 py-4 rounded-lg relative"
                            :class="((tabActived == 'story') && 'hover:bg-white')" @click="tabActived = 'story'">
                            <div class="flex justify-center space-x-2"
                                :class="tabActived == 'story' ? 'text-blue-500' : 'text-gray-500'">
                                <icon name="ion:book" :size="24" />
                                <span class="font-semibold">Story</span>
                            </div>
                            <div class="absolute h-1 w-full left-0 -bottom-1 rounded"
                                :class="tabActived == 'story' && 'bg-blue-500'"></div>
                        </div>
                        <div class="cursor-pointer hover:bg-gray-200 px-5 py-4 rounded-lg relative"
                            :class="((tabActived == 'reel') && 'hover:bg-white')" @click="tabActived = 'reel'">
                            <div class="flex justify-center space-x-2"
                                :class="tabActived == 'reel' ? 'text-blue-500' : 'text-gray-500'">
                                <icon name="mdi:clapperboard-play" :size="24" />
                                <span class="font-semibold">Reel</span>
                            </div>
                            <div class="absolute h-1 w-full left-0 -bottom-1 rounded"
                                :class="tabActived == 'reel' && 'bg-blue-500'"></div>
                        </div>
                    </div>
                    <div class="px-4 py-3 border-t flex gap-4 overflow-hidden">
                        <!-- create story -->
                        <div
                            class="w-28 aspect-[0.55] border rounded-lg overflow-hidden flex flex-shrink-0 flex-col cursor-pointer create-story">
                            <div class="flex justify-center overflow-hidden h-3/4 avatar-story">
                                <img src="/images/avatar-default.jpg" alt="" class="object-cover h-full transition-all">
                            </div>
                            <div class="font-semibold text-sm flex flex-1 items-center justify-center pt-2 relative">
                                <span>Create story</span>
                                <div class="bg-white absolute top-0 rounded-full p-1 -translate-y-2/4">
                                    <icon name="clarity:plus-circle-solid" class="text-blue-500" :size="36" />
                                </div>
                            </div>
                            <div></div>
                        </div>
                        <!-- <div class=" text-sm flex flex-col justify-center space-y-4">
                    <div class="flex items-center space-x-2">
                        <icon name="mdi:cards-playing-heart-multiple-outline" class="text-gray-500" :size="22"/>
                        <span>Share everyday moments with friends and family.</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <icon name="et:alarmclock" class="text-gray-500" :size="22"/>
                        <span>Stories disappear after 24 hours.</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <icon name="ph:messenger-logo-thin" class="text-gray-500" :size="22"/>
                        <span>Replies and reactions are private.</span>
                    </div>
                </div> -->
                        <story />
                        <story />
                        <story />
                        <story />
                        <story />
                    </div>
                </div>
                <!-- write post -->
                <div class="px-4 py-3">
                    <!-- top -->
                    <div class="flex space-x-3">
                        <avatar :image="currentUser.avatar" />
                        <div class="flex-1 px-4 rounded-full bg-gray-default hover:bg-gray-200 cursor-pointer text-gray-400 flex items-center"
                            @click="_modal.isOpen = true">
                            What's on your mind, {{ currentUser.lastName }}?</div>
                    </div>

                    <horizontal class="my-3" />

                    <!-- bottom -->
                    <div class="grid grid-cols-3">
                        <div class="flex items-center justify-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-default"
                            @click="test">
                            <icon name="heroicons:video-camera-solid" :size="20" class="text-red-500" />
                            <p class="text-gray-400 font-semibold">Live video</p>
                        </div>
                        <div
                            class="flex items-center justify-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-default">
                            <icon name="material-symbols:photo" :size="20" class="text-green-500" />
                            <p class="text-gray-400 font-semibold">Photo/video</p>
                        </div>
                        <div
                            class="flex items-center justify-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-default">
                            <icon name="bi:emoji-smile" :size="20" class="text-yellow-500" />
                            <p class="text-gray-400 font-semibold">Feeling/activity</p>
                        </div>
                    </div>
                </div>
                <!-- posts -->
                <template v-for="post in posts">
                    <post :post="post" @deletePost="deletePost(post.id)"></post>
                </template>

                <!-- footer -->
                <footer class="my-4">

                </footer>

                <!-- modal create post -->
                <modal v-if="_modal.isOpen" title="Create post" @close="closeModal">
                    <div class="p-2 w-[30rem]">
                        <div class="flex space-x-3">
                            <avatar :image="currentUser.avatar" />
                            <div>
                                <p class="font-semibold text-sm">{{ `${currentUser.firstName} ${currentUser.lastName}`
}}</p>
                                <select name="" id=""
                                    class="p-1 outline-none bg-gray-300 text-sm font-semibold rounded-lg"
                                    v-model="payload.manageAccess">
                                    <option v-for="o in options" :value="o.value">
                                        <span>{{ o.title }}</span>
                                    </option>
                                </select>
                            </div>
                        </div>
                        <textarea name="" id="" cols="30" rows="3" autofocus
                            :placeholder="`What's on your mind, ${currentUser.lastName}?`"
                            class="w-full outline-none resize-none my-4" v-model="payload.content.text"></textarea>
                        <button class="bg-blue-500 w-full text-white p-2 font-semibold rounded-lg" @click="createPost">
                            Post
                        </button>
                    </div>
                </modal>
            </div>
        </div>

        <!-- right side -->
        <contact-friend />
    </div>

</template>

<script setup lang="ts">

import { Modal as iModal } from '~/shared/interface';

const options = [
    {
        title: 'Public',
        icon: 'fa6-solid:earth-asia',
        value: 'public'
    },
    // {
    //     title: 'Friends',
    //     icon: 'material-symbols:group-rounded',
    //     value: 'friends'
    // },
    // {
    //     title: 'Friends except',
    //     icon: 'ic:round-group-remove',
    //     value: 'friends-except'
    // },
    // {
    //     title: 'Specific friends',
    //     icon: 'material-symbols:person',
    //     value: 'specific-friends'
    // },
    {
        title: 'Only me',
        icon: 'ic:baseline-lock',
        value: 'only-me'
    },
    // {
    //     title: 'Custom',
    //     icon: 'icon-park-solid:setting',
    //     value: 'custom'
    // },
]

const { currentUser } = usePrincipal()

const { data: posts, refresh } = useFetchWithCredentials<any>('posts')

const _modal = ref<iModal>({ isOpen: false, title: 'Register', data: null })

const tabActived = ref<string>('story')

const payload = ref({
    content: {
        text: ''
    },
    manageAccess: 'public'
})

const closeModal = () => [
    _modal.value.isOpen = false
]

const _post = usePost('post')

const _delete = useDelete('post')

const createPost = async () => {
    await _post(payload.value).then(() => {
        closeModal()
        payload.value.content.text = ''
        refresh()
    })

}

const deletePost = async (id: string) => {
    await _delete(id)
}


const { authentication } = usePrincipal()
const test = () => {
    console.log(authentication.value)
}
</script>

<style scoped>
.create-story {
    @apply relative;
}

.create-story:hover .avatar-story>img {
    scale: 1.02;
}

.create-story::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    z-index: 10;
}

.create-story:hover::before {
    background: black;
}
</style>