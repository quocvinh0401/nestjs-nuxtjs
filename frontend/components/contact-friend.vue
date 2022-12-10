<template>
    <div class="max-w-[22.5rem] min-w-[17.5rem] flex-1 basis-[22.5rem] hidden md:block sticky top-[69px] h-[calc(100vh-69px)] overflow-hidden overflow-y-auto">
        <div class="flex justify-between items-center mt-2 mr-4">
            <h3 class="font-semibold">Contacts</h3>
            <div class="flex space-x-1">
                <div v-for="m in menus" class="p-1 hover:bg-gray-200 rounded-full cursor-pointer">
                    <icon :name="m.icon" size="20"/>
                </div>
            </div>
        </div>
        
        <horizontal class="my-2"/>

        <card v-for="i in 20"/>
        
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