<template>
    <div class="bg-white px-4 py-3 rounded-lg shadow-md">
        <!-- header -->
        <div class="flex justify-between mb-4">
            <div class="flex space-x-3">
                <avatar :image="post.user.avatar" />
                <div>
                    <h3 class="text-md font-semibold">{{ `${post.user.firstName} ${post.user.lastName}` }}</h3>
                    <div class="text-sm text-gray-500 flex items-center space-x-1">
                        <span>{{ formatTime(post?.createdAt) }} •</span>
                        <icon name="ion:earth" />
                    </div>
                </div>
            </div>
            <div>
                <div class="p-2 hover:bg-gray-default rounded-full cursor-pointer" @click="deletePost">
                    <icon name="ic:outline-clear" :size="20" />
                </div>
            </div>
        </div>

        <!-- content -->
        <div class="mb-2">{{ post.content.text }}</div>

        <!-- interact number -->
        <div class="flex justify-between text-gray-600">
            <div class="flex space-x-1 items-center">
                <icon name="uiw:like-o" :size="20" />
                <p>{{ post.interact.like.length > 0 ? post.interact.like.length : '' }}</p>
            </div>
            <div>
                <div>{{ post.interact.comment.length > 0 ? `${post.interact.comment.length}
                                    ${post.interact.comment.length == 1 ? 'comment' : 'comments'}` : ''
                }}</div>
                <div>{{ post.interact.share.length > 0 ? `${post.interact.share.length} ${post.interact.share.length ==
                        1 ? 'share' : 'shares'}` : ''
                }}</div>
            </div>
        </div>

        <!-- interact action -->
        <div class="grid grid-cols-3 gap-2 py-1 border-y my-3">
            <div class="flex space-x-2 items-center justify-center py-2 rounded-lg text-gray-600 hover:bg-gray-default cursor-pointer"
                @click="handleLike">
                <icon name="uiw:like-o" :size="22" />
                <span>Like</span>
            </div>
            <div
                class="flex space-x-2 items-center justify-center py-2 rounded-lg text-gray-600 hover:bg-gray-default cursor-pointer">
                <icon name="fluent:comment-20-regular" :size="22" />
                <span>Comment</span>
            </div>
            <div class="flex space-x-2 items-center justify-center py-2 rounded-lg text-gray-600 hover:bg-gray-default cursor-pointer"
                @click="handleShare">
                <icon name="icon-park-outline:share-two" :size="22" />
                <span>Share</span>
            </div>
        </div>

        <!-- comment -->
        <div class="grid gap-4">
            <div class="flex space-x-3">
                <avatar :image="post.user.avatar" />
                <input type="text" class="flex-1 py-2 px-3 bg-gray-default rounded-full outline-none"
                    placeholder="Write a comment..." @keydown.enter="handleSubmit" v-model="cmt">
            </div>

            <comment></comment>
            <comment></comment>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Builder } from 'builder-pattern';
import { formatTime } from '~/libraries/utilities';
import { Query } from '~/shared/interface';
import { Post } from '~/shared/post.interface';

const _post = usePost<any>('comment')

const props = defineProps<{ post: Post }>()

const cmt = ref<string>('')

const handleLike = () => {
    console.log('like')
}

const handleShare = () => {
    console.log('share')
}

// const comments = ref<Comment[]>([])

const handleSubmit = async () => {
    await _post({ content: { text: cmt.value }, postId: props.post.id })
    cmt.value = ''
}

const deletePost = () => {
    console.log('delete')
}
</script>