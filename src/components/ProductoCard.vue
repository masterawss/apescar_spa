<template lang="pug">
    q-card.card-oferta(unelevated)
        //- q-item.q-pt-md(v-if="isAuth && !hide_empresa" )
        q-item.q-pt-md(v-if="isAuth && producto.empresa" )
            q-item-section(v-if="!hide_empresa" avatar)
                q-avatar(size="30px")
                    img(:src="producto.empresa.url_imagen")

            q-item-section( caption="2" v-if="!hide_empresa" @click="$router.push({name: 'empresa.show', params: { id: producto.empresa.id } })") {{ producto.empresa.razon_social }}
            
            q-item-section(v-if=" editable && $store.state.auth.info.empresa.id == producto.empresa.id" top side clickable v-ripple )
                q-btn.text-grey-5(size="12px" flat dense round icon="edit" @click="$router.push({name: 'oferta.edit', params: { id: producto.id } })")

        q-card-section(v-ripple)
            .row.items-center.q-col-gutter-sm
                //- div(:class="{ 'col-12': $q.screen.lt.lg, 'col-6': $q.screen.lt.sm }")
                    q-img(:src="producto.path_imagen" :ratio="16/9" @click="go")
                .col-md-12.col-sm-6.col-xs-6(:class="{ 'col-lg-6': smaller || $q.screen.lt.lg }")
                    q-img(:src="producto.path_imagen" width="100%" :ratio="16/9" @click="go")
                .col-md-12.col-sm-6.col-xs-6(:class="{ 'col-lg-6': smaller || $q.screen.lt.lg }")
                    span.text-subtitle2 {{ producto.titulo }}
                    br
                    //- q-list(dense)
                        q-item(dense)
                            q-item-section
                                q-item-label
                                    strong.text-blue {{ producto.precio }} soles &nbsp
                                    span.text-grey / {{producto.unidad.descripcion}}
                                //- q-item-label(caption lines="2")Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit. 

                            q-item-section(side top)
                                q-item-label(caption) 10
                                q-icon(name="star" color="yellow")  
                
                    div(v-if="isAuth && !hide_precio")
                        .row
                            .col-10
                                strong.text-blue {{ producto.precio }} soles &nbsp
                                span.text-grey / {{producto.unidad.descripcion}}
                            .col-2.text-secondary(v-if="producto.total_pedidos")
                                |{{ producto.total_pedidos }} &nbsp
                                q-icon(name="message" ) 
            


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
    props: ['producto', 'hide_precio', 'hide_empresa', 'smaller', 'editable'],
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
