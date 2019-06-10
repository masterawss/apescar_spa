<template lang="pug">
    div
        span.text-h5 Pedidos recibidos
        q-toggle.q-ml-lg(v-model="filter.solo_aceptados" label="Solo aceptados")
        br
        q-list(bordered separator)
            .text-h6.q-pa-md Mis publicaciones
            div(v-for="pedido in pedidos_recibidos")
                .row.q-pa-sm.q-col-gutter-sm
                    .col-lg-6.col-md-6.col-sm-12.col-xs-12
                        w-producto-card(v-if="pedido.publicacion.tipo_publicacion.descripcion == 'Oferta'" :producto="pedido.publicacion")
                        w-demanda-card(v-else :demanda="pedido.publicacion" )
                    .col-lg-6.col-md-6.col-sm-12.col-xs-12
                        w-interesado-section(:pedido="pedido")
</template>

<script>
import { QToggle } from 'quasar'
import WInteresadoSection from './InteresadoSection'
import WProductoCard from './ProductoCard'
import WDemandaCard from '../components/DemandaCard'
import gql from 'graphql-tag';
export default {
    components: {QToggle, WInteresadoSection, WProductoCard, WDemandaCard},
    data: () => ({
        filter: {
            solo_aceptados: false
        }
    }),
    apollo: {
        pedidos_recibidos: {
            query: gql`query getPedidos{
                pedidos_recibidos{
                    id
                    mensaje_interesado
                    empresa{
                        id
                        razon_social
                    }
                    publicacion{
                        id
                        tipo_publicacion{
                            descripcion
                        }
                        path_imagen
                        titulo
                        descripcion
                        precio
                        unidad{
                            id
                            descripcion
                        }
                    }
                    estado{
                        id
                        descripcion
                    }
                }
            }`
        },
    }
}
</script>

<style>

</style>
