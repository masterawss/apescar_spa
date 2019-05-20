<template lang="pug">
    q-page
        .doc-container
            .row.justify-center
                .col-lg-9.col-12
                    q-card.smooth-shadow.q-my-md
                        q-card-section
                            .row
                                .col-auto
                                    q-avatar.smooth-shadow.q-mr-lg(size="90px")
                                        img(:src=" empresa.url_imagen")
                                .col-8
                                    .text-h5 {{ empresa.razon_social }}
                                    //- p {{ empresa.url_imagen }}
                                    
                                    .row
                                        .col-md-3.col-xs-6
                                            | Número
                                        .col-md-3.col-xs-6
                                            | Dirección
                                        .col-md-3.col-xs-6
                                            | Correo electrónico
                    
                    q-tabs(v-model="tab" align="justify" narrow-indicator class="q-mb-lg")
                        q-tab(name="ofertas" label="Ofertas")
                        q-tab(name="demandas" label="Demandas")
                    q-tab-panels(v-model="tab")
                        q-tab-panel(name="ofertas")
                            .row
                                .col-lg-3.col-md-4.col-6(v-for="producto in ofertas" :key="producto.id")
                                    w-card-oferta(:producto="producto" :hide_empresa="true")
                            q-page-sticky(position="bottom" :offset="[0, 20]")
                                q-btn(rounded label="Subir oferta" @click="$router.push({name: 'oferta.create'})" icon="add" color="teal")
                        q-tab-panel(name="demandas")
                            .row
                                .col-lg-6.col-md-6.col-12(v-for="demanda in demandas" :key="demanda.id")
                                    w-card-demanda(:demanda="demanda" :hide_empresa="true")
                            q-page-sticky(position="bottom" :offset="[0, 20]")
                                q-btn(rounded label="Subir demanda" @click="$router.push({name: 'demanda.create'})" icon="add" color="blue")
</template>

<script>
import { QAvatar, QTabs, QTab, QTabPanel, QTabPanels, QPageSticky  } from 'quasar'
import gql from 'graphql-tag'
import WCardOferta from '../../components/ProductoCard.vue'
import WCardDemanda from '../../components/DemandaCard.vue'
export default {
    components: { QAvatar, QTabs, QTab, QTabPanel, QTabPanels, WCardOferta, WCardDemanda, QPageSticky },
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
