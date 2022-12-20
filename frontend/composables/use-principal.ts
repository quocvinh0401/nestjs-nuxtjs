import { Authentication } from '~/libraries/client.type';
import { User } from '~/shared/user.interface';
import { DeepReadonly, Ref } from 'vue'

export const useAuthentication = (a?: Authentication) => useState<Authentication>('authentication-state', () => (a || { authenticated: false }));

type Principal = {
    currentUser: Ref<User>,
    authentication: DeepReadonly<Ref<Authentication>>,
    login: (_: Pick<Authentication, 'currentUser' | 'jwt'>) => void,
    logout: () => void
}

export const usePrincipal = (): Principal => {
    const authenticationCookie = useCookie<Authentication>('authentication-cookie', { path: '/', default: () => ({ authenticated: false }) })
    // authenticationCookie.value = {authenticated: false, jwt: 'test'}
    // console.log('cookie',authenticationCookie.value!)
    const authentication = useAuthentication(authenticationCookie.value!)
    // console.log('authen',authentication.value)

    const currentUser = useState<User>('currentUser')

    const login = (_authentication: Pick<Authentication, 'currentUser' | 'jwt'>) => {
        currentUser.value = _authentication.currentUser as User
        const _currentUser: Partial<User> = { login: _authentication.currentUser?.login }
        authentication.value = { ..._authentication, authenticated: true }
        authenticationCookie.value = { authenticated: true, jwt: _authentication.jwt, currentUser: _currentUser}

    }

    const logout = () => {
        authentication.value = authenticationCookie.value = { authenticated: false }
    }

    return { currentUser, login, logout, authentication: readonly(authentication) }
}
