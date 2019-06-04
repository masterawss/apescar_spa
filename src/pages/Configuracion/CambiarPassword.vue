<template lang="pug">
    q-page
        .row.justify-center.q-mt-xl
            .col-lg-4.col-xl-4.col-md-8.col-sm-12.col-xs-12
                q-card
                    q-card-section
                        .text-h6 Cambiar contraseña
                        q-input(type="password" label="Escriba su contraseña actual" v-model="form.actual_password")
                        q-input.q-mt-lg(type="password" label="Escriba su nueva contraseña" v-model="form.new_password")
                        q-input(type="password" label="Repita su nueva contraseña" v-model="form.new_password_2")
                        q-btn.q-mt-md(label="Guardar" color="secondary" @click="guardar")
</template>

<script>
import gql from 'graphql-tag';
export default {
    data: () => ({
        form: {
            actual_password: '',
            new_password: '',
            new_password_2: ''
        }
    }),
    methods:{
        guardar(){
            if(this.form.new_password.length <= 4){
                this.$q.notify({message: 'La contraseña es muy corta', color: 'red'});
                return 
            }

            if(this.form.new_password_2 !== this.form.new_password){
                this.$q.notify({message: 'Las contraseñas no coinciden', color: 'red'});
                return 
            }

            this.$apollo.mutate({
                mutation: gql`mutation changePassword( $actual:  String, $new: String){
                    changePassword(actual: $actual, new: $new){
                        nombre
                    }
                } 
                `,
                variables: {
                    actual: this.form.actual_password,
                    new: this.form.new_password,
                }
            }).then(response => {
                if(response.data.changePassword === null ){
                    this.$q.notify({message: 'Error, ingrese correctamente su contraseña actual.', color: 'red'})
                    return
                }
                this.$q.notify({message: 'Se cambió correctamente la contraseña', color: 'green'})
                this.$router.push({name: 'configuracion.index'})
            }).catch(e => {
                this.$q.notify({message: 'Error cambiando la contraseña (Compruebe su conexión a internet).', color: 'red'})
            }) 
        }
    }
}
</script>

<style>

</style>
