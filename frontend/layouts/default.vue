<template>
    <div class="w-full">
        <template v-if="access">
            <header-default></header-default>
            <div class="flex justify-between">
                <!-- left side -->
                <navigation-default></navigation-default>
                <!-- middle -->
                <slot />

                <!-- right side -->
                <contact-friend/>
            </div>
        </template>

        <template v-else>
            <sign-in></sign-in>
        </template>
    </div>
</template>

<script setup lang="ts">

const access = ref<boolean>()

onBeforeMount(() => {
    const _ = localStorage.getItem('user')
    if (_ && _.length > 0) {
        access.value = true
    } else access.value = false
})
    
</script>