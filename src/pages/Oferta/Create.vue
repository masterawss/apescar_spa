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
                                            q-uploader(
                                                @added="setImage"
                                                url="http://localhost:4444/upload"
                                                color="teal"
                                                flat
                                                v-model="form.img"
                                                label="Inserte una imagen"
                                                accept=".jpg, image/*"
                                                hide-upload-btn
                                                bordered)
                                            vue-dropzone( @vdropzone-file-added="addImg" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions")
                                            //- input(type="file" v-model="form.img" )
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
                                        q-btn.q-my-md(color="secondary" type="submit" label="Crear oferta")
</template>

<script>
import { QUploader, QForm } from 'quasar'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

import gql from 'graphql-tag';

// import especies from '../../graphql/widgets'
export default {
    components: {
        QUploader,
        QForm,
        vueDropzone: vue2Dropzone
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
        form: {
            unidad: null,
            titulo: '',
            descripcion: '',
            precio: 0,
            img: null,
            especie: null,
            categoria: null
        },
        dropzoneOptions: {
            url: 'https://httpbin.org/post',
            thumbnailWidth: 150,
            maxFilesize: 0.5,
            // headers: { "My-Awesome-Header": "header value" }
        }
    }),
    methods: {
        srcToFile(src, fileName, mimeType){
            return (fetch(src)
                .then(function(res){return res.arrayBuffer();})
                .then(function(buf){return new File([buf], fileName, {type:mimeType});})
            );
        },
        setImage(file){
            
            this.form.img = file[0]
            console.log(typeof this.form.img);
            console.log(this.form.img);
        },
        addImg(file){
            console.log(typeof file);
            console.log(file);
            
            
        },
         crear(){
             this.$apollo.mutate({
                 mutation: gql`mutation crearOferta(
                    $imagen: Upload,
                    $titulo: String!,
                    $descripcion: String!,
                    $precio: Float!,
                    $id_unidad: ID,
                    $id_especie: ID,
                    $id_categoria: ID
                 ){
                     crearOferta(
                        imagen: $imagen,
                        titulo: $titulo,
                        descripcion: $descripcion,
                        precio: $precio,
                        id_unidad: $id_unidad,
                        id_especie: $id_especie,
                        id_categoria: $id_categoria
                     ){
                         valor
                     }
                 }
                 `,
                 variables: {
                    imagen: this.form.img,
                    titulo: this.form.titulo,
                    descripcion: this.form.descripcion,
                    precio: this.form.precio,
                    id_unidad: this.form.unidad.id,
                    id_especie: this.form.especie.id,
                    id_categoria: this.form.categoria.id
                    
                 }
             }).then(data => {
                 console.log('Dato obtenido', data);
                 
             }).catch(e => {
                 console.log('Error', e);
                 
             })
         }
    }
}
</script>

<style>

</style>
