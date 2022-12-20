<template>
    <div class="max-w-[22.5rem] min-w-[17.5rem] flex-1 basis-[22.5rem] box-border p-2 hidden xl:block sticky top-[69px] h-[calc(100vh-69px)] overflow-hidden hover:overflow-y-auto">
        <card :user="currentUser"></card>
    </div>
</template>

<script setup lang="ts">
const { currentUser } = usePrincipal()
</script>