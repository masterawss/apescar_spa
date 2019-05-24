<template lang="pug">
    q-page
        .row.justify-center
            .col-lg-9.col-xl-9.col-md-12.col-sm-12.col-xs-12
                .row.q-mt-md.q-col-gutter-md
                    .col-lg-3.col-xl-3.col-md-3.col-sm-12.col-xs-12
                        q-list(bordered separator)
                            q-item(clickable v-ripple @click="panel = 'general'")
                                q-item-section Datos generales
                            q-item(clickable v-ripple @click="panel = 'suscripcion'")
                                q-item-section Suscripción
                    .col
                        q-tab-panels(v-model="panel" animated class="shadow-2 rounded-borders")
                            q-tab-panel(name="general")
                                .text-h5.q-mb-md Datos generales
                                
                                | Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                .text-h5.q-mb-md Datos de empresa
                                | Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            q-tab-panel(name="suscripcion")
                                .text-h5.q-mb-md Estado de suscripción
                                | Lorem ipsum dolor sit amet consectetur adipisicing elit.

                                q-table(
                                    title="Historial de suscripciones"
                                    :data="data"
                                    :columns="columns"
                                    row-key="id"
                                )
</template>

<script>
import { QTabPanels, QTabPanel, QTable, QTh, QTr, QTd  } from 'quasar'
export default {
    components: {QTabPanels, QTabPanel, QTable, QTh, QTr, QTd},
    data: () => ({
        panel: 'general',
        data: [

        ],
        columns: [
            { name: 'codigo', label:"Código", field: 'codigo', sortable: true },
            { name: 'fecha', label:"Fecha", field: 'fecha', sortable: true },
            { name: 'monto', label:"Monto", field: 'monto', sortable: true }
        ]
    })
}
</script>

<style>

</style>
