<template>
    <!-- {{ user.firstName }} {{ user.lastName }} | Social Media -->
    <div class="bg-white">
        <div class="flex justify-center">
            <div class="flex justify-center flex-col h-[32rem] aspect-[25/10]">
                <div class="relative w-full overflow-hidden shadow rounded-b-lg">
                    <img :src="user.background || '/images/background-default.jpg'"
                        class="w-full object-cover rounded-b-lg -translate-y-1/2" alt="">
                    <button
                        class="absolute bottom-5 right-5 bg-gray-default hover:bg-gray-200 active:bg-gray-300 p-2 rounded-lg flex items-center space-x-2">
                        <icon name="bi:camera-fill" size="20" />
                        <span class="font-semibold">Edit cover photo</span>
                    </button>
                </div>
                <div class="flex flex-col">
                    <div class="flex items-start space-x-4 border-b relative pb-5 px-5">
                        <div class="absolute -translate-y-1/4">
                            <avatar :image="user.avatar" class="!w-44 !h-44 border-4 border-white" />
                            <button class="p-2 rounded-full bg-gray-default absolute bottom-2 right-2" @click="_modal.isOpen = true">
                                <icon name="bi:camera-fill" size="20" />
                            </button>
                        </div>

                        <div class="flex-1 flex items-end justify-between mt-4 pl-44">
                            <div class="grid gap-1">
                                <div class="font-bold text-3xl">{{ user.firstName }} {{ user.lastName }}</div>
                                <div class="font-semibold text-gray-600">{{ user.friends.length }} friends</div>
                                <div class="flex">
                                    <avatar class="!w-8 border-2 border-white" />
                                    <avatar class="!w-8 border-2 border-white -translate-x-2" />
                                    <avatar class="!w-8 border-2 border-white -translate-x-4" />
                                    <avatar class="!w-8 border-2 border-white -translate-x-6" />
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
                    <div class="flex font-semibold text-gray-600">
                        <div class="hidden md:flex space-x-2 my-1">
                            <button v-for="(tab, index) in tabs"
                                class="hover:bg-gray-200 px-5 py-4 rounded-lg relative capitalize"
                                :class="((tabActived == index) && 'hover:bg-white')" @click="handleChooseTab(tab, index)">

                                <span v-if="tab.title != 'more'" class=" text-gray-500" :class="tabActived == index ? 'text-blue-500' : ''" >{{ tab.title }}</span>
                                <div v-else class="flex items-center">
                                    <span>{{ tab.title }}</span>
                                    <icon  name="material-symbols:arrow-drop-down-rounded" size="30"/>
                                </div>

                                <div v-if="tab.title != 'more'" class="absolute h-1 w-full left-0 -bottom-1 rounded"
                                    :class="tabActived == index && 'bg-blue-500'">
                                </div>
                                <div v-if="isSubTabActived && tab.title == 'more'" class="absolute text-left  whitespace-nowrap bg-white rounded-lg p-2 left-0 shadow translate-y-5">
                                    <div v-for="(t, index) of subTabs" class="first-letter:capitalize normal-case hover:bg-gray-default p-1 rounded">
                                        {{ t.title }}
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal v-if="_modal.isOpen" :title="_modal.title" @close="closeModal">
        <div class="w-96">
            <div class="relative">
                <label for="set_avatar">Upload image</label>
                <input type="file" class="opacity-0 absolute -z-10" id="set_avatar" @change="setAvatar"/>
            </div>
        </div>
    </modal>
    <nuxt-page></nuxt-page>
</template>

<script setup lang="ts">
import { Modal as iModal } from '~/shared/interface';
import { User } from '~/shared/user.interface';

const tabs = [
    { title: 'posts' },
    { title: 'about' },
    { title: 'friends' },
    { title: 'photos' },
    { title: 'videos' },
    { title: 'more' }
]

const subTabs = ref([
    { title: 'sports' },
    { title: 'musics' },
    { title: 'movies' },
    { title: 'TV shows' },
    { title: 'books' },
    { title: 'apps and games' },
    { title: 'likes' },
    { title: 'events' },
])

const _modal = ref<iModal>({ isOpen: false, title: 'Update profile picture', type: 'set_avatar', data: null })

const authentication = useAuthentication()
const { currentUser } = usePrincipal()

const closeModal = () => _modal.value.isOpen = false
const _avatar = ref('')

const tabActived = ref<any>(0)

const isSubTabActived = ref(false)
const route = useRoute()

const { userId } = route.query
const _getUser = useGet('user')
const _postFile = usePost('file')
const user = await _getUser(userId!, { id: userId }) as User

watch(() => currentUser.value.avatar, (v)=> user.avatar = v)

const handleChooseTab = (tab, index) => {
    if (tab.title == 'more'){
        tabActived.value = undefined
        isSubTabActived.value = !isSubTabActived.value
    } else {
        tabActived.value = index
        isSubTabActived.value = false
    }
}

const setAvatar = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    const res = await $fetch('http://localhost:4000/api/file/avatar', {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${authentication.value.jwt}`
        }
    }) as any
    currentUser.value.avatar = res.url
    _modal.value.isOpen = false
    

}
</script>