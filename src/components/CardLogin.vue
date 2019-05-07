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
                q-btn(color="primary"  flat) ¡Regístrate aquí!
</template>

<script>
export default {
    data: () => ({
        auth: {
            email: '',
            password: '',
            jwt: 'as'
        }
    }),
    methods: {
        login(){
            
            let auth = JSON.parse(JSON.stringify(this.auth))
            this.$store.commit('auth/login', auth)
        }
    },
}
</script>

<style>

</style>

