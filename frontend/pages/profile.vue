<template>
    <div>
        <!-- top -->
        <div>Upload file</div>
        <input type="file" @change="uploadFile" />
    </div>
    <img src="/images/emoji-facebook.gif" alt="">
</template>

<script setup lang="ts">
const uploadFile = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    console.log(formData)
}
</script>