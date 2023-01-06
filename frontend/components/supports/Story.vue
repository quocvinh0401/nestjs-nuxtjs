<template>
    <div
        class="w-28 aspect-[0.55] border rounded-lg flex flex-shrink-0 cursor-pointer relative overflow-hidden shadow story">
        <div v-html="indexNewStory >= 0 ? story.body[indexNewStory].content : story.body[0].content" class="story_body transition-all"></div>
        <div class="absolute bg-black opacity-50 w-full h-full"></div>
        <div class="w-10 h-10 box-border rounded-full p-[1px] border-[3px] absolute top-2 left-2"
            :class="story.body.some(b => !b.viewers.includes(currentUser.userId)) ? 'border-blue-500' : 'border-gray-300' ">
            <avatar :image="story.user.avatar" class="!w-full !h-full" />
            <!-- <div class="w-2 h-2 rounded-full bg-green-500 absolute right-0 bottom-0 border-[1px] border-white"></div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { Story as iStory } from '~/shared/story.interface';

const props = defineProps<{ story: any }>()

const { currentUser } = usePrincipal()

const indexNewStory = props.story.body.findIndex(b => !b.viewers.includes(currentUser.value.userId))

</script>

<style scoped>
.story:hover> .story_body {
    @apply scale-105
}
</style>
