<template>
    <div>index....</div>
    {{data}}
</template>

<script setup lang="ts">
const {data} = useFetchWithCredentials('test')
</script>