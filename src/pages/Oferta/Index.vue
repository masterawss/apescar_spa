<template lang="pug">
  q-page
    .bg-primary.q-pa-md.row.items-start
      .col-3
      .col-12.col-md-8
        q-input(dark dense standout v-model="text_buscar"  )
          template(v-slot:append)
            q-icon(v-if="text_buscar === ''" name="search")
            q-icon(v-else name="clear" class="cursor-pointer" @click="limpiarText")
      
    .row.q-mx-lg-xl.q-px-lg-xl
      .col-lg-2.col-12
        w-filtro

      .col-lg-10.col-sm-12
          //- q-infinite-scroll(@load="onLoadProductos" :offset="250" @stop="completed")
          .row
            
            //- .col-12.flex.flex-center.q-py-lg(v-else-if="$apollo.queries.ofertas.error" class="error apollo")
            //-     | A ocurrido un error
            .col-lg-3.col-md-4.col-xs-12.col-sm-6(v-for="producto, index in ofertas" :key="index")
              w-producto-card.smooth-shadow.q-ma-xs(:producto="producto")
            .col-12.text-center(v-if="filter.is_all")
              .text-h5.q-my-md.text-primary No hay más resultados
            .col-12.flex.flex-center.q-py-xl(v-if="$apollo.queries.ofertas.loading")
              q-spinner-ball(size="5em" color="primary")
            .col-12.text-center(v-else)
              q-btn.q-my-md(label="Ver más" color="secondary" rounded unelevated outline @click="showMore")
          //- template(v-slot:loading)
              .row.justify-center.q-my-md
                q-spinner-ball(color="primary" size="40px")
          //- template(v-show="$apolloData.loading")
          //-   div.row.justify-center.q-my-md
          //-     q-spinner-dots(color="primary" size="40px")
</template>

<style>
</style>

<script>
import WFiltro from '../../components/FiltroCard'
import WProductoCard from '../../components/ProductoCard'
import {QCard, QCardSection,QInput, QInfiniteScroll, QSpinnerDots, QDialog, QSpinnerBall} from 'quasar'

import gql from 'graphql-tag'

export default {
  name: 'PageIndex',
  components: {WFiltro,WProductoCard, QInput, QInfiniteScroll, QSpinnerDots, QDialog, QSpinnerBall},
  created(){
  },
  apollo: {
    ofertas: {
      query: gql`query getOfertas($offset: Int, $limit: Int, $filtroEspecie: [Int], $filtroCategoria: [Int], $buscar: String ){
          ofertas(offset: $offset, limit: $limit, filterEspecie: $filtroEspecie, filterCategoria: $filtroCategoria, search: $buscar ){
            id
            titulo
            path_imagen
            descripcion
            precio
            empresa{
              id
              razon_social
              url_imagen
            },
            unidad{
              id
              descripcion
            }
          }
        }`,
        variables()  {
          return {
            limit:            this.filter.limit,
            offset:           this.filter.offset,
            filtroEspecie:    this.$store.state.filtro_oferta.especies,
            filtroCategoria:  this.$store.state.filtro_oferta.categorias,
            buscar:           this.$store.state.filtro_oferta.text_buscar
          }
        }
    }
},
  methods: {
    showMore(){
      this.filter.limit += this.filter.count
    },
    // async ofertasQuery(){
    //   return this.$apollo.query({
    //     query: gql`query getOfertas($offset: Int, $limit: Int, $filtroEspecie: [Int], $filtroCategoria: [Int], $buscar: String ){
    //         ofertas(offset: $offset, limit: $limit, filterEspecie: $filtroEspecie, filterCategoria: $filtroCategoria, search: $buscar ){
    //           id
    //           titulo
    //           path_imagen
    //           descripcion
    //           precio
    //           empresa{
    //             id
    //             razon_social
    //             url_imagen
    //           },
    //           unidad{
    //             id
    //             descripcion
    //           }
    //         }
    //       }`,
    //       variables: {
    //         limit:            this.filter.limit,
    //         offset:           this.filter.offset,
    //         filtroEspecie:    this.$store.state.filtro_oferta.especies,
    //         filtroCategoria:  this.$store.state.filtro_oferta.categorias,
    //         buscar:           this.$store.state.filtro_oferta.text_buscar
    //       }
    //   })
    // },
    // onLoadProductos (index, done) {
    //   this.filter.offset = this.ofertas.length
    //   this.ofertasQuery().then( (r) => {
    //     if(r.data.ofertas.length > 0){
    //       console.log('Obtenido', r.data.ofertas);
    //       r.data.ofertas.forEach(oferta => {
    //         this.ofertas.push( oferta)
    //       });
    //       done()
    //     }else{
    //       this.filter.is_all = true
    //     }
    //   }).catch(e => { this.$q.notify({message: 'Error obteniendo datos, compruebe su conexión a internet'}) })
    // },
    limpiarText(){
      this.$store.commit('filtro_oferta/updateTextBuscar', '')
    }
  },
  computed: {
    text_buscar: {
      get () {
          return this.$store.state.filtro_oferta.text_buscar
      },
      set (val) {
          this.$store.commit('filtro_oferta/updateTextBuscar', val)
      }
    },
  },
  data: () => ({
    filter: {
      is_all: false,
      offset: 0,
      limit: 8,
      count: 8
    },
    text: '',
    completed: true,
    // ofertas: []
  }),
}
</script>
