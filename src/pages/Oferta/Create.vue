<template lang="pug">
    q-page
        .doc-container
            .row.justify-center
                .col-lg-8.col-12
                    q-card.smooth-shadow.q-my-md
                        q-card-section
                            q-form(@submit="crear")
                                .row
                                    .col-lg-6.col-sm-12.col-xs-12.col-md-6
                                        .flex.flex-center
                                            .row.justify-center
                                                .col-12.q-mb-xl
                                                    div(v-if="!is_new && !change_imagen" )
                                                        q-img(:src="form.path_imagen" spinner-color="scondary")
                                                            template(v-slot:error)
                                                                .absolute-full.flex.flex-center.bg-negative.text-white
                                                                    | No se puede cargar la imagen
                                                        q-btn.full-width(@click="change_imagen = true" unelevated color="secondary" label="Cambiar de foto")
                                                    q-uploader.q-mb-md(
                                                        v-else
                                                        @added="setImage"
                                                        color="secondary"
                                                        flat
                                                        v-model="form.img"
                                                        label="Inserte una imagen referencial del producto."
                                                        accept=".jpg, image/*"
                                                        hide-upload-btn
                                                        bordered)
                                                .col-12
                                                    div(v-if="!is_new && !change_ficha")
                                                        q-btn.full-width.q-my-sm(v-if="form.path_ficha_tecnica !== ''"
                                                            label="Ver ficha técnica" color="primary" flat type="a" target="_blank" :href="form.path_ficha_tecnica")
                                                        .q-py-md.text-red.text-center(v-else) 
                                                            strong No cuenta con ficha técnica
                                                        q-btn.full-width(label="Subir otra ficha técnica" color="primary" @click="change_ficha = true" )
                                                    q-uploader(
                                                        v-else
                                                        @added="setEspecificacion_tecnica"
                                                        color="primary"
                                                        flat
                                                        v-model="form.especificacion_tecnica"
                                                        label="Inserte el documento de especificaciones técnicas"
                                                        hide-upload-btn
                                                        bordered)
                                    .col-lg-6.col-sm-12.col-xs-12.col-md-6
                                        .row
                                            .col-6
                                                q-select(label="Especie" :options="especies" option-value="id" option-label="descripcion" v-model="form.especie")
                                            .col-6.q-pl-md
                                                q-select(label="Categoria" :options="categorias" option-value="id" option-label="descripcion" v-model="form.categoria")
                                        q-input(label="Titulo" v-model="form.titulo")
                                        q-input(label="Descripcion" v-model="form.descripcion")
                                        .row
                                            .col-6
                                                q-input(label="Precio" type="number" v-model="form.precio")
                                            .col-6.q-pl-md
                                                q-select( label="Unidad de medida" :options="unidades" option-value="id" option-label="descripcion" v-model="form.unidad")
                                        q-btn.q-my-md(v-if="is_new" color="secondary" type="submit" label="Crear oferta")
                                        div(v-else)
                                            q-btn.q-my-md(color="primary" type="submit" label="Editar oferta")
                                            q-btn.q-ml-lg(flat label="Eliminar" icon-right="close" @click="eliminarPublicacion")
</template>

<script>
import { QUploader, QForm, QImg } from 'quasar'

import gql from 'graphql-tag';

// import especies from '../../graphql/widgets'
export default {
    components: {
        QUploader,
        QForm,
        QImg
    },

    created(){
        if(this.$route.params.id){
            this.is_new = false
            this.form.id = this.$route.params.id
            this.$apollo.query({
                query: gql`query getOferta($id: ID){
                    publicacion(id: $id){
                        id
                        titulo
                        descripcion
                        precio
                        path_imagen
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
                // var reader  = new FileReader();
                this.form = response.data.publicacion
                // var file = this.createFile( response.data.publicacion.path_imagen)
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
        categorias: gql`query{
            categorias{
                id
                descripcion
            }
        }`,
        especies: gql`query{
            especies{
                id
                descripcion
            }
        }`
    },
    data: () => ({
        is_new: true,
        change_imagen: false,
        change_ficha: false,
        form: {
            id: null,
            unidad: null,
            titulo: '',
            descripcion: '',
            precio: 0,
            img: null,
            especie: null,
            categoria: null,
            especificacion_tecnica: null
        }
    }),
    methods: {
        async createFile(url){
            let response = await fetch(url);
            let data = await response.blob();
            let metadata = {
                type: 'image/jpeg'
            };
            let file = new File([data], "test.jpg", metadata);
            // ... do something with the file or return it
            return file
        },
        setImage(file){
            this.form.img = file[0]
            console.log(typeof this.form.img);
            console.log(this.form.img);
        },
        setEspecificacion_tecnica(file){
            this.form.especificacion_tecnica = file[0];
        },
         crear(){
                 this.$apollo.mutate({
                     mutation: gql`mutation crearEditarOferta(
                        $id: ID
                        $imagen: Upload,
                        $especificacion_tecnica: Upload,
                        $titulo: String!,
                        $descripcion: String!,
                        $precio: Float!,
                        $id_unidad: ID,
                        $id_especie: ID,
                        $id_categoria: ID
                     ){
                         crearEditarOferta(
                            id: $id,
                            imagen: $imagen,
                            especificacion_tecnica: $especificacion_tecnica
                            titulo: $titulo,
                            descripcion: $descripcion,
                            precio: $precio,
                            id_unidad: $id_unidad,
                            id_especie: $id_especie,
                            id_categoria: $id_categoria
                         ){
                            id
                         }
                     }
                     `,
                     variables: {
                        id: this.form.id,
                        imagen: this.form.img,
                        titulo: this.form.titulo,
                        descripcion: this.form.descripcion,
                        precio: this.form.precio,
                        id_unidad: this.form.unidad.id,
                        id_especie: this.form.especie.id,
                        id_categoria: this.form.categoria.id,
                        especificacion_tecnica: this.form.especificacion_tecnica
                     }
                 }).then(data => {
                    this.$q.notify({
                        color: 'green',
                        message: 'Oferta creada correctamente.'
                    })
                    this.$router.go(-1)
                 }).catch(e => {
                     console.log('Error', e);
                     
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
