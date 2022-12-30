export default defineNuxtRouteMiddleware((to, from) => {
    const authentication = useAuthentication()

    if (!authentication.value.authenticated && to.fullPath != '/') return navigateTo({path: '/'})
})