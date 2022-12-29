import { Builder } from "builder-pattern"
import { Authentication } from "~/libraries/client.type"
import { User } from "~/shared/user.interface"
import { DeepReadonly, Ref } from '@vue/runtime-dom'

export const useAuthentication = (a?: Authentication) => useState<Authentication>('authenticationState', () => (a || { authenticated: false }))


type Principal = {
    authentication: DeepReadonly<Ref<Authentication>>,
    authenticationCookie: any,
    currentUser: Ref<User>,
    login: (_: Pick<Authentication, 'currentUser' | 'jwt' >) => void,
    logout: () => void,
    reset: () => void,
}

export const usePrincipal = (): Principal => {
    const authenticationCookie = useCookie<Authentication>('authenticationCookie', { path: '/', default: () => ({ authenticated: false }) })
    const authentication = useAuthentication(authenticationCookie.value!)

    const currentUser = useState<User>('currentUser')

    const login = (_authentication: Pick<Authentication, 'currentUser' | 'jwt'>) => {
        currentUser.value = _authentication.currentUser as User
        const _currentUser: Partial<User> = { login: _authentication.currentUser?.login }
        authentication.value = { ..._authentication, authenticated: true }
        authenticationCookie.value = { authenticated: true, jwt: _authentication.jwt, currentUser: _currentUser }
    }

    const logout = () => {
        authenticationCookie.value = authentication.value = { authenticated: false }
        useRouter().push('/')
    }

    const reset = () => {
        authenticationCookie.value = authentication.value = { authenticated: false }
    }


    return { authentication: readonly(authentication), currentUser, login, logout, reset, authenticationCookie }
}

