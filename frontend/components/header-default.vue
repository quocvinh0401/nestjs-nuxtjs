<template>
    <div class="w-full border-b shadow-sm sticky top-0 left-0 flex justify-between items-center bg-white px-3 h-[69px] z-50">
        <!-- left -->
        <div class="flex space-x-2 items-center">
            <!-- logo -->
            <img src="/images/logo.png" class="w-14 h-14 cursor-pointer">
            <!-- search -->
            <div class="bg-gray-default flex items-center justify-center rounded-full overflow-hidden h-fit">
                <icon name="ic:outline-search" size="24" class="text-gray-500 p-2" />
                <input type="text" placeholder="Search..." class="bg-gray-default outline-none p-2 hidden xl:block">
            </div>
        </div>

        <!-- center -->
        <div class="hidden md:flex space-x-2 my-1">
            <div v-for="(tab, index) in tabs" class="cursor-pointer hover:bg-gray-200 px-5 py-4 rounded-lg relative" :class="((tabActived == index) && 'hover:bg-white')" @click="tabActived = index">
                <icon :name="(tabActived == index) ? tab.iconActived : tab.icon" size="28" :class="tabActived == index ? 'text-blue-500' : 'text-gray-500'"/>
                <div class="absolute h-1 w-full left-0 -bottom-1 rounded" :class="tabActived == index && 'bg-blue-500'"></div>
            </div>
        </div>

        <!-- right -->
        <div class="flex space-x-2 items-center">
            <div class="hidden xl:flex items-center space-x-2 hover:bg-gray-default px-2 py-1 rounded-full h-fit">
                <avatar class="w-7 h-7"/>
                <span class="font-semibold">Le</span>
            </div>
            <div v-for="(m, i) in menusRight" 
                class="bg-gray-200 hover:bg-gray-300 p-2 rounded-full cursor-pointer"
                :class="menuActived == i && 'bg-blue-200'"
                @click="menuActived = menuActived == i ? undefined : i">
                <icon :name="m.icon" size="24" :class="menuActived == i ? 'text-blue-500' : 'text-black'"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
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
</script>

<style scoped>
h3 {
    @apply text-lg font-semibold
}
</style>