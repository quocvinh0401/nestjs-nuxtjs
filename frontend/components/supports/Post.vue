<template>
    <div class="bg-white px-4 py-3 rounded-lg shadow-sm">
        <!-- header -->
        <div class="flex justify-between mb-4">
            <div class="flex space-x-3">
                <avatar/>
                <div>
                    <h3 class="text-md font-semibold">Le Quoc Vinh</h3>
                    <p class="text-sm text-gray-500">1d</p>
                </div>
            </div>
            <div>
                <div class="p-2 hover:bg-gray-default rounded-full cursor-pointer">
                    <icon name="ic:outline-clear" size="20"/>
                </div>
            </div>
        </div>

        <!-- content -->
        <div class="mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima neque commodi itaque accusamus, temporibus excepturi, vero eum necessitatibus quo similique maiores vel autem quia quae aut accusantium quidem iure recusandae!
        </div>

        <!-- interact number -->
        <div class="flex justify-between text-gray-600">
            <div class="flex space-x-1 items-center">
                <icon name="uiw:like-o" size="20"/>
                <p>2</p>
            </div>
            <div>9 comments</div>
        </div>

        <!-- interact action -->
        <div class="grid grid-cols-3 gap-2 py-1 border-y my-3">
            <div class="flex space-x-2 items-center justify-center py-2 rounded-lg text-gray-600 hover:bg-gray-default cursor-pointer">
                <icon name="uiw:like-o" size="22"/>
                <span>Like</span>
            </div>
            <div class="flex space-x-2 items-center justify-center py-2 rounded-lg text-gray-600 hover:bg-gray-default cursor-pointer">
                <icon name="fluent:comment-20-regular" size="22"/>
                <span>Comment</span>
            </div>
            <div class="flex space-x-2 items-center justify-center py-2 rounded-lg text-gray-600 hover:bg-gray-default cursor-pointer">
                <icon name="icon-park-outline:share-two" size="22"/>
                <span>Share</span>
            </div>
        </div>

        <!-- comment -->
        <div class="grid gap-4">
            <div class="flex space-x-1">
                <avatar/>
                <input type="text" class="flex-1 py-2 px-3 bg-gray-default rounded-full outline-none" placeholder="Write a comment...">
            </div>
            <comment></comment>
            <comment></comment>
        </div>
    </div>
</template>