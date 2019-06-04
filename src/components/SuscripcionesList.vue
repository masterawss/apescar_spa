<template lang="pug">
    div
        .text-h5.q-mb-md Estado de suscripción
        | Lorem ipsum dolor sit amet consectetur adipisicing elit.

        q-table(
            title="Historial de suscripciones"
            :data="data"
            :columns="columns"
            row-key="id")
</template>

<script>
import { QTable } from 'quasar'
export default {
    components: { QTable },
    data: () => ({
        data: [

        ],
        columns: [
            { name: 'codigo', label:"Código", field: 'codigo', sortable: true },
            { name: 'fecha', label:"Fecha", field: 'fecha', sortable: true },
            { name: 'monto', label:"Monto", field: 'monto', sortable: true }
        ],
    })
}
</script>

<style>

</style>
