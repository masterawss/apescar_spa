<template lang="pug">
    q-card.q-ma-sm.smooth-shadow(unelevated)
        q-item.q-pt-md(v-if="isAuth" clickable v-ripple dense)
            q-item-section(avatar)
                q-avatar(size="30px")
                    img(:src="producto.empresa.foto" @click="open_producto = true")
            q-item-section {{ producto.empresa.nombre }}
        q-card-section
            q-img(:src="producto.foto" :ratio="16/9" @click="go")
            br
            br
            span.text-subtitle2 {{ producto.descripcion }}
            br
            div(v-if="isAuth && !hide_precio")
                strong.text-blue {{ producto.precio }} soles &nbsp
                span.text-grey / {{producto.unidad}}
</template>
<script>
import {QDialog, QItem, QItemSection, QAvatar, QImg } from 'quasar'
export default {
    props: ['producto', 'hide_precio'],
    components: {QDialog, QItem, QItemSection, QAvatar, QImg },
    data: () => ({
        open_producto: false,
    }),
    computed:{
        isAuth(){
            return this.$store.state.auth.info.jwt !== undefined
        }
    },
    methods: {
        go(){
            if (this.isAuth) {
                this.$router.push({name: 'oferta.show', params: { id: this.producto.id }})
            }else{
                this.$q.notify({
                    color: 'red',
                    message: 'Debe iniciar sesión para ver el producto',
                })
            }
        }
    }
}
</script>
