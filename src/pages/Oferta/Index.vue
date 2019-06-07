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
        q-infinite-scroll(@load="onLoadProductos" :offset="250" @stop="completed")
          .row
            .col-12.flex.flex-center.q-py-xl(v-if="$apollo.queries.ofertas.loading")
                q-spinner-ball(size="5em" color="primary")
            .col-12.flex.flex-center.q-py-lg(v-else-if="$apollo.queries.ofertas.error" class="error apollo")
                | A ocurrido un error
            .col-lg-3.col-md-4.col-xs-12.col-sm-6(v-for="producto in ofertas" :key="producto.id")
              w-producto-card(:producto="producto")

          //- template(v-show="$apolloData.loading")
          //-   div.row.justify-center.q-my-md
          //-     q-spinner-dots(color="primary" size="40px")
</template>

<style>
</style>

<script>
import WFiltro from '../../components/FiltroCard'
import WProductoCard from '../../components/ProductoCard'
import WProductoInfoCard from '../../components/ProductoInfoCard'
import {QCard, QCardSection,QInput, QInfiniteScroll, QSpinnerDots, QDialog, QSpinnerBall} from 'quasar'

import gql from 'graphql-tag'

export default {
  name: 'PageIndex',
  components: {WFiltro,WProductoCard,WProductoInfoCard, QInput, QInfiniteScroll, QSpinnerDots, QDialog, QSpinnerBall},
  apollo: {
    ofertas: {
      query(){
        return gql`query getOfertas($count: Int, $filtroEspecie: [Int], $filtroCategoria: [Int], $buscar: String ){
            ofertas(count: $count, filterEspecie: $filtroEspecie, filterCategoria: $filtroCategoria, search: $buscar ){
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
          }`
      },
      variables (){
        return {
          count:            this.count,
          filtroEspecie:    this.$store.state.filtro_oferta.especies,
          filtroCategoria:  this.$store.state.filtro_oferta.categorias,
          buscar:           this.$store.state.filtro_oferta.text_buscar
        }
      },
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
    text: '',
    count: 8,
    cantidad: 8,
    completed: true
  }),
  methods: {
    onLoadProductos (index, done) {
      if (!this.$apolloData.loading) {
        this.count += this.cantidad
      }
      done()
    },
    limpiarText(){
      this.$store.commit('filtro_oferta/updateTextBuscar', '')
    }
  }
}
</script>
