<template>
    <div class="w-fit h-fit">
        <Icon :icon="props.name" :width="size" :height="size" />
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        default: 16
    }
})
</script>