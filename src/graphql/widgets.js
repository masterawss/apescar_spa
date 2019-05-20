import { gql } from "graphql-tag";

export const especies = gql`query{
    especies{
        id
        descripcion
    }
}`

export const unidades = gql`query{
    unidades{
        id
        descripcion
    }
}`

export const categorias = gql`query{
    categorias{
        id
        descripcion
    }
}`
