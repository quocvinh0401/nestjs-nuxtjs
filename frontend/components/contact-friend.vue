<template>
    <div class="w-[22.5rem]">
        <div class="flex justify-between items-center mt-2">
            <h3 class="font-semibold">Contacts</h3>
            <div class="flex space-x-1">
                <div v-for="m in menus" class="p-1 hover:bg-gray-200 rounded-full cursor-pointer">
                    <icon :name="m.icon" size="20"/>
                </div>
            </div>
        </div>
        
        <horizontal class="my-2"/>

        <card />
        <card />
        <card />
        <card />
        <card />
        <card />
        <card />
        <card />
    </div>
</template>

<script setup lang="ts">
const menus = [
    {
        title: 'New call',
        icon: 'ic:baseline-video-call'
    },
    {
        title: 'Search by name or group',
        icon: 'material-symbols:search-rounded'
    },
    {
        title: 'Options',
        icon: 'mdi:dots-horizontal'
    },
]
</script>