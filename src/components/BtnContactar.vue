<template lang="pug">
    div
        q-btn(label="Contactar" @click="modal_contactar = true" :class="{ 'full-width': fullWidth}" color="primary" outline)
        q-dialog(v-model="modal_contactar")
            w-card-empresa(:empresa="empresa")
            //- q-card
                q-card-section
                    .text-h6 Contacte con la empresa
</template>

<script>
import {QDialog, QAvatar} from 'quasar'
import WCardEmpresa from './CardEmpresa'
import gql from 'graphql-tag'
export default {
    components: {QDialog, QAvatar, WCardEmpresa},
    props: ['fullWidth', 'id_empresa'],
    data: () => ({
        modal_contactar: false
    }),
    apollo:{
        empresa: {
            query: gql`query getEmpresa($id: ID){
                empresa(id: $id){
                    id
                    razon_social
                    url_imagen
                    telefono
                    direccion
                    email
                    id
                }
            }`,
            variables () {
                return {
                    id: this.id_empresa
                }
            }
        },
    }
}
</script>

<style>

</style>
