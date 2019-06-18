<template lang="pug">
    q-item
        q-item-section(avatar)
            q-avatar(color="primary" text-color="white" icon="done")
        q-item-section
            q-item-label(lines="1") Tu cuenta ha sido revisada y aprobada.
            q-item-label(caption lines="4") 
                span.text-weight-bold Ahora puedes usar con normalidad todas las funciones de la plataforma
                
        q-item-section(side top)
            | {{ notificacion.created_at }}
</template>

<script>
import {QAvatar} from 'quasar'
export default {
    props: ['notificacion'],
    components: {QAvatar}
}
</script>

<style>

</style>
