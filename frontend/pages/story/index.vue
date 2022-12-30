<template>
    <div class="grid grid-cols-[22.5rem_auto] h-[calc(100vh-69px)]">
        <!-- left -->
        <div class="bg-white p-3 shadow">
            <div class="font-semibold text-lg mb-2">Your story</div>
            <nuxt-link to="/story/create" class="flex space-x-2 items-center cursor-pointer">
                <div class="bg-gray-default text-blue-600 p-4 rounded-full">
                    <icon name="ic:round-add" size="24"/>
                </div>
                <div>
                    <div class="font-semibold">Create story</div>
                    <div class="text-sm text-gray-600">Share a photo or write something</div>
                </div>
            </nuxt-link>
        </div>

        <!-- right -->
        <div class="grid place-content-center">
            <div class="flex flex-col items-center space-y-2">
                <img src="/images/image-story.png" class="w-40" alt="">
                <span class="text-2xl text-gray-600 font-semibold">Select a story to open.</span>
            </div>
        </div>
    </div>
</template>