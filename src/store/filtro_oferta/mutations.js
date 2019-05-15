/*
export function someMutation (state) {
}
*/

export const updateEspecies = (state, especies) => {
    state.especies = especies
}

export const updateCategorias = (state, categorias) => {
    state.categorias = categorias
}

export const updateTextBuscar = (state, texto) => {
    state.text_buscar = texto
}

