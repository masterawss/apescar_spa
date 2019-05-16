<template lang="pug">
     q-page
        .row.justify-center.q-py-lg
            .col-lg-6.col-md-8.col-sm-12.col-xs-12
                q-card.smooth-shadow
                    q-card-section.q-px-xl.q-mx-xl
                        h4.text-center Nueva cuenta
                            q-tab-panels(v-model="tab" animated transition-prev="jump-up" transition-next="jump-down")
                                q-tab-panel(name="usuario")
                                    q-input(label="DNI"                 v-model="usuario.dni" type="number")
                                    q-input(label="Nombre"              v-model="usuario.nombre")
                                    q-input(label="Teléfono"            v-model="usuario.telefono")
                                    q-input(label="Dirección"           v-model="usuario.direccion")
                                    q-input(label="Correo electrónico"  v-model="usuario.email" type="email")
                                    q-input(label="Contraseña"          v-model="usuario.password" type="password")
                                    q-input(label="Confirmar contraseña" v-model="usuario.confirm_password" type="password")

                                    q-btn.text-center.q-mt-md(label="Siguiente" @click="tab = 'empresa'" color="secondary" rounded)
                                q-tab-panel(name="empresa")
                                    q-input(label="RUC"                     v-model="empresa.ruc" type="number")
                                    q-input(label="Razón social"            v-model="empresa.razon_social")
                                    q-input(label="Dirección de la empresa" v-model="empresa.direccion")
                                    q-input(label="Email de la empresa"     v-model="empresa.email")
                                    q-input(label="Teléfono de la empresa"  v-model="empresa.telefono")

                                    q-btn.text-center.q-mt-md(label="Atrás" @click="tab = 'usuario'" flat)
                                    q-btn.text-center.q-mt-md(label="Crear" @click="crear" color="secondary" rounded)
</template>

<script>
import { QTabPanels, QTabPanel } from 'quasar'
import gql from 'graphql-tag'
export default {
    components: { QTabPanels, QTabPanel },
    data: () => ({
        tab: 'usuario',
        usuario: {
            dni: null,
            nombre: null,
            telefono: null,
            direccion: null,
            email: null,
            password: null,
            confirm_password: null,
        },
        empresa: {
            ruc: null,
            razon_social: null,
            direccion: null,
            email: null,
            telefono: null
        }
    }),
    methods: {
        crear(){
            this.$apollo.mutate({
                mutation: gql`mutation crearCuenta($usuario: String!, $empresa: String!){
                    crearCuenta(usuario: $usuario, empresa: $empresa){
                        usuario{
                            id
                            nombre
                        }
                        empresa{
                            id
                            razon_social
                        }
                    }
                }`,
                variables: {
                    usuario: this.usuario,
                    empresa: this.empresa
                }
            }).then(data => {
                console.log(data);
            }).catch(e => {
                console.log('Error creando cuenta', e);
                this.$q.notify({
                        color: 'red',
                        message: 'Error creando cuenta.'
                    })
            })
        }
    }

}
</script>

<style>

</style>
