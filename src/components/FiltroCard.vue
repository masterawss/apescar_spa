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
import { QOptionGroup, QExpansionItem } from 'quasar'
export default {
    components: { QOptionGroup, QExpansionItem },
    data: () => ({
        especies_option: [],
        categorias_option: [],
        especies: [
        {
            id: 1,
            label: 'Tilapia',
            value: 'Tilapia'
        },
        {
            id: 2,
            label: 'Gamitana',
            value: 'Gamitana'
        },
        {
            id: 3,
            label: 'Paco',
            value: 'Paco'
        },
        {
            id: 4,
            label: 'Paiche',
            value: 'Paiche'
        },
        {
            id: 5,
            label: 'Camarón',
            value: 'Camarón'
        },
        {
            id: 6,
            label: 'Dorado',
            value: 'Dorado'
        },
        {
            id: 7,
            label: 'Doncella',
            value: 'Doncella'
        },
        {
            id: 8,
            label: 'Boquichico',
            value: 'Boquichico'
        },
        {
            id: 9,
            label: 'Toa',
            value: 'Toa'
        },
        {
            id: 10,
            label: 'Sábalo',
            value: 'Sábalo'
        },
        ],
        categorias: [
        {
            id: 1,
            label: 'Hamburguesa',
            value: 'Hamburguesa'
        },
        {
            id: 2,
            label: 'Filete',
            value: 'Filete'
        },
        {
            id: 3,
            label: 'Nuggets',
            value: 'Nuggets'
        },
        {
            id: 4,
            label: 'Ahumado',
            value: 'Ahumado'
        },
        {
            id: 5,
            label: 'Filete ahumado',
            value: 'Filete ahumado'
        },
        {
            id: 6,
            label: 'Medallones',
            value: 'Medallones'
        },
        {
            id: 7,
            label: 'Seco salado',
            value: 'Seco salado'
        },
        {
            id: 8,
            label: 'Filete seco salado',
            value: 'Filete seco salado'
        },
        ],
    })
}
</script>
