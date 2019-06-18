<template lang="pug">
    q-page
        .row.justify-center
            .col-lg-6.col-xs-12.col-sm-12
                q-infinite-scroll(@load="onLoadProductos" :offset="250")
                    .row
                        .col-lg-12.col-md-12.col-sm-12.col-xs-12(v-for="demanda in demandas")
                            w-demanda-card(:demanda="demanda")
                        .col-12.text-center(v-show="filter.is_all")
                            .text-h5.q-my-md.text-primary No hay más resultados
                    template(v-slot:loading)
                        .row.justify-center.q-my-md
                            q-spinner-ball(color="primary" size="40px")
</template>
<script>
import { QInfiniteScroll, QSpinnerBall } from 'quasar'
import WDemandaCard from '../../components/DemandaCard'
import gql from 'graphql-tag';
export default {
    components: { WDemandaCard, QInfiniteScroll, QSpinnerBall },
    data: () => ({
        filter: {
            is_all: false,
            offset: 0,
            limit: 4
        },
        demandas: []
    }),
    methods: {
        async demandasQuery(){
            return this.$apollo.query({
                query: gql`query getDemanda($offset: Int, $limit: Int){
                    demandas(offset: $offset, limit: $limit){
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
                variables: {
                    limit:            this.filter.limit,
                    offset:           this.filter.offset,
                }
            })
        },
        onLoadProductos (index, done) {
            this.filter.offset = this.demandas.length
            this.demandasQuery().then( (r) => {
                if(r.data.demandas.length > 0){
                    console.log('Obtenido', r.data.demandas);
                    r.data.demandas.forEach(demanda => {
                        this.demandas.push( demanda)
                    });
                    done()
                }else{
                    this.filter.is_all = true
                }
            }).catch(e => { this.$q.notify({message: 'Error obteniendo datos, compruebe su conexión a internet'}) })
        },
    }
}
</script>
<style>

</style>
