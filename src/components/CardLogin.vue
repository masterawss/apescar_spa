<template lang="pug">
    q-card.smooth-shadow(unelevate)
        q-card-section.q-pa-lg
            span.text-h6.text-center Iniciar sesión
            q-input( v-model="auth.email" label="Correo electrónico")
            q-input( v-model="auth.password" label="Contraseña" type="password")
            q-btn.q-mt-sm.full-width(label="Ingresar" @click="login" color="secondary" )
            .text-center
                br
                span ¿No eres miembro aún?
                br
                q-btn(color="primary" @click="$router.push({name: 'register'})" flat) ¡Regístrate aquí!
</template>

<script>
import gql from 'graphql-tag'
export default {
    data: () => ({
        auth: {
            email: '',
            password: '',
        }
    }),
    methods: {
        login(){
            this.$apollo.mutate({
                mutation: gql`mutation login($email: String!, $password: String!){
                    login(email: $email, password: $password){
                        auth_token{
                            token_type
                            access_token
                        }
                        user{
                            id
                            email
                            nombre
                        }
                    }
                }`,
                variables: {
                    email: this.auth.email,
                    password: this.auth.password
                }
            }).then(data => {
                if(data.data.login.auth_token !== null){
                    console.log('Iniciando sesion');
                    let auth = JSON.parse(JSON.stringify(data.data.login))
                    this.$store.commit('auth/login', auth)
                }else{
                    this.$q.notify({
                        color: 'red',
                        message: 'Error iniciando sesión.'
                    })
                }
            }).catch(e => {
                this.$q.notify({
                        color: 'red',
                        message: 'Error iniciando sesión.'
                    })
            })

        }
    },
}
</script>

<style>

</style>

