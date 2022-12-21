<template>
    <div class="flex space-x-3 comment">
        <avatar image="https://cdnimg.vietnamplus.vn/t460/Uploaded/mzdiq/2016_08_07/conan2.PNG"></avatar>
        <div>
            <div class="flex items-center space-x-2">
                <div class="bg-gray-default rounded-xl p-2">
                    <div class="font-semibold">Zeref</div>
                    <div>Lorem, ipsum dolor.</div>
                </div>
                <div class="p-1 rounded-full hover:bg-gray-default cursor-pointer option hidden">
                    <icon name="bx:dots-horizontal-rounded" :size="20" class="text-gray-700"/>
                </div>
            </div>
            <div class="text-sm text-gray-600 px-4">
                <span class="font-semibold">Like</span>
                <span class="font-semibold mx-4">Reply</span>
                <span>5d</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.comment:hover .option {
    @apply block
}
</style>