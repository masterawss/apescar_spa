<template lang="pug">
    q-item( v-ripple clickable @click="$router.push( { name: 'pedidos.show' } )" )
        q-item-section(avatar)
            q-avatar(icon="shopping_cart" color="blue" text-color="white")
        q-item-section
            q-item-label(lines="1") {{ notificacion.data.empresa.razon_social }}
            q-item-label(caption lines="4")
                span.text-weight-bold Realizó un pedido en tu publicación
                | -- {{ notificacion.data.contacto.mensaje_interesado }}
                
        q-item-section(side top)
            | {{ notificacion.created_at }}
</template>

<script>
import { QAvatar } from 'quasar'
export default {
    components: { QAvatar },
    props: ['notificacion']
}
</script>

<style>

</style>
