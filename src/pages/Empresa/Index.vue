<template lang="pug">
    q-page
        .doc-container
            .row.justify-center
                .col-lg-8.col-12.q-mt-md
                    .text-h4.q-my-md Empresas registradas
                    .row.q-col-gutter-lg
                        .col-lg-4.col-md-4.col-sm-6.col-xs-12(v-for="empresa in empresas")
                            w-card-empresa(:empresa="empresa")
</template>

<script>
import WCardEmpresa from '../../components/CardEmpresa'
import gql from 'graphql-tag';
export default {
    components: {WCardEmpresa},
    apollo: {
        empresas: gql`{
            empresas{
                id
                razon_social
                direccion
                email
                descripcion
            }
        }`
    }
}
</script>

<style>

</style>
