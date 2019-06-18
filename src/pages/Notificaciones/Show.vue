<template lang="pug">
    q-page
        .doc-container
            .row.justify-center
                .col-lg-6.col-md-8.col-sm-12.col-xs-12
                    q-card.q-mt-md
                        q-card-section
                            .text-h5
                            q-list( class="rounded-borders" v-if="!loading" )
                                q-item-label(header) Notificaciones 
                                div(:class="{ 'bg-grey-2': notificacion.read_at == null }" v-for="notificacion in notificaciones" :key="notificacion.id")
                                    w-notificacion-nuevo-pedido(v-if="notificacion.type == 'App.Notifications.NuevoContacto' " :notificacion="notificacion" )
                                    w-notificacion-autorizar-empresa(v-else-if="notificacion.type == 'App.Notifications.AutorizarEmpresa'" :notificacion="notificacion")
                                    //- w-notificacion
                                    
</template>

<script>
// import { QAvatar } from 'quasar'
import gql from 'graphql-tag';
// import { response } from 'express';

import WNotificacionNuevoPedido from '../../components/NotificacionNuevoPedido'
import WNotificacionAutorizarEmpresa from '../../components/NotificacionAutorizarEmpresa'

export default {
    components: { WNotificacionNuevoPedido, WNotificacionAutorizarEmpresa },
    created () {
        this.$apollo.query({
            query:  gql`{
                    notificaciones{
                        id
                        data
                        read_at
                        created_at
                        type
                    }
                }`
            
        }).then(response => {
            response.data.notificaciones.forEach(element => {
                element.data = typeof element.data !== 'object' ? JSON.parse(element.data) : element.data
            });
            console.log('NOTIFICACIONES OBTENIDAS: ', response.data.notificaciones);
            
            this.notificaciones = response.data.notificaciones
            this.loading = false
        }).catch(e => {
            console.log('Error', e);
            this.loading = false
        })
    },
    data: () => ({
        loading: true,
        notificaciones: []
    }),
}
</script>

<style>

</style>
