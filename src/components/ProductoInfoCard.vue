<template lang="pug">
    q-card
        q-card-section
            q-item(clickable v-ripple v-if="producto" @click="$router.push({ name: 'empresa.show', params: { id: producto.empresa.id } })")
                q-item-section(avatar)
                    q-avatar
                        img(:src="producto.empresa.url_imagen")
                q-item-section {{ producto.empresa.razon_social }}
            .row
                .col-lg-6.col-md-6.col-12
                    q-img(:src="producto.path_imagen")
                .col-lg-6.col-md-6.col-12.q-px-md.q-mt-md
                    strong.text-h6 {{ producto.titulo }}
                    p
                        | {{ producto.descripcion }}
                    strong.text-blue {{ producto.precio }} soles &nbsp
                    span.text-grey / {{ producto.unidad.descripcion }}
                    br
                    br
                    q-btn(label="Descargar ficha técnica" icon="arrow_downward" color="secondary" flat)
                    br
                    br
                    strong Realizar pedido
                    q-input(v-model="form.descripcion" label="Descripcion")
                    .row
                        .col-lg-4.col-12.q-pr-md
                            q-input(v-model="form.cantidad" type="number" label="Cantidad")
                        .col-lg-4.col-12.q-pr-md
                            q-select(v-model="form.unidad" :options="unidades" label="Unidad" 
                                option-value="id" option-label="descripcion")
                        .col-lg-4.col-12
                            q-input(v-model="form.fecha_entrega" type="date" label="Fecha de entrega")
                    q-btn.q-my-md.full-width(label="Pedir" @click="realizarPedido" color="secondary")
            // q-img(src="https://www.thespruceeats.com/thmb/Q5rf13VgpuvFVdQqEuVV1jaIERw=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-163137259-5b7ef8f4c9e77c0024ce934d.jpg")
            // .row.q-pa-md
            //     .col-8
            //         strong Titulo
            //         p Lorem ipsum aoskdjsiadhf ljashfdjlsdhf sfbgajsdgfbajsdfgjasl gfkjasgf
            //     .col-4
            //         q-input(v-model="text" label="Descripcion")
            //         q-input(v-model="text" label="Cantidad")
            //         q-input(v-model="text" label="Unidad")
            //         q-input(v-model="text" label="Fecha de entrega")
            //         q-btn.q-my-md(label="Pedir" color="secondary")

</template>

<script>
import { QCard, QCardSection, QItemSection, QAvatar, QImg, QInput } from 'quasar'
import WProductoCard from './ProductoCard.vue'
import gql from 'graphql-tag';
export default {
    components: { QCard, QCardSection, QItemSection, QAvatar, QImg, QInput, WProductoCard },
    apollo: {
        unidades: gql`query{
            unidades{
                id
                descripcion
            }
        }
        `
    },
    data: () => ({
        text: '',
        form: {

        },
    }),
    props: ['producto'],
    methods: {
        realizarPedido(){
            console.log(this.form);
            
        }
    }
}
</script>
