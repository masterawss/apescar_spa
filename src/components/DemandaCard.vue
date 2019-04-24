<template lang="pug">
    q-card.q-ma-sm.smooth-shadow(unelevate)
        q-card-section
            q-item(clickable v-ripple)
                q-item-section(avatar)
                    q-avatar
                        img(src="https://cdn.quasar-framework.org/img/boy-avatar.png")
                q-item-section Nombre de la empresa 

                q-item-section(side top)
                    q-item-label(caption) Hace 5 horas

            strong Titulo de la publicacion de demanda
            p
                | ada sda sdasd asd asdasd asd asdasda sd sdfsdfgs dfgdfg dfg dfg sdfg dfg sdfg sdfg fd 
            
            .row.text-grey
                .col-6
                    q-icon(name="date_range")
                    span &nbsp Fecha de entrega
                .col-6
                    q-icon(name="all_inbox")
                    span &nbsp Volumen


            q-input(v-model="text" label="Respuesta" autogrow)
            q-btn.q-mt-sm(label="Enviar" @click="enviarRespuesta" color="secondary")
</template>

<script>

import { QCard, QCardSection, QItemSection, QAvatar, QInput } from 'quasar'
export default {
    components: { QCard, QCardSection, QItemSection, QAvatar, QInput },
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
    }
}
</script>

<style>

</style>
