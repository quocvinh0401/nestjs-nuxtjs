<template>
    <div class="flex items-center space-x-3 hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
        <avatar :image="user?.avatar" />
        <div class="font-medium">{{ `${user?.lastName} ${user?.firstName}` }}</div>
    </div>
</template>

<script setup lang="ts">
import { User } from '~/shared/user.interface'

const props = defineProps<{ user: User }>()
</script>