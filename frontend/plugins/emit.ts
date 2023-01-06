import mitt from "~/libraries/mitt"

const emitter = mitt()

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('bus', {
        $on: emitter.on,
        $off: emitter.off,
        $emit: emitter.emit
    })
})