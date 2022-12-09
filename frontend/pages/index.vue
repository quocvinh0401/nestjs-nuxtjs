<template>
    <div class="w-[40rem] mt-4 flex flex-col space-y-4">
        <!-- write post -->
        <div class="bg-white px-4 py-3 rounded-lg">
            <!-- top -->
            <div class="flex space-x-3">
                <div class="w-10 h-10 rounded-full overflow-hidden">
                    <img src="https://i.pinimg.com/736x/75/df/bd/75dfbdf97dfee730f413ad347816da62.jpg" alt="">
                </div>
                <input type="text" placeholder="What's on your mind?"
                    class="flex-1 outline-none px-4 rounded-full bg-gray-default">
            </div>

            <horizontal class="my-3" />

            <!-- bottom -->
            <div class="grid grid-cols-3">
                <div class="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-default">
                    <icon name="heroicons:video-camera-solid" size="20" class="text-red-500" />
                    <p class="text-gray-400 font-semibold">Live video</p>
                </div>
                <div class="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-default">
                    <icon name="material-symbols:photo" size="20" class="text-green-500" />
                    <p class="text-gray-400 font-semibold">Photo/video</p>
                </div>
                <div class="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-default">
                    <icon name="bi:emoji-smile" size="20" class="text-yellow-500" />
                    <p class="text-gray-400 font-semibold">Feeling/activity</p>
                </div>
            </div>
        </div>
        <!-- posts -->
        <post></post>
        <post></post>
        <post></post>
        <post></post>
    </div>
</template>

<script setup lang="ts">

</script>