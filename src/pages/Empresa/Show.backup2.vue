<template lang="pug">
    q-page
        .doc-container
            .row.justify-center
                .col-lg-10.col-12
                    .row.q-col-gutter-xs.q-mt-md
                        .col-xl-3.col-lg-3.col-md-12.col-sm-12.col-xs-12
                            w-card-empresa(:empresa="empresa")
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
import { QAvatar, QTabs, QTab, QTabPanel, QTabPanels, QPageSticky  } from 'quasar'
import gql from 'graphql-tag'
import WCardOferta from '../../components/ProductoCard.vue'
import WCardDemanda from '../../components/DemandaCard.vue'
import WCardEmpresa from '../../components/CardEmpresa.vue'
export default {
    components: { QAvatar, QTabs, QTab, QTabPanel, QTabPanels, WCardOferta, WCardDemanda, QPageSticky , WCardEmpresa},
    created (){
        console.log(this.$route.params.id);
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
            query: gql`query getEmpresa($id_empresa: ID){
                empresa(id: $id_empresa){
                    id
                    razon_social
                    url_imagen
                    telefono
                    direccion
                    email
                }
            }`,
            variables () {
                return {
                    id_empresa: parseInt(this.$route.params.id) 
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
