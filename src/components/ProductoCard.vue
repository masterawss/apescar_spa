<template lang="pug">
    q-card.q-ma-sm.smooth-shadow(unelevated)
        q-item.q-pt-md(v-if="isAuth && !hide_empresa" clickable v-ripple dense @click="$router.push({name: 'empresa.show', params: { id: producto.empresa.id } })")
            q-item-section(avatar)
                q-avatar(size="30px")
                    img(:src="producto.empresa.url_imagen" @click="open_producto = true")
            q-item-section {{ producto.empresa.razon_social }}
        q-card-section(v-ripple)
            q-img(:src="producto.path_imagen" :ratio="16/9" @click="go")
            br
            br
            span.text-subtitle2 {{ producto.titulo }}
            br
            div(v-if="isAuth && !hide_precio")
                strong.text-blue {{ producto.precio }} soles &nbsp
                span.text-grey / {{producto.unidad.descripcion}}
</template>
<script>
import {QDialog, QItem, QItemSection, QAvatar, QImg } from 'quasar'
export default {
    props: ['producto', 'hide_precio', 'hide_empresa'],
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
