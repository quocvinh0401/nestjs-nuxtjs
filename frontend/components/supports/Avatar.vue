<template>
    <div class="w-10 h-10 rounded-full bg-cover bg-center" :style="`background-image: url('${image}')`"></div>
</template>

<script setup lang="ts">
const props = defineProps({
    image: String
})

const image = computed<string>(() => props.image || 'https://i.pinimg.com/736x/75/df/bd/75dfbdf97dfee730f413ad347816da62.jpg')
</script>
