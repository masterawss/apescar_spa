<template lang="pug">
    q-card.smooth-shadow.card-filter( unelevated)
          q-card-section
            strong Filtrar por
            
            q-expansion-item(
              expand-separator
              default-opened
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
import { QCard, QCardSection, QOptionGroup, QExpansionItem } from 'quasar'
export default {
    components: { QCard, QCardSection, QOptionGroup, QExpansionItem },
    data: () => ({
        especies_option: [],
        categorias_option: [],
        especies: [
        {
            id: 1,
            label: 'Tilapia',
            value: false
        },
        {
            id: 2,
            label: 'Gamitana',
            value: false
        },
        {
            id: 3,
            label: 'Paco',
            value: false
        },
        {
            id: 4,
            label: 'Paiche',
            value: false
        },
        {
            id: 5,
            label: 'Camarón',
            value: false
        },
        {
            id: 6,
            label: 'Dorado',
            value: false
        },
        {
            id: 7,
            label: 'Doncella',
            value: false
        },
        {
            id: 8,
            label: 'Boquichico',
            value: false
        },
        {
            id: 9,
            label: 'Toa',
            value: false
        },
        {
            id: 10,
            label: 'Sábalo',
            value: false
        },
        ],
        categorias: [
        {
            id: 1,
            label: 'Hamburguesa',
            value: false
        },
        {
            id: 2,
            label: 'Filete',
            value: false
        },
        {
            id: 3,
            label: 'Nuggets',
            value: false
        },
        {
            id: 4,
            label: 'Ahumado',
            value: false
        },
        {
            id: 5,
            label: 'Filete ahumado',
            value: false
        },
        {
            id: 6,
            label: 'Medallones',
            value: false
        },
        {
            id: 7,
            label: 'Seco salado',
            value: false
        },
        {
            id: 8,
            label: 'Filete seco salado',
            value: false
        },
        ],
    })
}
</script>
