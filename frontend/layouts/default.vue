<template>
    <div class="w-full">
        <template v-if="access">
            <header-default></header-default>
            <div class="flex justify-between space-x-2 relative pr-1">
                <!-- left side -->
                <navigation-default></navigation-default>
                <!-- middle -->
                <div class="flex-1 flex justify-center">
                    <slot />
                </div>

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