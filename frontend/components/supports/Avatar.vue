<template>
    <img class="w-10 h-10 rounded-full object-cover" :src="image"/>
</template>

<script setup lang="ts">
const props = defineProps({
    image: String
})

const image = computed<string>(() => props.image || '/images/avatar-default.jpg')
</script>
