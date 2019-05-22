
export const login = (state, auth) => {
    // localStorage.setItem('auth', JSON.stringify(auth))
    console.log('Asignando auth ...');
    
    state.info = auth
    state.is_auth = true
    state.token = auth.auth_token.access_token
}/*
export function someMutation (state) {
}
*/

export const logout = (state) => {
    state.info = []
    state.is_auth = false
    state.token = null
}
