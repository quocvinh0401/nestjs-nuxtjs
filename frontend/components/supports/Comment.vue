<template>
    <div class="flex space-x-3 comment">
        <avatar :image="comment.user.avatar"></avatar>
        <div>
            <div class="flex items-center space-x-2">
                <div class="bg-gray-default rounded-xl p-2">
                    <div class="font-semibold">{{ comment.user.firstName }} {{ comment.user.lastName }}</div>
                    <div>{{ comment.content.text }}</div>
                </div>
                <div class="p-1 rounded-full hover:bg-gray-default cursor-pointer option hidden">
                    <icon name="bx:dots-horizontal-rounded" size="20" class="text-gray-700" />
                </div>
            </div>
            <div class="text-sm text-gray-600 px-3">
                <span class="font-semibold">Like</span>
                <span class="font-semibold mx-4">Reply</span>
                <span>{{ formatTime(comment.createdAt) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatTime } from '~/libraries/utilities';
import { Comment } from '~/shared/comment.interface';

const props = defineProps<{ comment: Comment }>()

</script>

<style scoped>
.comment:hover .option {
    @apply block
}
</style>