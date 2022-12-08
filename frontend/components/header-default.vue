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
            <div v-for="(tab, index) in tabs" class="cursor-pointer hover:bg-gray-200 px-5 py-4 rounded-lg" :class="((tabActived == index) && 'hover:bg-white')" @click="tabActived = index">
                <icon :name="(tabActived == index) ? tab.iconActived : tab.icon" size="28" :class="tabActived == index ? 'text-blue-500' : 'text-gray-500'"/>
            </div>
        </div>

        <!-- right -->
        <div>

        </div>
    </div>
</template>

<script setup lang="ts">
const tabActived = ref<number>(0)

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
</script>

<style scoped>
h3 {
    @apply text-lg font-semibold
}
</style>