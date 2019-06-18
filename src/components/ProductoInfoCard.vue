<template lang="pug">
    q-card
        q-card-section
            q-item(clickable v-ripple v-if="producto" @click="$router.push({ name: 'empresa.show', params: { id: producto.empresa.id } })")
                q-item-section(avatar)
                    q-avatar
                        img(:src="producto.empresa.url_imagen")
                q-item-section {{ producto.empresa.razon_social }}
            .row
                .col-lg-6.col-md-6.col-sm-6.col-xs-12
                    q-img(:src="producto.path_imagen")
                .col-lg-6.col-md-6.col-sm-6.col-xs-12.q-px-md.q-mt-md
                    strong.text-h6 {{ producto.titulo }}
                    p
                        | {{ producto.descripcion }}
                    strong.text-blue {{ producto.precio }} soles &nbsp
                    span.text-grey / {{ producto.unidad.descripcion }}
                    
                    br
                    q-btn.q-my-lg(v-if="producto.path_ficha_tecnica !== ''" label="Descargar ficha técnica" type="a" target="_blank" :href="producto.path_ficha_tecnica" icon="arrow_downward" color="secondary" flat)
                    .q-py-md.text-red(v-else) 
                        strong No cuenta con ficha técnica
                    br
                    div(v-if="producto.empresa.id !== $store.state.auth.info.empresa.id")
                        strong Realizar pedido
                        q-input(v-model="form.mensaje" label="Mensaje")
                        .row.q-col-gutter-sm
                            .col-lg-4.col-12
                                q-input(v-model="form.cantidad" type="number" label="Cantidad")
                            .col-lg-4.col-12
                                q-select(v-model="form.unidad" :options="unidades" label="Unidad" 
                                    option-value="id" option-label="descripcion")
                            .col-lg-4.col-12
                                q-input(v-model="form.fecha_entrega" type="date" label="Fecha de entrega")
                        q-btn.q-my-md.full-width(label="Pedir" :loading="loading" @click="realizarPedido" color="secondary")
                    div(v-else)
                        q-btn(label="Editar publicación" color="primary" @click="$router.push({name: 'oferta.edit' , params: { id: producto.id } })")

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
        loading: false,
        form: {
            mensaje: null,
            cantidad: null,
            unidad: null,
            fecha_entrega: null
        },
    }),
    props: ['producto'],
    methods: {
        realizarPedido(){
            this.loading = true
            this.$apollo.mutate({
                mutation: gql`mutation realizarPedidoOferta($id_publicacion: Float, $mensaje: String, $cantidad: Float, $unidad: Float, $fecha_entrega: Date){
                    realizarPedidoOferta(id_publicacion: $id_publicacion, mensaje: $mensaje, cantidad: $cantidad, id_unidad: $unidad, fecha_entrega: $fecha_entrega){
                        id
                    }
                }`,
                variables: {
                    id_publicacion: this.producto.id,
                    mensaje:    this.form.mensaje,
                    cantidad:       this.form.cantidad,
                    unidad:         this.form.unidad.id,
                    fecha_entrega:  this.form.fecha_entrega
                }
            }).then(response => {
                console.log('Respuesta', response)
                this.loading = false
                this.$q.notify({color: 'green', message: 'Se ha realizado el pedido.'})
                
            }).catch(e => {
                console.log('Error', e);
                
                this.$q.notify({color: 'red', message: 'No se pudo realizar el pedido, compruebe su conexión a internet.'})
                this.loading = false
            })
            console.log(this.form);
        }
    }
}
</script>
