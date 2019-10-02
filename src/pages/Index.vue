<template lang="pug">
    q-page
        div
            .row.justify-center.q-py-xl.bg-landing
                .col-lg-8.col-12
                    .row.items-center
                        .col-lg-8.col-md-8.col-sm-12.text-white.q-px-md
                            .text-h4 
                                strong Impulsando la industria pesquera en la región de San Martín
                            .text-h5.q-mb-sm El mejor lugar para ofertar y comprar tus productos.
                            // q-btn.q-px-md(size="md" label="Ingresar" rounded color="secondary")
                        .col-lg-4.col-md-4.col-12(v-if="!isAuth")
                            w-card-login

            .row.justify-center.q-py-md
                .col-lg-8.col-12
                    strong.text-h6.q-ml-sm Últimas ofertas
                    q-btn( v-if="isAuth" flat color="secondary" @click="$router.push({name: 'oferta.index'})" label="Ver más")
                    .row.q-col-gutter-sm
                        .col-12.flex.flex-center(v-if="$apollo.queries.ofertas.loading")
                            q-spinner-ball(size="5em" color="primary")
                        div(v-else-if="$apollo.queries.ofertas.error" class="error apollo")
                            | A ocurrido un error
                        .col-lg-3.col-md-3.col-sm-6.col-xs-12( v-else v-for="oferta in ofertas")
                            w-producto-card(:producto="oferta")
                    br
                    strong.text-h6.q-ml-sm Últimas demandas
                    q-btn( v-if="isAuth" flat color="secondary" @click="$router.push({name: 'demanda.index'})" label="Ver más")
                    .row
                        .col-12.flex.flex-center(v-if="$apollo.queries.demandas.loading")
                            q-spinner-ball(size="5em" color="primary")
                        div(v-else-if="$apollo.queries.demandas.error" class="error apollo")
                            | A ocurrido un error
                        div(v-else class="result apollo")
                        .col-lg-6.col-md-6.col-12(v-for="demanda in demandas")
                            w-demanda-card(:demanda="demanda")

            .row.bg-grey-2.justify-center
                .col-lg-8.col-12
                    .row.justify-between.q-my-sm.q-col-gutter-sm.items-center
                        .col-xs-12.col-sm-4.col-md-4.col-lg-4
                            q-card.smooth-shadow(unelevate)
                                q-card-section.text-center.text-primary
                                    q-icon.q-my-md(name="find_in_page" size="50px")
                                    .text-h6 Encuentra tu producto
                        .col-xs-12.col-sm-4.col-md-4.col-lg-4
                            q-card.smooth-shadow(unelevate)
                                q-card-section.text-center.text-primary
                                    q-icon.q-my-md(name="find_replace" size="50px")
                                    .text-h6 Articulación Segura
                        .col-xs-12.col-sm-4.col-md-4.col-lg-4
                            q-card.smooth-shadow(unelevate)
                                q-card-section.text-center.text-primary
                                    q-icon.q-my-md(name="security" size="50px")
                                    .text-h6 Negocia con Seguridad
            .row.bg-gradient.justify-center
                .col-lg-8.col-12
                    w-card-contacto-cite.q-my-md
            
            .row.justify-center
                .col-lg-8.col-12
                    .row.items-center.justify-center
                        .col-lg-4.col-sm-12.text-center
                            img(max-width="100%" height="100px"  src="http://empleoymas.com/wp-content/uploads/2016/10/Ministerio-de-la-Produccion-300x156.png")
                        .col-lg-4.col-sm-12.text-center
                            img.q-mb-md(max-width="100%" height="100px"  src="https://i1.wp.com/www.itp.gob.pe/wp-content/uploads/2018/01/logo-itp2.png?fit=500%2C250&ssl=1")
                        .col-lg-4.col-sm-12.text-center
                            img.q-mb-md(max-width="100%" height="50" src="https://www.itp.gob.pe/wp-content/uploads/2018/03/CITEpesquero_amazonico_Ahuashiyacu.png")
            .row.justify-center.bg-black
                .col-6.text-center
                    q-btn.text-white( flat no-caps label="Términos y condiciones de uso" @click="$router.push({name: 'terminos'})")
                .col-6.text-center
                    q-btn.text-white( flat no-caps label="Políticas de Privacidad")
</template>
<style>
    .bg-landing{
        /* background: url('../statics/bg_landing.jpg'); */
        /* background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0,0,0,.5)), */
        background: linear-gradient(rgba(7, 119, 76, 0.5), rgba(4, 63, 141, 0.5)),
            url('../statics/bg_landing.jpg');
        background-size: cover;
        background-position: center;
        /* background-color: rgba(32, 123, 34, 0.8); */
    }
    .bg-gradient{
        background: linear-gradient(to right, rgba(94,185,255,1) 0%, rgba(3,237,182,1) 100%);
    }
</style>

<script>
import WProductoCard from '../components/ProductoCard'
import WDemandaCard from '../components/DemandaCard'
import WCardLogin from '../components/CardLogin'
import WCardContactoCite from '../components/CardContactoCite'
import { QCard, QCardSection, QInput, QSpinnerBall, QIcon } from 'quasar'
import gql from 'graphql-tag';
export default {
    components: { QCard, QCardSection, QInput, WProductoCard, WDemandaCard, WCardLogin, QSpinnerBall, WCardContactoCite, QIcon},
    apollo: {
        ofertas: gql`{
            ofertas(limit: 4){
                id
                id_especie
                titulo
                descripcion
                path_imagen
                precio
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
        }`,
        demandas: gql`{
            demandas(limit: 4){
                id
                titulo
                descripcion
                fecha
                created_at
                cantidad
                is_disponible
                empresa{
                    id
                    url_imagen
                    razon_social
                }
                unidad{
                    id
                    descripcion
                }
                especie{
                    id
                    descripcion
                }
                categoria{
                    id
                    descripcion
                }
            }
        }`
    },
    data: () => ({
        
    }),
    computed: {
        isAuth(){
            return this.$store.state.auth.is_auth
        }
    }
}
</script>