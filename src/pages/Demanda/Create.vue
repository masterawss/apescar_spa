<template lang="pug">
    q-page
        .doc-container
            .row.justify-center
                .col-lg-4.col-xl-4.col-md-10.col-sm-10.col-xs-12
                    q-card.smooth-shadow.q-my-md
                        q-card-section
                            q-form(@submit="crear")
                                .text-h6 Nueva demanda
                                .row
                                    .col-6
                                        q-select(label="Categoria" option-label="descripcion" option-value="id" v-model="form.categoria" :options="categorias")
                                    .col-6.q-pl-md
                                        q-select(label="Especies" option-label="descripcion" option-value="id" v-model="form.especie" :options="especies")
                                q-input(label="Titulo" v-model="form.titulo")
                                q-input(label="Descripcion" v-model="form.descripcion" )
                                q-input(label="Fecha esperada" v-model="form.fecha" type="date")
                                .row
                                    .col-xs-12.col-lg-6
                                        q-input(label="Volumen" v-model="form.volumen")
                                    .col-xs-12.col-lg-6.q-pl-md
                                        q-select(label="Seleccione una unidad" v-model="form.unidad" :options="unidades" option-label="descripcion" option-value="id")

                                q-btn.q-mt-md(label="Crear" color="secondary" type="submit")
</template>

<script>
import { QForm, QSelect } from 'quasar'
import gql from 'graphql-tag';
export default {
    components: {QForm, QSelect},
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
        form:{
            titulo: null,
            descripcion: null,
            fecha: new Date(),
            volumen: 0,
            unidad: null,
            especie: null,
            categoria: null
        }
    }),
    methods: {
        crear(){

        }
    }
}
</script>

<style>

</style>
