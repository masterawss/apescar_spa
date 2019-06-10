<template lang="pug">
    q-page
        .doc-container
            .row.justify-center
                .col-lg-9.col-12
                    .flex.flex-center.q-py-lg(v-if="$apollo.queries.publicacion.loading")
                        q-spinner-ball(size="5em" color="primary")
                    div(v-else)
                        w-producto-info(:producto="publicacion")
                        //- .row
                        //-     .col-12
                        //-     .col-4
                        //-         w-list-pedidos(:pedidos="publicacion.pedidos")
                    br
                    h5 Tambien te puede interesar
                    .row
                        .col-12.col-lg-3.col-md-3(v-for="oferta in ofertas")
                            w-producto-card(:producto="oferta")
</template>
<style>

</style>

<script>
import { QSpinnerBall } from 'quasar'

import gql from 'graphql-tag'

import WProductoCard from '../../components/ProductoCard'
import WProductoInfo from '../../components/ProductoInfoCard'
import WListPedidos from '../../components/ListPedidos'

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
                    path_ficha_tecnica
                    empresa{
                        id
                        razon_social
                        url_imagen
                    }
                    unidad{
                        id
                        descripcion
                    }
                    pedidos{
                        empresa{
                            id
                            razon_social
                        }
                        mensaje_interesado
                        cantidad
                        created_at
                        fecha_esperada
                    }
                }
            }`,
            variables(){
                return{
                    id: parseInt(this.$route.params.id)
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
    components: { WProductoInfo, WProductoCard, QSpinnerBall, WListPedidos},
    data: () => ({
        id: null,
        mensaje: 'Hola Anthony Will Solsol Soplin, poke eres feito?'
    })
}
</script>
