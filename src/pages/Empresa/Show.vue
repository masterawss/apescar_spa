<template lang="pug">
    q-page
        .doc-container
            .row.justify-center
                .col-lg-10.col-12
                    .row.q-mt-lg-md
                        .col-lg-3.col-12
                            w-card-empresa.no-shadow(:empresa="empresa")

                            //- q-card
                            //-     v-map( style="height:400px ; width:100% " :center="{lat: -6.514132, lng: -76.331565}" api-key="AIzaSyC44MgE45RAPUXYrQpaZVa_zqNA3ZJ0HE4" :zoom="13")
                            //-         v-marker(:position="{lat: -6.514132, lng: -76.331565}")
                        .col-lg-9.col-12
                            div(v-if="empresa.estado.descripcion == 'activado'")
                                q-tabs.q-mb-lg.text-secondary(v-model="tab" align="justify" narrow-indicator)
                                    q-tab(name="ofertas" label="Ofertas")
                                    q-tab(name="demandas" label="Demandas")
                                q-tab-panels(v-model="tab")
                                    q-tab-panel(name="ofertas")
                                        .row.q-col-gutter-sm
                                            .col-12(v-if="ofertas.length == 0")
                                                .text-center
                                                    .text-h5.text-center.q-mt-xl No tiene ninguna publicación de oferta
                                                    .span.text-grey Puede crear uno aquí.

                                            .col-lg-4.col-md-4.col-sm-6.col-xs-12( v-else v-for="producto in ofertas" :key="producto.id")
                                                w-card-oferta.smooth-shadow(:producto="producto"  :editable="true")
                                        q-page-sticky(v-if="empresa.id == $store.state.auth.info.empresa.id" position="bottom" :offset="[0, 20]")
                                            q-btn(rounded label="Subir oferta" @click="$router.push({name: 'oferta.create'})" icon="add" color="teal")

                                    q-tab-panel(name="demandas")
                                        .row
                                            .col-12(v-if="demandas.length == 0")
                                                .text-center
                                                    .text-h5.text-center.q-mt-xl No tiene ninguna publicación de demanda
                                                    .span.text-grey Puede crear uno aquí.
                                                    
                                            .col-lg-12.col-md-12.col-12(v-for="demanda in demandas" :key="demanda.id")
                                                w-card-demanda.smooth-shadow(:demanda="demanda" :hide_empresa="true")
                                        q-page-sticky(v-if="empresa.id == $store.state.auth.info.empresa.id" position="bottom" :offset="[0, 20]")
                                            q-btn(rounded label="Subir demanda" @click="$router.push({name: 'demanda.create'})" icon="add" color="blue")
                            div(v-else)
                                div(v-if="empresa.id == $store.state.auth.info.empresa.id")
                                    .text-center.q-mt-xl
                                        .text-h5 ¿Deseas ofertar productos?
                                        strong.text-grey Tu cuenta aún no ha sido habilitada para publicar productos.
                                        .text-grey.q-mt-md Si tiene consultas, puede contactarse con nosotros
                                        q-btn(label="aquí" color="primary" no-caps dense flat @click="$router.push({name: 'index'})")
                    //- .row.q-col-gutter-xs.q-mt-md
                        .col-xl-3.col-lg-3.col-md-12.col-sm-12.col-xs-12
                        .col-xl-9.col-lg-9.col-md-12.col-sm-12.col-xs-12
                            q-tabs.q-mb-lg.text-secondary(v-model="tab" align="justify" narrow-indicator)
                                q-tab(name="ofertas" label="Ofertas")
                                q-tab(name="demandas" label="Demandas")
                            q-tab-panels(v-model="tab")
                                q-tab-panel(name="ofertas")
                                    .row.q-col-gutter-md
                                        .col-12(v-if="ofertas.length == 0")
                                            .text-center
                                                .text-h5.text-center.q-mt-xl No tiene ninguna publicación de oferta
                                                .span.text-grey Puede crear uno aquí.

                                        .col-lg-4.col-md-4.col-sm-6.col-xs-12( v-else v-for="producto in ofertas" :key="producto.id")
                                            w-card-oferta(:producto="producto"  :editable="true")
                                    q-page-sticky(position="bottom" :offset="[0, 20]")
                                        q-btn(rounded label="Subir oferta" @click="$router.push({name: 'oferta.create'})" icon="add" color="teal")

                                q-tab-panel(name="demandas")
                                    .row
                                        .col-12(v-if="demandas.length == 0")
                                            .text-center
                                                .text-h5.text-center.q-mt-xl No tiene ninguna publicación de demanda
                                                .span.text-grey Puede crear uno aquí.
                                                
                                        .col-lg-12.col-md-12.col-12(v-for="demanda in demandas" :key="demanda.id")
                                            w-card-demanda(:demanda="demanda" :hide_empresa="true")
                                    q-page-sticky(position="bottom" :offset="[0, 20]")
                                        q-btn(rounded label="Subir demanda" @click="$router.push({name: 'demanda.create'})" icon="add" color="blue")
</template>

<script>
import { QAvatar, QTabs, QTab, QTabPanel, QTabPanels, QPageSticky, QImg,  } from 'quasar'
import gql from 'graphql-tag'
import WCardOferta from '../../components/ProductoCard.vue'
import WCardDemanda from '../../components/DemandaCard.vue'
import WCardEmpresa from '../../components/CardEmpresa.vue'
import  {VMarker, VMap} from 'v-maps'
export default {
    components: { QAvatar, QTabs, QTab, QTabPanel, QTabPanels, WCardOferta, WCardDemanda, QPageSticky , WCardEmpresa, QImg, VMarker, VMap},
    created (){
        console.log('HOLA -----------------------');
    },
    data: () => ({
        tab: 'ofertas'
    }),
    apollo: {
        ofertas: {
            query: gql`query getEmpresaOfertas($id_empresa: Int){
                ofertas(id_empresa: $id_empresa){
                    id
                    titulo
                    descripcion
                    precio
                    path_imagen
                    unidad{
                        id
                        descripcion
                    }
                }    
            }`,
            variables () {
                return {
                    id_empresa: parseInt(this.$route.params.id) 
                }
            }
        },
        empresa: {
            query: gql`query getEmpresa($id: ID){
                empresa(id: $id){
                    id
                    razon_social
                    url_imagen
                    telefono
                    direccion
                    email
                    id
                    estado{
                        id
                        descripcion
                    }
                }
            }`,
            variables () {
                return {
                    id: this.$route.params.id
                }
            }
        },
        demandas: {
            query: gql`query getDemanda($id_empresa: Int){
                demandas(id_empresa: $id_empresa){
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
            }`,
            variables () {
                return {
                    id_empresa: parseInt(this.$route.params.id) 
                }
            }
        }
    }
}
</script>
