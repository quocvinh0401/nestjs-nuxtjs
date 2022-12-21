<template>
    <div
        class="flex-1 basis-[30rem] md:min-w-[30rem] max-w-[30rem] lg:min-w-[37rem] lg:basis-[37rem] lg:w-[37rem] pt-4 flex flex-col space-y-5 relative">
        <!-- write post -->
        <div class="bg-white px-4 py-3 rounded-lg">
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
                <div
                    class="flex items-center justify-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-default">
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
            <post :post="post"></post>
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
                        <p class="font-semibold text-sm">{{ `${currentUser.firstName} ${currentUser.lastName}` }}</p>
                        <select name="" id="" class="p-1 outline-none bg-gray-300 text-sm font-semibold rounded-lg" v-model="payload.manageAccess">
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

const { data: posts, refresh } = useFetchWithCredentials('posts')

const _modal = ref<iModal>({ isOpen: false, title: 'Register', data: null })

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



const createPost = async () => {
    await _post(payload.value)
    closeModal()
    payload.value.content.text = ''
    refresh()
}
</script>