<template lang="pug">
    q-card.smooth-shadow.card-filter( :class=" { 'margin-t': !$q.screen.lt.sm } " unelevated)
          q-card-section
            strong Filtrar por
            q-expansion-item(
              expand-separator
              :default-opened="!$q.screen.lt.sm"
              label="Especies")
              q-card
                q-card-section
                    .flex.flex-center(v-if="$apollo.queries.especies.loading")
                        q-spinner-puff(color="primary" size="3em")
                    div(v-else-if="$apollo.queries.especies.error" class="error apollo")
                        | A ocurrido un error
                    div(v-else class="result apollo")
                        q-option-group(
                        v-model="especies_option"
                        :options="especies"
                        color="secondary"
                        type="checkbox")

            q-expansion-item(
              expand-separator
              :default-opened="!$q.screen.lt.sm"
              label="Categorias")
              q-card
                q-card-section
                    .flex.flex-center(v-if="$apollo.queries.especies.loading")
                        q-spinner-puff(color="primary" size="3em")
                    div(v-else-if="$apollo.queries.especies.error" class="error apollo")
                        | A ocurrido un error
                    div(v-else class="result apollo")
                        q-option-group(
                        v-model="categorias_option"
                        :options="categorias"
                        color="secondary"
                        type="checkbox")
</template>

<script>
import { QOptionGroup, QExpansionItem, QSpinnerPuff } from 'quasar'
import gql from 'graphql-tag';
export default {
    components: { QOptionGroup, QExpansionItem, QSpinnerPuff },
    apollo:{
        especies: gql`{
            especies{
                value: id
                label: descripcion
            }
        }
        `,
        categorias: gql`
            {
                categorias{
                    value: id
                    label: descripcion
                }
            }
        `
    },
    computed: {
        especies_option: {
            get () {
                return this.$store.state.filtro_oferta.especies
            },
            set (val) {
                console.log('asdasd');
                this.$store.commit('filtro_oferta/updateEspecies', val)
            }
        },
        categorias_option: {
            get () {
                return this.$store.state.filtro_oferta.categorias
            },
            set (val) {
                this.$store.commit('filtro_oferta/updateCategorias', val)
            }
        },

    }
}
</script>

<style scoped>
    .margin-t{
        margin-top: -60px;
    }
</style>
