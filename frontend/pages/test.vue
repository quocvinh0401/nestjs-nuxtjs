<template>
    <div>test</div>
    <button @click="testPost">Click</button>
    <div>{{ _ }}</div>
</template>

<script setup lang="ts">
import { Post } from '~/shared/post.interface';

const _ = ref()

const _post = usePost<Post>('test1')

const testPost = async () => {
    const res = await _post()
    console.log(res)
    _.value = res
}
</script>