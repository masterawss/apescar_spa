<template lang="pug">
    .q-my-lg
        .text-h5.q-mb-md Datos de empresa
        .flex.flex-center(v-if="$apollo.queries.empresaAuth.loading")
            q-spinner-ball.q-my-xl(size="5em" color="primary")
        div(v-else-if="$apollo.queries.empresaAuth.error")
            strong Error obteniendo datos
        div(v-else)
            q-input(label="RUC" v-model="empresaAuth.ruc" disable)
            q-input(label="Nombre" v-model="empresaAuth.razon_social")
            q-input(label="Descripción" v-model="empresaAuth.descripcion")
            q-input(label="Dirección" v-model="empresaAuth.direccion")
            q-input(label="Teléfono" v-model="empresaAuth.telefono")
            q-input(label="Correo electrónico" v-model="empresaAuth.email")
            q-btn.q-my-sm(label="Guardar" @click="guardar" color="secondary")
</template>

<script>
import gql from 'graphql-tag'
import {QSpinnerBall} from 'quasar'
export default {
    components: {QSpinnerBall},
    data: () => ({
        empresa: []
    }),
    methods: {
        guardar(){
            this.$apollo.mutate({
                mutation: gql`mutation empresaUpdateAuth(
                    $ruc: Float,
                    $razon_social: String,
                    $descripcion: String,
                    $direccion: String,
                    $telefono: String,
                    $email: String
                ){
                    empresaUpdateAuth(
                        ruc: $ruc,
                        razon_social: $razon_social,
                        descripcion: $descripcion,
                        direccion: $direccion,
                        telefono: $telefono,
                        email: $email
                    ){
                        id
                    }
                }`,
                variables: {
                    ruc: this.empresaAuth.ruc,
                    razon_social: this.empresaAuth.razon_social,
                    descripcion: this.empresaAuth.descripcion,
                    direccion: this.empresaAuth.direccion,
                    telefono: this.empresaAuth.telefono,
                    email: this.empresaAuth.email,
                }

            }).then(response => {

                this.$q.notify({message: 'Datos de empresa guardados correctamente.', color: 'green'})
            }).catch(e => {
                
                this.$q.notify({message: 'Problemas guardando datos de la empresa.', color: 'red'})
            })
        }
    },
    apollo: {
        empresaAuth: gql`{
            empresaAuth{
                ruc
                razon_social
                descripcion
                direccion
                telefono
                email
            }
        }`
    }
}
</script>

<style>

</style>
