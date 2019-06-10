<template lang="pug">
    q-card.smooth-shadow
        q-card-section
            strong Cliente: 
            | {{ pedido.empresa.razon_social }}
            br
            strong Mensaje: 
            | {{ pedido.mensaje_interesado }}
            div.q-mt-md(v-if="!pedido.estado || pedido.estado.descripcion == 'Sin confirmar'")
                q-btn( @click="accionar('aceptar')" :loading="loading" label="Aceptar" rounded color="blue")
                q-btn( @click="accionar('rechazar')" :loading="loading" label="Rechazar" color="red" flat)
            div(v-else)
                w-chip-pedido-estado(:estado="pedido.estado")
</template>

<script>
import gql from 'graphql-tag';
import {QChip} from 'quasar'
import WChipPedidoEstado from '../components/ChipPedidoEstado'
export default {
    props: ['pedido'],
    components: {QChip, WChipPedidoEstado},
    data: () => ({
        loading: false
    }),
    methods: {
        accionar(estado){
            console.log('Accionando', estado);
            
            this.$apollo.mutate({
                mutation: gql`mutation accionarPedido($id: ID, $accion: String){
                    accionarPedido(accion: $accion, id: $id){
                        id
                        descripcion
                    }
                }`,
                variables: {
                    id: this.pedido.id,
                    accion: estado
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
        }
    }
}
</script>

<style>

</style>
