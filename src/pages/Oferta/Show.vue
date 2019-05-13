<template lang="pug">
    q-page
        .doc-container
            .row.justify-center
                .col-lg-9.col-12
                    w-producto-info(:producto="publicacion")
                    br
                    h5 Tambien te puede interesar
                    .row
                        .col-12.col-lg-3.col-md-3(v-for="oferta in ofertas")
                            w-producto-card(:producto="oferta")
                    //- br
                    //- span.q-pt-lg.text-subtitle1 Tambien te puede interesar
                    //- .row
                    //-     .col-3(v-for="i in 4")
                    //-         w-producto-card(:producto="producto_prueba")
</template>
<style>

</style>

<script>
import { QCard, QCardSection } from 'quasar'

import gql from 'graphql-tag'

import WProductoCard from '../../components/ProductoCard'
import WProductoInfo from '../../components/ProductoInfoCard'

export default {
    created (){
        this.id = this.$route.params.id
    },
    apollo:{
        publicacion:{
            query: gql`query ProductoGet ($id: ID) {
                publicacion (id: $id){
                    id
                    id_especie
                    titulo
                    descripcion
                    path_imagen
                    precio
                    empresa{
                        id
                        razon_social
                        url_imagen
                    }
                    unidad{
                        id
                        descripcion
                    }
                }
            }`,
            variables(){
                return{
                    id: this.id
                }
            }
        },
        ofertas:{
            query: gql`query OfertasRecomendadosGet{
                ofertas(random: 4){
                    id
                    titulo
                    descripcion
                    path_imagen
                    precio
                    empresa{
                        id
                        razon_social
                        url_imagen
                    }
                    unidad{
                        id
                        descripcion
                    }
                }
            }`,
        }
        
    },
    components: { QCard, QCardSection, WProductoInfo, WProductoCard},
    data: () => ({
        id: null,
        mensaje: 'Hola Anthony Will Solsol Soplin, poke eres feito?'
    })
}
</script>
