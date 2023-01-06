<template>
    <div class="px-4 py-3">
        <template v-if="!isHiddenState">
            <!-- header -->
            <div class="flex justify-between mb-4">
                <div class="flex space-x-3">
                    <avatar :image="post?.user?.avatar" />
                    <div>
                        <h3 class="text-md font-semibold">{{ `${post?.user?.firstName} ${post.user?.lastName}` }}</h3>
                        <div class="text-sm text-gray-500 flex items-center space-x-1">
                            <span>{{ formatTime(post?.createdAt, 1) }} •</span>
                            <icon name="ion:earth" />
                        </div>
                    </div>
                </div>
                <div>
                    <div class="p-2 hover:bg-gray-default rounded-full cursor-pointer" @click="deletePost">
                        <icon name="ic:outline-clear" size="20" />
                    </div>
                </div>
            </div>
            <!-- content -->
            <div class="mb-2">{{ post.content?.text }}</div>
            <!-- interact number -->
            <div class="flex justify-between text-gray-600">
                <div v-if="likeArray.length > 0" class="flex space-x-1 items-center">
                    <div class="flex">
                        <template v-for="reaction in reactionAction.slice(0, 3)">
                            <div v-if="reaction.length > 0" class="relative flex justify-center reaction">
                                <img :src="`/images/reaction/${reaction[0].action}.png`" alt=""
                                    class="w-5 h-5 cursor-pointer">
                                <!-- <div class="absolute translate-y-7 z-10 whitespace-nowrap flex flex-col bg-black opacity-70 text-white text-sm p-2 rounded-lg">
                                    <span class="capitalize mb-2 text-base font-semibold">{{ reaction[0].action }}</span>
                                    <span v-for="r in reaction" class="leading-tight">{{ `${r.user.firstName} ${r.user.lastName}` }}</span>
                                </div> -->
                            </div>
                        </template>
                    </div>
                    <p>{{ likeArray.length > 0 ? likeArray.length : '' }}</p>
                </div>
                <div v-else></div>
                <div>
                    <div>{{ post.comments?.length > 0 ? `${post.comments?.length}
                        ${post.comments.length == 1 ? 'comment' : 'comments'}` : ''
            }}</div>
                    <div>{{ post.interact.share.length > 0 ? `${post.interact.share.length} ${post.interact.share.length ==
            1 ? 'share' : 'shares'}` : ''
            }}</div>
                </div>
            </div>
            <!-- interact action -->
            <div class="grid grid-cols-3 gap-2 py-1 border-y my-3">
                <div class=" relative reaction-container">
                    <div class="flex space-x-2 items-center justify-center py-2 rounded-lg hover:bg-gray-default cursor-pointer"
                        @click="likeStatus = likeStatus ? '' : 'like'" :class="_displayReaction?.style || 'text-gray-500'">
                        <icon v-if="!likeStatus || likeStatus == 'like'"
                            :name="likeStatus ? 'heroicons:hand-thumb-up-20-solid' : 'heroicons:hand-thumb-up'"
                            size="22" />
                        <img v-else :src="_displayReaction?.icon" alt="" class="w-5 h-5 object-cover">
                        <span class="capitalize font-semibold">{{ _displayReaction?.action || 'Like' }}</span>
                    </div>
                    <div
                        class="invisible flex absolute left-0 border shadow-md rounded-full bg-white reaction-item cursor-pointer">
                        <div v-for="(value, action) in displayReaction" class="relative flex justify-center"
                            @click="handleLike(value.action)">
                            <img :src="value.gif" alt="" class="w-12 max-w-none hover:scale-150">
                            <span
                                class="hidden capitalize absolute -top-6 px-1 py-[2px] rounded-3xl text-xs bg-black opacity-80 text-white">{{
            value.action
            }}</span>
                        </div>
                    </div>
                </div>
                <div
                    class="flex space-x-2 items-center justify-center py-2 rounded-lg text-gray-600 hover:bg-gray-default cursor-pointer">
                    <icon name="fluent:comment-20-regular" size="22" />
                    <span>Comment</span>
                </div>
                <div class="flex space-x-2 items-center justify-center py-2 rounded-lg text-gray-600 hover:bg-gray-default cursor-pointer"
                    @click="handleShare">
                    <icon name="icon-park-outline:share-two" size="22" />
                    <span>Share</span>
                </div>
            </div>
            <!-- comment -->
            <div class="grid gap-4">
                <div class="flex space-x-3">
                    <avatar :image="post.user?.avatar" />
                    <input type="text" class="flex-1 py-2 px-3 bg-gray-default rounded-full outline-none"
                        placeholder="Write a comment..." @keydown.enter="handleSubmit" v-model="content.text">
                </div>
                <template v-for="comment in comments">
                    <comment :comment="comment" />
                </template>
            </div>
        </template>

        <template v-else>
            <div class="flex justify-between">
                <div class="flex space-x-3">
                    <icon name="bi:x-octagon" class="mt-2"/>
                    <div>
                        <div class="font-semibold">Post hidden</div>
                        <div class="text-sm">You'll see fewer posts like this.</div>
                    </div>
                </div>
                <button class="bg-gray-200 active:bg-gray-300 p-2 rounded-lg font-semibold" @click="undoDeletePost">Undo</button>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { processSlotOutlet } from '@vue/compiler-core';
