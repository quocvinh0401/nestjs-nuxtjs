<template>
    <div class="px-4 py-3">
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
            <div v-if="likeArray.length > 0" class="flex space-x-1 items-center">
                <icon name="heroicons:hand-thumb-up-20-solid" :size="20" class="text-blue-500" />
                <p>{{ likeArray.length > 0 ? likeArray.length : '' }}</p>
            </div>
            <div v-else></div>
            <div>
                <div>{{ post.comments.length > 0 ? `${post.comments.length}
                    ${post.comments.length == 1 ? 'comment' : 'comments'}` : ''
}}</div>
                <div>{{ post.interact.share.length > 0 ? `${post.interact.share.length} ${post.interact.share.length ==
        1 ? 'share' : 'shares'}` : ''
}}</div>
            </div>
        </div>

        <!-- interact action -->
        <div class="grid grid-cols-3 gap-2 py-1 border-y my-3">
            <div class="flex space-x-2 items-center justify-center py-2 rounded-lg hover:bg-gray-default cursor-pointer relative reaction-container"
                :class="isLike ? 'text-blue-500' : 'text-gray-600'" @click="handleLike">
                <icon :name="isLike ? 'heroicons:hand-thumb-up-20-solid' : 'heroicons:hand-thumb-up'" :size="22" />
                <span>Like</span>
                <div
                    class="invisible flex absolute -top-0 -left-3 border shadow-md rounded-full bg-white reaction-item">
                    <div v-for="gif in reactionLike" class="hover:scale-125">
                        <img :src="gif.gif" alt="" class="w-12 max-w-none">
                    </div>
                </div>
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
                    placeholder="Write a comment..." @keydown.enter="handleSubmit" v-model="content.text">
            </div>
            <template v-for="comment in comments">
                <comment :comment="comment" />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Builder } from 'builder-pattern';
import { formatTime } from '~/libraries/utilities';
// import { Comment } from '~/shared/comment.interface';
import { Like, Post } from '~/shared/post.interface';

const _postComment = usePost<any>('comment')

const _postLike = usePost<any>('post')

const reactionLike = [
    {
        action: 'like',
        gif: 'images/gif/reaction/like.gif'
    },
    {
        action: 'heart',
        gif: 'images/gif/reaction/heart.gif'
    },
    // {
    //     action: 'care',
    //     gif: 'images/gif/reaction/care.gif'
    // },
    {
        action: 'haha',
        gif: 'images/gif/reaction/haha.gif'
    },
    {
        action: 'wow',
        gif: 'images/gif/reaction/wow.gif'
    },
    {
        action: 'sad',
        gif: 'images/gif/reaction/sad.gif'
    },
    {
        action: 'angry',
        gif: 'images/gif/reaction/angry.gif'
    }
]

const props = defineProps<{ post: Post }>()

const { currentUser } = usePrincipal()

const content = ref<any>({
    text: ''
})

const isLike = ref<boolean>(props.post.interact.like.filter(l => l.user.login == currentUser.value.login).length > 0)

const likeArray = computed(() => props.post.interact.like)

const handleLike = async () => {
    isLike.value = !isLike.value
    const _like = Builder<Like>().action('like').user(currentUser.value).build()

    await _postLike('like', props.post.id, _like)
    if (!isLike.value) {
        const index = likeArray.value.findIndex(l => l.user.login == currentUser.value.login)
        likeArray.value.splice(index, 1)
    } else {
        likeArray.value.push(_like)
    }
    console.log('like')
}

const handleShare = () => {
    console.log('share')
}

const comments = computed<any[]>(() => props.post.comments)

const handleSubmit = async () => {
    const _ = Builder<any>().content(content.value).postId(props.post.id).build()
    const comment = await _postComment(_)
    comments.value.unshift(comment)
    content.value.text = ''
}

const deletePost = () => {
    console.log('delete')
}
</script>

<style scoped>
.reaction-container:hover>.reaction-item {
    @apply visible -top-12;
    @apply transition-all delay-300;
}
</style>