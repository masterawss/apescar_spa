<template lang="pug">
  q-page
    .bg-primary.q-pa-md.q-gutter-md.row.items-start
      .col-3

      .col-9.col-md-8
        q-input(dark dense standout v-model="text"  )
          template(v-slot:append)
            q-icon(v-if="text === ''" name="search")
            q-icon(v-else name="clear" class="cursor-pointer" @click="text = ''")
      
    .row.q-mx-lg-xl.q-px-lg-xl
      .col-2
        w-filtro

      .col-10
        q-infinite-scroll(@load="onLoadProductos" :offset="250")
          .row
            .col-12.col-lg-3.col-sm-12(v-for="producto in productos" :key="producto.id")
              w-producto-card(:producto="producto")

          template(v-slot:loading)
            div.row.justify-center.q-my-md
              q-spinner-dots(color="primary" size="40px")
</template>

<style>
</style>

<script>
import WFiltro from '../../components/FiltroCard'
import WProductoCard from '../../components/ProductoCard'
import WProductoInfoCard from '../../components/ProductoInfoCard'
import {QCard, QCardSection,QInput, QInfiniteScroll, QSpinnerDots, QDialog} from 'quasar'
export default {
  name: 'PageIndex',
  components: {WFiltro,WProductoCard,WProductoInfoCard, QInput, QInfiniteScroll, QSpinnerDots, QDialog},
  data: () => ({
    text: '',
    productos: [
      {
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
      {
        id: 2,
        empresa: {
          nombre: 'Culqui SAC',
          foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
        },
        foto: 'https://cdn.shopify.com/s/files/1/0986/7550/products/CSTay-072398_1024x1024.jpg?v=1442565948',
        descripcion: 'Nuggets de Paiche',
        precio: '28.00',
        unidad: 'bolsa'
      },
      {
        id: 3,
        empresa: {
          nombre: 'Anthony SAC',
          foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
        },
        foto: 'http://1.bp.blogspot.com/_sVnBl8EYbXg/S8Tw5FruQXI/AAAAAAAAAKI/9LExx7ken24/s1600/Amon+Ha+Laesh.jpg',
        descripcion: 'Ahumado de Tilapia',
        precio: '15.00',
        unidad: 'bolsa'
      },
      {
        id: 4,
        empresa: {
          nombre: 'Anthony SAC',
          foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
        },
        foto: 'https://static.vix.com/es/sites/default/files/styles/large/public/imj/elgranchef/F/Filetes-de-pescados-rapidos-1.jpg?itok=PAF4cIZ4',
        descripcion: 'Filete de Tilapia',
        precio: '15.00',
        unidad: 'bolsa'
      },
      {
        id: 5,
        empresa: {
          nombre: 'Culqui SAC',
          foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
        },
        foto: 'https://www.thespruceeats.com/thmb/Q5rf13VgpuvFVdQqEuVV1jaIERw=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-163137259-5b7ef8f4c9e77c0024ce934d.jpg',
        descripcion: 'Nuggets de Tilapia',
        precio: '35.00',
        unidad: 'bolsa'
      },
      {
        id: 6,
        empresa: {
          nombre: 'Culqui SAC',
          foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
        },
        foto: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2017/04/pescadoempanizado.jpg',
        descripcion: 'Nuggets de Paiche',
        precio: '28.00',
        unidad: 'bolsa'
      },
      {
        id: 7,
        empresa: {
          nombre: 'Anthony SAC',
          foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
        },
        foto: 'https://gastronomiaycia.republica.com/wp-content/uploads/2013/09/hamburguesas_pescado2.jpg',
        descripcion: 'Ahumado de Tilapia',
        precio: '15.00',
        unidad: 'bolsa'
      },
      {
        id: 8,
        empresa: {
          nombre: 'Anthony SAC',
          foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
        },
        foto: 'https://t1.rg.ltmcdn.com/es/images/7/3/8/img_filete_de_pescado_al_jengibre_56837_600.jpg',
        descripcion: 'Filete de Tilapia',
        precio: '15.00',
        unidad: 'bolsa'
      },
      {
        id: 9,
        empresa: {
          nombre: 'Culqui SAC',
          foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
        },
        foto: 'https://www.thespruceeats.com/thmb/Q5rf13VgpuvFVdQqEuVV1jaIERw=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-163137259-5b7ef8f4c9e77c0024ce934d.jpg',
        descripcion: 'Nuggets de Tilapia',
        precio: '35.00',
        unidad: 'bolsa'
      },
      {
        id: 10,
        empresa: {
          nombre: 'Culqui SAC',
          foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
        },
        foto: 'https://cdn.shopify.com/s/files/1/0986/7550/products/CSTay-072398_1024x1024.jpg?v=1442565948',
        descripcion: 'Nuggets de Paiche',
        precio: '28.00',
        unidad: 'bolsa'
      },
      {
        id: 11,
        empresa: {
          nombre: 'Anthony SAC',
          foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
        },
        foto: 'http://1.bp.blogspot.com/_sVnBl8EYbXg/S8Tw5FruQXI/AAAAAAAAAKI/9LExx7ken24/s1600/Amon+Ha+Laesh.jpg',
        descripcion: 'Ahumado de Tilapia',
        precio: '15.00',
        unidad: 'bolsa'
      },
      {
        id: 12,
        empresa: {
          nombre: 'Anthony SAC',
          foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
        },
        foto: 'https://static.vix.com/es/sites/default/files/styles/large/public/imj/elgranchef/F/Filetes-de-pescados-rapidos-1.jpg?itok=PAF4cIZ4',
        descripcion: 'Filete de Tilapia',
        precio: '15.00',
        unidad: 'bolsa'
      },
      {
        id: 13,
        empresa: {
          nombre: 'Culqui SAC',
          foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
        },
        foto: 'https://www.thespruceeats.com/thmb/Q5rf13VgpuvFVdQqEuVV1jaIERw=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-163137259-5b7ef8f4c9e77c0024ce934d.jpg',
        descripcion: 'Nuggets de Tilapia',
        precio: '35.00',
        unidad: 'bolsa'
      },
      {
        id: 14,
        empresa: {
          nombre: 'Culqui SAC',
          foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
        },
        foto: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2017/04/pescadoempanizado.jpg',
        descripcion: 'Nuggets de Paiche',
        precio: '28.00',
        unidad: 'bolsa'
      },
      {
        id: 15,
        empresa: {
          nombre: 'Anthony SAC',
          foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
        },
        foto: 'https://gastronomiaycia.republica.com/wp-content/uploads/2013/09/hamburguesas_pescado2.jpg',
        descripcion: 'Ahumado de Tilapia',
        precio: '15.00',
        unidad: 'bolsa'
      },
      {
        id: 16,
        empresa: {
          nombre: 'Anthony SAC',
          foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
        },
        foto: 'https://t1.rg.ltmcdn.com/es/images/7/3/8/img_filete_de_pescado_al_jengibre_56837_600.jpg',
        descripcion: 'Filete de Tilapia',
        precio: '15.00',
        unidad: 'bolsa'
      },
    ]
  }),
  methods: {
    onLoadProductos (index, done) {
      setTimeout(() => {
        if (this.productos) {
          this.productos.push(
            {
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
            {
              id: 2,
              empresa: {
                nombre: 'Culqui SAC',
                foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
              },
              foto: 'https://cdn.shopify.com/s/files/1/0986/7550/products/CSTay-072398_1024x1024.jpg?v=1442565948',
              descripcion: 'Nuggets de Paiche',
              precio: '28.00',
              unidad: 'bolsa'
            },
            {
              id: 3,
              empresa: {
                nombre: 'Anthony SAC',
                foto: 'https://cdn.quasar-framework.org/img/avatar5.jpg',
              },
              foto: 'http://1.bp.blogspot.com/_sVnBl8EYbXg/S8Tw5FruQXI/AAAAAAAAAKI/9LExx7ken24/s1600/Amon+Ha+Laesh.jpg',
              descripcion: 'Ahumado de Tilapia',
              precio: '15.00',
              unidad: 'bolsa'
            },
          )
          done()
        }
      }, 2000)
    }
  }
}
</script>

<style>
  .card-filter{
    margin-top: -55px;
  }
</style>
