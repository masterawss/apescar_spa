<template lang="pug">
    q-card.smooth-shadow(unelevate)
        q-card-section.q-pa-lg
            span.text-h6.text-center Iniciar sesión
            q-input( v-model="auth.email" label="Correo electrónico")
            q-input( v-model="auth.password" label="Contraseña" type="password")
            q-btn.q-mt-sm.full-width(:loading="cargando" label="Ingresar" @click="login" color="secondary" )
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
        cargando: false,
        auth: {
            email: '',
            password: '',
        }
    }),
    methods: {
        login(){
            this.cargando = true
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
                        empresa{
                            id
                            razon_social
                        }
                    }
                }`,
                variables: {
                    email: this.auth.email,
                    password: this.auth.password
                }
            }).then(data => {
                this.cargando = false
                if(data.data.login.auth_token !== null){
                    console.log('Iniciando sesion');
                    let auth = JSON.parse(JSON.stringify(data.data.login))
                    this.$store.commit('auth/login', auth)
                    
                    // this.$q.localStorage.set('info', auth)
                    // this.$q.localStorage.set('is_auth', true)
                    // this.$q.localStorage.set('token', auth.auth_token.access_token)

                }else{
                    this.$q.notify({
                        color: 'red',
                        message: 'Error iniciando sesión.'
                    })
                }
            }).catch(e => {
                this.cargando = false
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

