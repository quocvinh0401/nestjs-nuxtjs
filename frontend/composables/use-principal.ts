import { Authentication } from '~/libraries/client.type';
import { User } from '~/shared/user.interface';

export const useAuthentication = (a?: Authentication) => useState('authentication', () => (a || { authenticated: false }));

export const usePrincipal = () => {
    const authenticationCookie = useCookie<Authentication>('authenticationCookie', { path: '/', default: () => ({ authenticated: false }) })
    const authentication = useAuthentication(authenticationCookie.value!)
    

    const principal = useState<User>('principal')

    const login = (_authentication: Pick<Authentication, 'principal' | 'jwt'>) => {
        principal.value = _authentication.principal as User
        const _principal: Partial<User> = { login: _authentication.principal?.login }
        authentication.value = { ..._authentication, authenticated: true }
        authenticationCookie.value = { authenticated: true, jwt: _authentication.jwt, principal: _principal}
    }

    const logout = () => {
        authentication.value = authenticationCookie.value = { authenticated: false }
    }

    return { principal, login, logout, authentication: readonly(authentication), authenticationCookie }
}
