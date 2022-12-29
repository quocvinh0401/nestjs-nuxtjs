<template>
    <div
        class="w-full border-b shadow-sm sticky top-0 left-0 grid grid-cols-3 bg-white px-3 h-[69px] z-40">
        <!-- left -->
        <div class="flex space-x-2 items-center">
            <!-- logo -->
            <nuxt-link to="/">
                <img src="/images/logo.png" class="w-14 h-14 cursor-pointer">
            </nuxt-link>
            <!-- search -->
            <div class="bg-gray-default flex items-center justify-center rounded-full overflow-hidden h-fit">
                <icon name="ic:outline-search" size="24" class="text-gray-500 p-2" />
                <input type="text" placeholder="Search..." class="bg-gray-default outline-none p-2 hidden xl:block">
            </div>
        </div>

        <!-- center -->
        <div class="hidden md:flex space-x-2 my-1 place-content-center">
            <div v-for="(tab, index) in tabs" class="cursor-pointer hover:bg-gray-200 px-5 py-4 rounded-lg relative"
                :class="((tabActived == index) && 'hover:bg-white')" @click="tabActived = index">
                <icon :name="(tabActived == index) ? tab.iconActived : tab.icon" size="28"
                    :class="tabActived == index ? 'text-blue-500' : 'text-gray-500'" />
                <div class="absolute h-1 w-full left-0 -bottom-1 rounded" :class="tabActived == index && 'bg-blue-500'">
                </div>
            </div>
        </div>

        <!-- right -->
        <div class="flex space-x-2 items-center place-content-end">
            <nuxt-link :to="{ path: 'profile', query: { userId: `${currentUser.userId}` } }"
                class="hidden xl:flex items-center space-x-2 hover:bg-gray-default px-2 py-1 rounded-full h-fit cursor-pointer active:bg-gray-200 active:scale-95 duration-150">
                <avatar class="!w-7 !h-7" :image="currentUser.avatar" />
                <span class="font-semibold max-w-[10rem] whitespace-nowrap overflow-hidden text-ellipsis">{{ currentUser.lastName }}</span>
            </nuxt-link>
            <div v-for="(m, i) in menusRight" class="bg-gray-200 hover:bg-gray-300 p-2 rounded-full cursor-pointer"
                :class="menuActived == i && 'bg-blue-200'" @click="menuActived = menuActived == i ? undefined : i">
                <icon :name="m.icon" size="24" :class="menuActived == i ? 'text-blue-500' : 'text-black'" />
            </div>
            <div class="bg-gray-200 hover:bg-gray-300 p-2 rounded-full cursor-pointer" @click="handleLogout">
                <icon name="teenyicons:game-controller-solid" size="24" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePatch } from '~/composables/use-apis';
import { changeFormRoute } from '~/libraries/utilities';
import { User } from '~/shared/user.interface';

const { logout, currentUser } = usePrincipal()

const tabActived = ref<number>(0)
const menuActived = ref<number>()

const tabs = ref([
    {
        title: 'home',
        icon: 'material-symbols:home-outline',
        iconActived: 'material-symbols:home',
    },
    {
        title: 'watch',
        icon: 'mingcute:youtube-line',
        iconActived: 'ci:youtube',
    },
    {
        title: 'marketplace',
        icon: 'ion:storefront-outline',
        iconActived: 'ion:storefront-sharp',
    },
    {
        title: 'gaming',
        icon: 'teenyicons:game-controller-outline',
        iconActived: 'teenyicons:game-controller-solid',
    },
])

const menusRight = ref([
    {
        title: 'menu',
        icon: 'mingcute:dot-grid-fill'
    },
    {
        title: 'messenger',
        icon: 'mdi:facebook-messenger'
    },
    {
        title: 'notifications',
        icon: 'zondicons:notifications'
    },
    {
        title: 'account',
        icon: 'material-symbols:arrow-drop-down'
    },
])

const _patch = usePatch<User>('user/logout')

const handleLogout = async () => {
    await _patch(currentUser.value)
    logout()
}
</script>

<style scoped>
h3 {
    @apply text-lg font-semibold
}
</style>