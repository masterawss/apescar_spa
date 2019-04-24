<template lang="pug">
    q-card.q-ma-sm.smooth-shadow(unelevated)
        q-item.q-pt-md(clickable v-ripple dense)
            q-item-section(avatar)
                q-avatar(size="30px")
                    img(:src="producto.empresa.foto" @click="open_producto = true")
            q-item-section {{ producto.empresa.nombre }}
        q-card-section
            q-img(:src="producto.foto" :ratio="16/9" @click="$router.push({name: 'oferta.show', params: { id: producto.id }})")
            br
            span.text-subtitle2 {{ producto.descripcion }}
            br
            div(v-if="!hide_precio")
                strong.text-blue {{ producto.precio }} soles &nbsp
                span.text-grey / {{producto.unidad}}
</template>
<script>
import {QDialog, QCard, QItem, QItemSection, QAvatar, QImg, QCardSection } from 'quasar'
export default {
    props: ['producto', 'hide_precio'],
    components: {QDialog, QCard, QItem, QItemSection, QAvatar, QImg, QCardSection },
    data: () => ({
        open_producto: false
    })
}
</script>
