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
                                            .row
                                                .col-12
                                                    q-uploader.q-mb-md(
                                                        @added="setImage"
                                                        url="http://localhost:4444/upload"
                                                        color="teal"
                                                        flat
                                                        v-model="form.img"
                                                        label="Inserte una imagen referencial del producto."
                                                        accept=".jpg, image/*"
                                                        hide-upload-btn
                                                        bordered)

                                                    .col-12
                                                        q-uploader(
                                                            @added="setEspecificacion_tecnica"
                                                            url="http://localhost:4444/upload"
                                                            color="secondary"
                                                            flat
                                                            v-model="form.especificacion_tecnica"
                                                            label="Inserte el documento de especificaciones técnicas"
                                                            hide-upload-btn
                                                            bordered)
                                            //- vue-dropzone( @vdropzone-file-added="addImg" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions")
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

import gql from 'graphql-tag';

// import especies from '../../graphql/widgets'
export default {
    components: {
        QUploader,
        QForm,
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
            categoria: null,
            especificacion_tecnica: null
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
        setEspecificacion_tecnica(file){
            this.form.especificacion_tecnica = file[0];
        },
         crear(){
             this.$apollo.mutate({
                 mutation: gql`mutation crearOferta(
                    $imagen: Upload,
                    $especificacion_tecnica: Upload,
                    $titulo: String!,
                    $descripcion: String!,
                    $precio: Float!,
                    $id_unidad: ID,
                    $id_especie: ID,
                    $id_categoria: ID
                 ){
                     crearOferta(
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
