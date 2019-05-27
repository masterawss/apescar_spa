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
                        q-tab-panels(v-model="panel" animated transition-prev="jump-up" transition-next="jump-down" class="shadow-2 rounded-borders")
                            q-tab-panel(name="general")
                                w-form-usuario
                                    
                                w-form-empresa

                            q-tab-panel(name="suscripcion")
                                w-suscripciones
</template>

<script>
import { QTabPanels, QTabPanel } from 'quasar'
import WFormUsuario from '../../components/EditFormUsuario'
import WFormEmpresa from '../../components/EditFormEmpresa'
import WSuscripciones from '../../components/SuscripcionesList'

export default {
    components: {QTabPanels, QTabPanel, WFormUsuario, WFormEmpresa, WSuscripciones},
    data: () => ({
        panel: 'general',
    })
}
</script>

<style>

</style>
