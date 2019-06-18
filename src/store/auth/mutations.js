
export const login = (state, auth) => {
    // localStorage.setItem('auth', JSON.stringify(auth))
    console.log('Asignando auth ...');
    
    state.info = auth
    state.is_auth = true
    state.token = auth.auth_token.access_token
    console.log('Asignado', state);
    
}/*
export function someMutation (state) {
}
*/

export const logout = (state) => {
    console.log('Cerrando sesion desde store');
    
    console.log(state);
    state.info = null
    state.is_auth = false
    state.token = null
    console.log(state);

    
}