import { Builder } from 'builder-pattern';
import { formatTime } from '~/libraries/utilities';
// import { Comment } from '~/shared/comment.interface';
import { Like, Post } from '~/shared/post.interface';
import { displayReaction } from '~/support/dictionary';

const _postComment = usePost<any>('comment')

const _postLike = usePost<any>('post')

const _patch = usePatch('post')

const _delete = useDelete('post')

const _displayReaction = computed(() => displayReaction[likeStatus.value])

const props = defineProps<{ post: Post }>()

const { currentUser } = usePrincipal()

const content = ref<any>({
    text: ''
})
const isHiddenState = ref<boolean>(false)

const likeStatus = ref<any>(props.post.interact.like?.find(l => l.user.userId == currentUser.value.userId)?.action || '')

const likeArray = computed(() => props.post.interact.like)

const reactionAction = computed(() => [
    likeArray.value.filter(l => l.action == 'like'),
    likeArray.value.filter(l => l.action == 'heart'),
    likeArray.value.filter(l => l.action == 'wow'),
    likeArray.value.filter(l => l.action == 'haha'),
    likeArray.value.filter(l => l.action == 'sad'),
    likeArray.value.filter(l => l.action == 'angry'),
].sort((a, b) => b.length - a.length))

const handleLike = async (action: "like" | "heart" | "haha" | "wow" | "sad" | "angry") => {
    if (likeStatus.value != action) likeStatus.value = action
}

watch(() => likeStatus.value, async (value) => {
    const _like = Builder<Like>().action(value).user(currentUser.value).build()
    const index = likeArray.value.findIndex(l => l.user.userId == currentUser.value.userId)
    if (!value) {
        likeArray.value.splice(index, 1)
    }
    else {
        index == -1 ? likeArray.value.push(_like) : likeArray.value[index].action = value
    }
    await _postLike('like', props.post.id, _like)
})

const handleShare = () => {
    // console.log('share')
}

const comments = computed<any[]>(() => props.post.comments)

const handleSubmit = async () => {
    const _ = Builder<any>().content(content.value).postId(props.post.id).build()
    const comment = await _postComment(_)
    comments.value.unshift(comment)
    content.value.text = ''
}

const deletePost = async () => {
    await _delete(props.post.id)
    isHiddenState.value = true
}

const undoDeletePost = async () => {
    await _patch('undo', props.post.id)
    isHiddenState.value = false
}
</script>

<style scoped>
.reaction-container:hover>.reaction-item {
    @apply visible -top-12;
    @apply transition-all delay-300;
}

.reaction-item>div:hover>span {
    @apply block
}
</style>