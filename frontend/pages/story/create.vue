<template>
    <div class="grid grid-cols-[22.5rem_auto] h-screen">
        <!-- left -->
        <div class="bg-white shadow relative">
            <div class="flex items-center space-x-2 shadow px-3 py-[6px]">
                <button class="bg-gray-400 hover:bg-gray-500 p-2 rounded-full" @click="back">
                    <icon name="ic:outline-clear" size="24" class="text-white"/>
                </button>
                <nuxt-link to="/">
                    <img src="/images/logo.png" class="w-14 h-14 cursor-pointer">
                </nuxt-link>
            </div>

            <div class="p-3 shadow">
                <div class="flex justify-between items-center mb-3">
                    <div class="text-2xl font-bold">Your story</div>
                    <button class="p-2 button gray rounded-full">
                        <icon name="ant-design:setting-filled" size="24"/>
                    </button>
                </div>
                <div class="flex items-center space-x-2">
                    <avatar :image="currentUser?.avatar" class="!w-14 !h-14"/>
                    <span class="font-semibold text-lg">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</span>
                </div>
            </div>

            <div v-if="chooseCreate == 'photo_story'" class="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg m-2 cursor-pointer">
                <div class="p-2 rounded-full bg-gray-default">
                    <icon name="ph:text-aa-fill" size="24"/>
                </div>
                <div class="font-semibold">Add text</div>
            </div>

            <div v-else-if="chooseCreate == 'text_story'" class="p-3">
                <!-- text -->
                <textarea placeholder="Start typing" rows="7" class="w-full resize-none p-2 border rounded-lg outline-blue-500" v-model="content_text_story"></textarea>

                <!-- font -->
                <div class="relative flex items-center my-2">
                    <icon name="ph:text-aa-fill" size="24" class="absolute left-2"/>
                    <select name="font" id="font" class="w-full pl-10 pr-2 py-2 border rounded-lg outline-none">
                        <option value="simple">Simple</option>
                        <option value="clean">Clean</option>
                        <option value="visual">Visual</option>
                        <option value="fancy">Fancy</option>
                        <option value="headline">Headline</option>
                    </select>
                    <!-- <icon name=""/> -->
                </div>

                <!-- background -->
                <div class="border p-2 rounded-lg grid gap-2 mt-3">
                    <div>Background</div>
                    <div class="grid grid-cols-8 gap-1">
                        <template v-for="img in 16">
                            <button class="w-6 aspect-square rounded-full border overflow-hidden">
                                <img src="https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=2000" alt="" class="max-w-none object-cover"/>
                            </button>
                        </template>
                    </div>
                </div>
            </div>

            <div class="absolute bottom-0 w-full flex space-x-2 justify-center border-t p-2">
                <button class="font-semibold bg-gray-200 hover:bg-gray-300 active:bg-gray-400 flex-1 rounded-lg p-2">Discard</button>
                <button class="font-semibold blue flex-1 rounded-lg p-2 text-white" @click="submitStory">Share to Story</button>
            </div>
        </div>

        <!-- right -->
        <div class="flex items-center justify-center w-full">
            <div v-if="!chooseCreate" class="grid grid-cols-2 gap-6">
                <label class="bg-gradient-to-tr from-orange-600 to-yellow-400 px-8 py-28 rounded-lg cursor-pointer relative overflow-hidden">
                    <div class="flex flex-col items-center space-y-2">
                        <div class="p-3 bg-white shadow rounded-full w-fit">
                            <icon name="heroicons-solid:photograph" size="24"/>
                        </div>
                        <span class="text-sm font-semibold text-white">Create a Photo Story</span>
                    </div>
                    <div class="absolute top-0 left-0 w-full h-full hover:bg-black opacity-10 z-10"></div>
                    <input type="file" class="absolute invisible w-full h-full" @change="chooseAction">
                </label>
                <div class="bg-gradient-to-tr from-red-700 to-purple-700 px-8 py-28 rounded-lg cursor-pointer relative overflow-hidden"
                    @click="chooseAction('text_story')">
                    <div class="flex flex-col items-center space-y-2">
                        <div class="p-3 bg-white shadow rounded-full w-fit">
                            <icon name="ph:text-aa-fill" size="24"/>
                        </div>
                        <span class="text-sm font-semibold text-white">Create a Text Story</span>
                    </div>
                    <div class="absolute top-0 left-0 w-full h-full hover:bg-black opacity-10 z-10"></div>
                </div>
            </div>
            <div v-else class="bg-white shadow p-3 rounded-lg w-3/5 h-5/6 relative">
                <div>Preview</div>
                <div class="bg-black rounded-lg flex items-center justify-center absolute left-4 bottom-4 right-4 top-12 py-4">
                    <div v-if="chooseCreate == 'photo_story'" class="h-full flex flex-col space-y-2 items-center">
                        <div class="h-full aspect-[0.55] bg-red-300 rounded-lg border border-white flex justify-center items-center overflow-hidden" id="story">
                            <img :src="tempImage" alt="" class="w-full cursor-pointer" @click="isAdjustImage = true"
                            :style="{transform: `rotate(${adjustImage.rotate}deg)`, scale: `${adjustImage.scale}`}">
                        </div>
                        <div v-if="!isAdjustImage" class="text-white">Select photo to drop or rotate</div>
                        <div v-else class="flex items-center space-x-2 w-full">
                            <input type="range" class="w-full" v-model="adjustImage.scale" min="0.5" max="2" step="0.1">
                            <button class="flex items-center space-x-1 bg-gray-200 p-1 rounded-lg" @click="rotateImage">
                                <icon name="carbon:rotate-clockwise-alt" />
                                <span>Rotate</span>
                            </button>
                        </div>
                    </div>

                    <div v-else class="flex h-full rounded-lg overflow-hidden">
                        <div class="h-full aspect-[0.55] overflow-hidden relative flex items-center justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg" class="" alt="">
                            <div class="absolute text-red-500 font-semibold text-xl w-4/5 text-center break-words">{{ content_text_story || 'Start typing' }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { Builder } from 'builder-pattern';
import { getAverageColor } from '~/libraries/utilities';
import { Story as iStory } from '~/shared/story.interface';

definePageMeta({layout: 'story'})

const { currentUser } = usePrincipal()
const router = useRouter()
const _postStory = usePost('story')

const chooseCreate = ref('')
const tempImage = ref('')
const isAdjustImage = ref<boolean>(false)
const adjustImage = ref({
    scale: 1,
    rotate: 0
})
const content_text_story = ref<string>('')

const chooseAction = async (data: string | Event) => {
    if (typeof data == 'string') {
        chooseCreate.value = 'text_story'
    } else {
        chooseCreate.value = 'photo_story'
        tempImage.value = URL.createObjectURL(data.target?.files[0])
        const img = new Image()
        img.src = tempImage.value
        // const rgb = await getAverageColor(img)
    }

}

const back = () => {
    router.go(-1)
}

const rotateImage = () => {
    adjustImage.value.rotate = (adjustImage.value.rotate + 90) % 360
    console.log(adjustImage.value.rotate)
}

const submitStory = async () => {
    const body = document.getElementById('story')?.outerHTML
    const story = Builder<iStory>().body(body!).build()
    await _postStory({body: body})
}
</script>