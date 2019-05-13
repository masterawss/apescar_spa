<template lang="pug">
    q-card.smooth-shadow.card-filter( unelevated)
          q-card-section
            strong Filtrar por
            q-expansion-item(
              expand-separator
              :default-opened="!$q.screen.lt.sm"
              label="Especies")
              q-card
                q-card-section
                    q-option-group(
                    v-model="especies_option"
                    :options="especies"
                    color="secondary"
                    type="checkbox")

            q-expansion-item(
              expand-separator
              label="Categorias")
              q-card
                q-card-section
                    q-option-group(
                        v-model="categorias_option"
                        :options="categorias"
                        color="secondary"
                        type="checkbox")
</template>

<script>
import { QOptionGroup, QExpansionItem } from 'quasar'
import gql from 'graphql-tag';
export default {
    components: { QOptionGroup, QExpansionItem },
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
    data: () => ({
        especies_option: [],
        categorias_option: [],
    })
}
</script>
