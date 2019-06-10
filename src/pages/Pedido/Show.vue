<template lang="pug">
    q-page
        .doc-container
            .row.justify-center.q-my-md
                .col-lg-8.col-12
                    .row.q-col-gutter-md
                        .col-lg-2.col-md-2.col-sm-12
                            q-list(bordered separator)
                                q-item(clickable v-ripple @click="panel = 'enviados'")
                                    q-item-section Enviados
                                q-item(clickable v-ripple @click="panel = 'recibidos'")
                                    q-item-section Recibidos
                        
                        .col-lg-8.col-md-10.col-sm-12
                            q-tab-panels(v-model="panel" animated transition-prev="jump-up" transition-next="jump-down" class="shadow-2 rounded-borders")
                                q-tab-panel(name="enviados")
                                    w-pedidos-enviados-section

                                q-tab-panel(name="recibidos")
                                    w-pedidos-recibidos-section
</template>

<script>
import { QTabs, QTab, QTabPanels, QTabPanel, QSeparator } from 'quasar'

import WPedidosEnviadosSection from '../../components/PedidosEnviadosSection'
import WPedidosRecibidosSection from '../../components/PedidosRecibidosSection'

export default {
    components: { QTabs, QTab, QTabPanels, QTabPanel, QSeparator, WPedidosEnviadosSection, WPedidosRecibidosSection },
    data: () => ({
        tab: 'enviados',
        panel: 'enviados',
    }),
    
}
</script>

<style>

</style>
