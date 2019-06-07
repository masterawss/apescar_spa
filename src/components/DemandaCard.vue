<template lang="pug">
    q-card.card-demanda.q-ma-sm.smooth-shadow(unelevate :class="{ 'bg-grey-2': !demanda.is_disponible }" )
        q-card-section
            q-item(v-if="isAuth" )
                q-item-section(avatar)
                    q-avatar
                        img(:src="demanda.url_imagen")
                q-item-section(clickable v-ripple @click="$router.push({name: 'empresa.show', params: { id: demanda.empresa.id } })") {{ demanda.empresa.razon_social }}

                q-item-section(side top)
                    q-item-label(caption) {{ demanda.created_at }}
                    q-btn(flat round icon="more_vert")
                        q-menu
                            q-list(style="min-width: 100px")
                                q-item(clickable v-close-popup @click="$router.push({name: 'demanda.edit', params: { id: demanda.id } })")
                                    q-item-section Editar
                                //- q-item(clickable v-close-popup @click="")
                                //-     q-item-section Desactivar
                                //- q-item(clickable v-close-popup @click="$router.")
                                //-     q-item-section Eliminar
            strong {{ demanda.titulo }}
            p {{ demanda.descripcion }}
            
            .row.text-grey
                .col-6
                    q-icon(name="date_range")
                    span &nbsp {{ demanda.fecha }}
                .col-6
                    q-icon(name="all_inbox")
                    span &nbsp {{ demanda.cantidad }}  {{ demanda.unidad.descripcion }}

            div(v-if="isAuth && demanda.is_disponible && demanda.empresa.id !== $store.state.auth.info.empresa.id")
                q-input(v-model="text" label="Respuesta" autogrow)
                q-btn.q-mt-sm(label="Enviar" @click="enviarRespuesta" color="secondary")
</template>

<script>

import { QCard, QCardSection, QItemSection, QAvatar, QInput, QMenu } from 'quasar'
export default {
    components: { QCard, QCardSection, QItemSection, QAvatar, QInput, QMenu },
    props: ['demanda', 'hide_empresa'],
    data: () => ({
        text: ''
    }),
    methods: {
        enviarRespuesta(){
            this.$q.notify({ color: 'primary', message: 'Enviado correctamente' })
        }
    },
    computed: {
        isAuth(){
            return this.$store.state.auth.is_auth
        }
    }
}
</script>

<style>
    .card-demanda:hover{
        -webkit-box-shadow: 0px -1px 28px -1px rgba(0,0,0,0.2);
        -moz-box-shadow: 0px -1px 28px -1px rgba(0,0,0,0.2);
        box-shadow: 0px -1px 28px -1px rgba(0,0,0,0.2);
    }
</style>
