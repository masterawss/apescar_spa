<template lang="pug">
    q-card
        q-card-section
            q-item(clickable v-ripple)
                q-item-section(avatar)
                    q-avatar
                        img(src="https://cdn.quasar-framework.org/img/boy-avatar.png")
                q-item-section Nombre de la empresa
            .row
                .col-6
                    q-img(src="https://www.thespruceeats.com/thmb/Q5rf13VgpuvFVdQqEuVV1jaIERw=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-163137259-5b7ef8f4c9e77c0024ce934d.jpg")
                .col-6.q-px-md
                    strong.text-h6 Nombre de producto
                    p
                        | asdad asd asda dsad ada dad asdasdkjns ljkbsfadlj hasfjdhjklhbbwjqefjs bflsadjfbgljdsgbj
                    strong.text-blue 43 soles &nbsp
                    span.text-grey / Unidad
                    br
                    br
                    q-btn(label="Descargar ficha técnica" icon="arrow_downward" color="secondary" flat)
                    br
                    br
                    strong Realizar pedido
                    q-input(v-model="text" label="Descripcion")
                    .row
                        .col-4.q-pr-md
                            q-input(v-model="form.cantidad" type="number" label="Cantidad")
                        .col-4.q-pr-md
                            q-input(v-model="form.unidad" label="Unidad")
                        .col-4
                            q-input(v-model="form.fecha_entrega" type="date" label="Fecha de entrega")
                    q-btn.q-my-md.full-width(label="Pedir" @click="realizarPedido" color="secondary")
            br
            span.q-pt-lg.text-subtitle1 Más de la empresa
            .row
                .col-3(v-for="i in 4")
                    w-producto-card(:producto="producto_prueba")
            br
            span.q-pt-lg.text-subtitle1 Tambien te puede interesar
            .row
                .col-3(v-for="i in 4")
                    w-producto-card(:producto="producto_prueba")
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
export default {
    components: { QCard, QCardSection, QItemSection, QAvatar, QImg, QInput, WProductoCard },
    data: () => ({
        text: '',
        form: {

        },
        producto_prueba: {
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
    }),
    props: ['producto'],
    methods: {
        realizarPedido(){
            console.log(this.form);
            
        }
    }
}
</script>
