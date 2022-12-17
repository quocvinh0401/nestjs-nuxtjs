<template>
    <teleport to="body">
        <div class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-20">
            <div class="z-10 bg-white shadow-xl rounded-lg">
                <div class="flex space-x-2 justify-between p-4 border-b">
                    <h3 class="font-semibold text-3xl">{{ title }}</h3>
                    <button class="p-2 rounded-full hover:bg-gray-200" @click="emits('close')">
                        <icon name="ic:baseline-clear" size="22" />
                    </button>
                </div>
                <div class="p-4">
                    <slot />
                </div>
            </div>
            <div class="absolute top-0 left-0 w-full h-full bg-white opacity-60"></div>
        </div>
    </teleport>
</template>

<script setup lang="ts">
const props = defineProps({ title: { type: String, required: true } })
const emits = defineEmits(['close'])
</script>
