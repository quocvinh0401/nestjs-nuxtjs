<template>
    <div class="w-10 h-10 rounded-full bg-cover bg-center" :style="`background-image: url('${image}')`"></div>
</template>

<script setup lang="ts">
const props = defineProps({
    image: String
})

const image = computed<string>(() => props.image || '/images/avatar-default.jpg')
</script>
