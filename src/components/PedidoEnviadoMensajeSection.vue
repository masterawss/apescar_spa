<template lang="pug">
    q-card.smooth-shadow
        q-card-section
            strong Fecha:
            br
            | {{ pedido.created_at }}
            br
            br
            strong Mensaje: 
            br
            | {{ pedido.mensaje_interesado }}
            br
            w-chip-pedido-estado(:estado="pedido.estado")

            div.q-mt-md(v-if="pedido.estado.descripcion == 'Sin confirmar'")
                q-btn( @click="eliminarPedido(pedido.id)" label="Eliminar" icon="close" color="red" dense flat)
</template>

<script>
import WChipPedidoEstado from './ChipPedidoEstado'
import gql from 'graphql-tag';

export default {
    props: ['pedido'],
    components: {WChipPedidoEstado},
    methods: {
        eliminarPedido (){
            this.$q.dialog({
                title: '¿Está seguro de eliminar?',
                message: 'El pedido se cancelará.',
                cancel: 'Cancelar'
            }).onOk( () => {
                this.$apollo.mutate({
                    mutation: gql`mutation accionarPedido($id: ID, $accion: String){
                        accionarPedido(accion: $accion, id: $id){
                            id
                            descripcion
                        }
                    }`,
                    variables: {
                        id: this.pedido.id,
                        accion: 'eliminar'
                    }
                }).then(response => {
                    console.log('Respuesta', response)
                    this.pedido.estado = response.data.accionarPedido
                    this.loading = false
                    this.$q.notify({color: 'green', message: 'Se ha realizado el pedido.'})
                }).catch(e => {
                    console.log('Error', e);
                    this.$q.notify({color: 'red', message: 'No se pudo realizar el pedido, compruebe su conexión a internet.'})
                    this.loading = false
                })
            })
        }
    }
}
</script>

<style>

</style>
