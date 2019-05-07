<template lang="pug">
    q-page
        div
            .row.justify-center.q-py-lg.bg-landing
                .col-lg-9.col-12
                    .row.items-center
                        .col-lg-8.col-md-8.col-sm-12.text-white.q-px-md
                            h3 Impulsando la industria pesquera en la región de San Martín
                            h5 El mejor lugar para ofertar y comprar tus productos.
                            // q-btn.q-px-md(size="md" label="Ingresar" rounded color="secondary")
                        .col-lg-4.col-md-4.col-12(v-if="!isAuth")
                            w-card-login
            .row.justify-center.q-py-md
                .col-lg-9.col-12
                    strong.text-h6 Últimas ofertas
                    .row
                        .col-lg-3.col-md-3.col-12(v-for="i in 4")
                            w-producto-card(:producto="producto")
                    br
                    strong.text-h6 Últimas demandas
                    .row
                        .col-lg-6.col-md-6.col-12(v-for="i in 2")
                            w-demanda-card
            .row.bg-grey-1.justify-center
                .col-lg-9.col-12
                    .row
                        .col-4
                            q-card.q-ma-xl.smooth-shadow(unelevate)
                                q-card-section
                                    | Encuentra tu producto
                        .col-4
                            q-card.q-ma-xl.smooth-shadow(unelevate)
                                q-card-section
                                    | Articulación Segura
                        .col-4
                            q-card.q-ma-xl.smooth-shadow(unelevate)
                                q-card-section
                                    | Negocia con Seguridad
</template>
<style>
    .bg-landing{
        /* background: url('../statics/bg_landing.jpg'); */
        background: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)),
            url('../statics/bg_landing.jpg');
        background-size: cover;
        background-position: center;
        /* background-color: rgba(32, 123, 34, 0.8); */
    }
</style>

<script>
import WProductoCard from '../components/ProductoCard'
import WDemandaCard from '../components/DemandaCard'
import WCardLogin from '../components/CardLogin'
import { QCard, QCardSection, QInput } from 'quasar'
export default {
    components: { QCard, QCardSection, QInput, WProductoCard, WDemandaCard, WCardLogin},
    data: () => ({
        producto: {
            id: 1,
            empresa: {
            nombre: 'Culqui SAC',
            foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
            },
            foto: 'https://www.thespruceeats.com/thmb/Q5rf13VgpuvFVdQqEuVV1jaIERw=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-163137259-5b7ef8f4c9e77c0024ce934d.jpg',
            descripcion: 'Nuggets de Tilapia',
            precio: '35.00',
            unidad: 'bolsa'
        },
    }),
    computed: {
        isAuth(){
            return this.$store.state.auth.info.jwt !== undefined
        }
    }
}
</script>