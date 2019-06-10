<template lang="pug">
    q-page
        .row.justify-center
            .col-lg-6.col-xs-12.col-sm-12
                q-infinite-scroll(@load="onLoadProductos" :offset="250")
                    .row
                        .col-lg-12.col-md-12.col-sm-12.col-xs-12(v-for="demanda in demandas")
                            w-demanda-card(:demanda="demanda")
</template>
<script>
import { QInfiniteScroll } from 'quasar'
import WDemandaCard from '../../components/DemandaCard'
import gql from 'graphql-tag';
export default {
    components: { WDemandaCard, QInfiniteScroll },
    data: () => ({
        count: 4,
        cantidad: 4
    }),
    apollo: {
        demandas: {
            query (){
                return gql`query getDemanda($count: Int){
                    demandas(count: $count){
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
            variables (){
                return {
                    count: this.count
                }
            }
        },
    },
    methods: {
        onLoadProductos (index, done) {
            console.log('asd');
            if (!this.$apolloData.loading) {
                this.count += this.cantidad
            }
            done()
        },
    }
}
</script>
<style>

</style>
