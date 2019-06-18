<template lang="pug">
    div
        span.text-h5 Pedidos enviados
        q-toggle.q-ml-lg(v-model="filter.solo_aceptados" label="Solo aceptados")
        br
        q-list(bordered separator)
            .text-h6.q-pa-md Publicaciones
            div(v-for="pedido in pedidos_enviados")
                .row
                    .col-lg-6.col-md-6.col-sm-6.col-xs-12
                        w-producto-card.no-shadow.q-mx-sm(v-if="pedido.publicacion.tipo_publicacion.descripcion == 'Oferta'" :producto="pedido.publicacion" :smaller="true" )
                        w-demanda-card(v-else :demanda="pedido.publicacion" )
                    .col-lg-6.col-md-6.col-sm-6.col-xs-12
                        w-pedido-enviado-mensaje-section.no-shadow(:pedido="pedido")
                q-separator
                        
</template>
<script>

import { QToggle, QChip, QSeparator } from 'quasar'
import WInteresadoSection from './InteresadoSection'
import WProductoCard from './ProductoCard'
import WDemandaCard from '../components/DemandaCard'
import WChipPedidoEstado from '../components/ChipPedidoEstado'

import WPedidoEnviadoMensajeSection from '../components/PedidoEnviadoMensajeSection'

import gql from 'graphql-tag';
export default {
    components: {QToggle,WInteresadoSection, WProductoCard, WDemandaCard, QChip,WChipPedidoEstado, WPedidoEnviadoMensajeSection, QSeparator},
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
                            url_imagen
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
