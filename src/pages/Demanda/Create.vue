<template lang="pug">
    q-page
        .doc-container
            .row.justify-center
                .col-lg-4.col-xl-4.col-md-10.col-sm-10.col-xs-12
                    q-card.smooth-shadow.q-my-md
                        q-card-section
                            q-form(@submit="crear")
                                .text-h6(v-if="is_new") Nueva demanda
                                .text-h6(v-else) Editar demanda
                                .row
                                    .col-6
                                        q-select(label="Categoria" option-label="descripcion" option-value="id" v-model="form.categoria" :options="categorias")
                                    .col-6.q-pl-md
                                        q-select(label="Especies" option-label="descripcion" option-value="id" v-model="form.especie" :options="especies")
                                q-input(label="Titulo" v-model="form.titulo")
                                q-input(label="Descripcion" v-model="form.descripcion" )
                                q-input(label="Fecha esperada" v-model="form.fecha" type="date")
                                .row
                                    .col-6
                                        q-input(label="cantidad" v-model="form.cantidad")
                                    .col-6.q-pl-md
                                        q-select(label="Seleccione una unidad" v-model="form.unidad" :options="unidades" option-label="descripcion" option-value="id")

                                q-btn.q-mt-md(v-if="is_new" label="Crear" color="secondary" type="submit")
                                div(v-else)
                                    q-btn.q-my-md(color="primary" type="submit" label="Editar demanda")
                                    q-btn.q-ml-lg(flat label="Eliminar" icon-right="close" @click="eliminarPublicacion")
</template>

<script>
import { QForm, QSelect } from 'quasar'
import gql from 'graphql-tag';
export default {
    components: {QForm, QSelect},
    created () {
        if(this.$route.params.id){
            this.is_new = false
            this.form.id = this.$route.params.id
            this.$apollo.query({
                query: gql`query getDemanda($id: ID){
                    publicacion(id: $id){
                        id
                        titulo
                        descripcion
                        precio
                        path_imagen
                        cantidad
                        fecha
                        cantidad
                        especie{
                            id
                            descripcion
                        }
                        categoria{
                            id
                            descripcion
                        }
                        unidad{
                            id
                            descripcion
                        }
                        path_ficha_tecnica
                    }
                }`,
                variables: {
                    id: this.$route.params.id
                }
            }).then((response) => {
                this.form = response.data.publicacion
            })
        }else{
            this.is_new = true
        }
    },
    apollo: {
        unidades: gql`query{
            unidades{
                id
                descripcion
            }
        }`,
        especies: gql`query{
            especies{
                id
                descripcion
            }
        }`,
        categorias: gql`query{
            categorias{
                id
                descripcion
            }
        }`,
    },
    data: () => ({
        is_new: false,
        form:{
            id: null,
            titulo: null,
            descripcion: null,
            fecha: new Date().toISOString().slice(0,10),
            cantidad: 0,
            unidad: null,
            especie: null,
            categoria: null
        }
    }),
    methods: {
        crear(){
            this.$apollo.mutate({
                mutation: gql`mutation crearDemanda(
                    $titulo: String!,
                    $descripcion: String!,
                    $cantidad: Float!,
                    $fecha: Date,
                    $id_unidad: Int,
                    $id_especie: Int,
                    $id_categoria: Int,
                ){
                    crearDemanda(
                        titulo: $titulo,
                        descripcion: $descripcion,
                        cantidad: $cantidad,
                        fecha: $fecha,
                        id_unidad: $id_unidad,
                        id_especie: $id_especie,
                        id_categoria: $id_categoria
                    ){
                        id
                    }
                }`,
                variables: {
                    titulo: this.form.titulo,
                    descripcion: this.form.descripcion,
                    cantidad: this.form.cantidad,
                    fecha: this.form.fecha,
                    id_unidad: this.form.unidad !== null ? this.form.unidad.id  : null,
                    id_especie: this.form.especie !== null ? this.form.especie.id  : null,
                    id_categoria: this.form.categoria !== null ? this.form.categoria.id : null 
                }
            }).then(data => {
                //  if(data.data.crearDemanda.id == null) throw 'Error obteniendo'
                this.$q.notify({
                    color: 'green',
                    message: 'Demanda creada correctamente.'
                })
                this.$router.go(-1)
                 
             }).catch(e => {
                this.$q.notify({
                    color: 'red',
                    message: 'Ha ocurrido un error, compruebe su conexión de internet   .'
                })
             })
        },
        eliminarPublicacion(){
             this.$q.dialog({
                 title: 'Eliminar publicación',
                 message: '¿Está seguro que desea eliminar la publicación?',
                 ok: 'Eliminar',
                 cancel: 'Cancelar'
             }).onOk( () => {
                 this.$apollo.mutate({
                     mutation: gql`mutation publicacionDelete($id: ID!){
                         publicacionDelete(id: $id){
                             id
                         }
                     }`,
                     variables: {
                         id: this.form.id
                     }
                 }).then(response => {
                     this.$q.notify({ message: 'Eliminado correctamente', color: 'green' })
                     console.log('Eliminado', response);
                     this.$router.go(-1)
                 }).catch(error => {
                     this.$q.notify({ message: 'Error eliminando, compruebe su conexión a internet', color: 'red' })
                     console.log('Error eliminando', error);
                     
                 })
             }).onCancel( () => {

             })
         }
    }
}
</script>

<style>

</style>
