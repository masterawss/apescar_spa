<template lang="pug">
    div
        span.text-h5 Pedidos enviados
        q-toggle.q-ml-lg(v-model="filter.solo_aceptados" label="Solo aceptados")
        br
        q-list(bordered separator)
            .text-h6.q-pa-md Publicaciones
            div(v-for="pedido in pedidos_enviados")
                .row.q-col-gutter-sm
                    .col-lg-6.col-md-6.col-sm-12.col-xs-12
                        w-producto-card(v-if="pedido.publicacion.tipo_publicacion.descripcion == 'Oferta'" :producto="pedido.publicacion" )
                        w-demanda-card(v-else :demanda="pedido.publicacion" )
                    .col-lg-6.col-md-6.col-sm-12.col-xs-12
                        w-pedido-enviado-mensaje-section(:pedido="pedido")
                hr
                        
</template>
<script>

import { QToggle, QChip } from 'quasar'
import WInteresadoSection from './InteresadoSection'
import WProductoCard from './ProductoCard'
import WDemandaCard from '../components/DemandaCard'
import WChipPedidoEstado from '../components/ChipPedidoEstado'

import WPedidoEnviadoMensajeSection from '../components/PedidoEnviadoMensajeSection'

import gql from 'graphql-tag';
export default {
    components: {QToggle,WInteresadoSection, WProductoCard, WDemandaCard, QChip,WChipPedidoEstado, WPedidoEnviadoMensajeSection},
    data: () => ({
        filter: {
            solo_aceptados: false
        }
    }),
    apollo: {
        pedidos_enviados: {
            query: gql`query getPedidos{
                pedidos_enviados{
                    id
                    mensaje_interesado
                    created_at
                    publicacion{
                        tipo_publicacion{
                            descripcion
                        }
                        id
                        precio
                        titulo
                        path_imagen
                        descripcion
                        empresa{
                            id
                            razon_social
                        }
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
    },
}
</script>
