<template lang="pug">
    q-card.card-oferta.q-ma-sm.smooth-shadow(unelevated)
        //- q-item.q-pt-md(v-if="isAuth && !hide_empresa" )
        q-item.q-pt-md(v-if="isAuth" )
            q-item-section(v-if="!hide_empresa" avatar)
                q-avatar(size="30px")
                    img(:src="producto.empresa.url_imagen" @click="open_producto = true")

            q-item-section(v-if="!hide_empresa" @click="$router.push({name: 'empresa.show', params: { id: producto.empresa.id } })") {{ producto.empresa.razon_social }}
            
            q-item-section(v-if="$store.state.auth.info.empresa.id == producto.empresa.id" top side clickable v-ripple )
                q-btn.text-grey-5(size="12px" flat dense round icon="edit" @click="$router.push({name: 'oferta.edit', params: { id: producto.id } })")

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
<style>
.card-oferta:hover{
        -webkit-box-shadow: 0px -1px 28px -1px rgba(0,0,0,0.2);
        -moz-box-shadow: 0px -1px 28px -1px rgba(0,0,0,0.2);
        box-shadow: 0px -1px 28px -1px rgba(0,0,0,0.2);
    }
</style>

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
            return this.$store.state.auth.is_auth
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
