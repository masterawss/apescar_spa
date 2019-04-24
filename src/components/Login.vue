<template lang="pug">
    q-card
        q-card-section
            h5 Iniciar sesión
            q-input(v-model="email" label="Correo electrónico")
            q-input(v-model="password" label="Contraseña")
            q-btn.q-my-sm(label="Ingresar" color="primary")
</template>

<script>
import { QCard, QCardSection, QInput } from 'quasar'
export default {
    components: { QCard, QCardSection, QInput },
    data: () => ({
        email: '',
        password: ''
    })
}
</script>
