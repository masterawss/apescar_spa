<template lang="pug">
    q-card.q-ma-sm.smooth-shadow(unelevate :class="{ 'bg-grey-2': !demanda.is_disponible }" )
        q-card-section
            q-item(v-if="isAuth && !hide_empresa" clickable v-ripple @click="$router.push({name: 'empresa.show', params: { id: demanda.empresa.id } })")
                q-item-section(avatar)
                    q-avatar
                        img(:src="demanda.url_imagen")
                q-item-section {{ demanda.empresa.razon_social }}

                q-item-section(side top)
                    q-item-label(caption) {{ demanda.created_at }}

            strong {{ demanda.titulo }}
            p {{ demanda.descripcion }}
            
            .row.text-grey
                .col-6
                    q-icon(name="date_range")
                    span &nbsp {{ demanda.fecha }}
                .col-6
                    q-icon(name="all_inbox")
                    span &nbsp {{ demanda.cantidad }}  {{ demanda.unidad.descripcion }}

            div(v-if="isAuth && demanda.is_disponible")
                q-input(v-model="text" label="Respuesta" autogrow)
                q-btn.q-mt-sm(label="Enviar" @click="enviarRespuesta" color="secondary")
</template>

<script>

import { QCard, QCardSection, QItemSection, QAvatar, QInput } from 'quasar'
export default {
    components: { QCard, QCardSection, QItemSection, QAvatar, QInput },
    props: ['demanda', 'hide_empresa'],
    data: () => ({
        text: ''
    }),
    methods: {
        enviarRespuesta(){
            this.$q.notify({
                color: 'primary',
                message: 'Enviado correctamente'
            })
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

</style>
