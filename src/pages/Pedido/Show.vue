<template lang="pug">
    q-page
        .doc-container
            .row.justify-center
                .col-lg-9.col-12
                    q-card.q-mt-md
                        q-tabs(
                        v-model="tab"
                        dense
                        class="text-grey"
                        active-color="primary"
                        indicator-color="primary"
                        align="justify"
                        narrow-indicator)
                            q-tab(name="enviados" label="Enviados")
                            q-tab(name="recibidos" label="Recibidos")

                        q-separator

                        q-tab-panels(v-model="tab" animated)
                            q-tab-panel(name="enviados")
                                span.text-h6 Enviados
                                //- q-space
                                q-toggle.q-ml-lg(v-model="enviados.solo_aceptados" label="Solo aceptados")
                                br
                                q-list(bordered separator)
                                    .row.q-pa-md
                                        .col-4
                                            strong Publicación:
                                            br
                                            | Titulo
                                            br
                                            strong Precio:
                                        .col-4
                                            strong Cliente: 
                                            | Razón social
                                            br
                                            strong Mensaje: 
                                            | asasdasd
                                        .col-4
                                            q-btn(label="Aceptar" color="blue")
                                            q-btn(label="Cancelar" color="red" flat)
                            q-tab-panel(name="recibidos")
                                span.text-h6 Recibidos
                                q-toggle.q-ml-lg(v-model="recibidos.solo_aceptados" label="Solo aceptados")
                                br
                                | Lorem ipsum dolor sit amet consectetur adipisicing elit.
</template>

<script>
import { QTabs, QTab, QTabPanels, QTabPanel, QSeparator, QToggle } from 'quasar'
import gql from 'graphql-tag';
export default {
    components: { QTabs, QTab, QTabPanels, QTabPanel, QSeparator, QToggle },
    data: () => ({
        tab: 'enviados',
        enviados: {
            solo_aceptados: true
        },
        recibidos: {
            solo_aceptados: true
        }
    }),
    apollo: {
        pedidos: {
            query: gql`query getPedidos{
                pedidos{
                    id
                }
            }`
        }
    }
}
</script>

<style>

</style>
