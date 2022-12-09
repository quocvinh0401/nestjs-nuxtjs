<template>
    <div class="w-full border-b shadow-sm sticky top-0 left-0 flex justify-between items-center bg-white px-3">
        <!-- left -->
        <div>
            <!-- logo -->

            <!-- search -->
            <div class="bg-gray-default flex items-center justify-center rounded-full overflow-hidden">
                <icon name="ic:outline-search" size="24" class="text-gray-500 p-2" />
                <input type="text" placeholder="Search..." class="bg-gray-default outline-none p-2">
            </div>
        </div>

        <!-- center -->
        <div class="flex space-x-2 my-1">
            <div v-for="(tab, index) in tabs" class="cursor-pointer hover:bg-gray-200 px-5 py-4 rounded-lg relative" :class="((tabActived == index) && 'hover:bg-white')" @click="tabActived = index">
                <icon :name="(tabActived == index) ? tab.iconActived : tab.icon" size="28" :class="tabActived == index ? 'text-blue-500' : 'text-gray-500'"/>
                <div class="absolute h-1 w-full left-0 -bottom-1 rounded" :class="tabActived == index && 'bg-blue-500'"></div>
            </div>
        </div>

        <!-- right -->
        <div class="flex space-x-2">
            <div v-for="(m, i) in menusRight" 
                class="bg-gray-200 hover:bg-gray-300 p-2 rounded-full cursor-pointer"
                :class="menuActived == i && 'bg-blue-200'"
                @click="menuActived = i">
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
        icon: 'mdi:marketplace-outline',
        iconActived: 'mdi:marketplace',
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