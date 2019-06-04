<template lang="pug">
    .q-my-md
        .text-h5.q-mb-md Datos generales
        //- q-input(label="DNI" v-model="usuario.dni" disable)
        .flex.flex-center(v-if="$apollo.queries.autorizacion.loading")
            q-spinner-ball.q-my-xl(size="5em" color="primary")
        div(v-else-if="$apollo.queries.autorizacion.error")
            strong Error obteniendo datos
        div(v-else)
            q-input(label="Nombre" v-model="autorizacion.nombre")
            q-input(label="email" disable v-model="autorizacion.email")
            q-btn.q-my-md(flat label="Cambiar contraseña" color="secondary" @click="$router.push({name: 'configuracion.change_password'})")
            br
            q-btn.q-my-sm(label="Guardar" @click="guardar" color="secondary")
</template>

<script>
import gql from 'graphql-tag';
import {QSpinnerBall} from 'quasar'
export default {
    components: {QSpinnerBall},
    data: () => ({
        // user: {}
    }),
    methods: {
        guardar(){
            this.$apollo.mutate({
                mutation: gql`mutation userUpdate($nombre: String){
                    userUpdate(nombre: $nombre){
                        id
                    }
                }`,
                variables: {
                    nombre: this.autorizacion.nombre
                }
            }).then(response => {
                this.$q.notify({message: 'Datos de usuario guardados correctamente', color: 'green'})
            }).catch(e => {
                this.$q.notify({message: 'Problemas guardando datos del usuario.', color: 'red'})
            })
            
        }
    },
    apollo: {
        autorizacion: gql`{
            autorizacion{
                id,
                # dni,
                nombre,
                email
            }
        }`
    }
}
</script>

<style>

</style>
