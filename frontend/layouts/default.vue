<template>
    <div class="w-full">
        <template v-if="access">
            <header-default></header-default>
            <slot />
        </template>

        <template v-else>
            <sign-in></sign-in>
        </template>
    </div>
</template>

<script setup lang="ts">

const auth = useAuthentication()

const access = computed(() => auth.value.authenticated)

</script>