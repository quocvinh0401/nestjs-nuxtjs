<template>
    <div
        class="w-28 aspect-[0.55] border rounded-lg overflow-hidden flex flex-shrink-0 cursor-pointer relative shadow story">
        <!-- <div class="w-full h-full" :class="`bg-[url('${story.background ? story.background : '/images/avatar-default.jpg'}')]`"></div> -->
        <div class="w-full h-full bg-cover bg-no-repeat story-background transition-all"
            :class="`bg-[url('${backgroundStory}')]`"></div>
        <div class="absolute bg-black opacity-50 w-full h-full"></div>
        <div class="w-10 h-10 box-border rounded-full p-[1px] border-[3px] border-blue-500 absolute top-2 left-2">
            <avatar class="!w-full !h-full" />
            <div class="w-2 h-2 rounded-full bg-green-500 absolute right-0 bottom-0 border-[1px] border-white"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ story: any }>()
const backgroundStory = computed<string>(() => '/images/background-default.jpg')
// const backgroundStory = computed<string>(()=> props.story.background || '/images/background-default.jpg')
</script>

<style scoped>
.story:hover>.story-background {
    @apply scale-105
}
</style>
