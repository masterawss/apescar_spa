<template lang="pug">
    q-page
        .doc-container
            .row.justify-center
                .col-lg-9.col-12
                    w-producto-info
            
</template>
<style>

</style>

<script>
import WProductoInfo from '../components/ProductoInfoCard'
import { QCard, QCardSection } from 'quasar'
export default {
    components: { QCard, QCardSection, WProductoInfo},
    data: () => ({
        mensaje: 'Hola Anthony Will Solsol Soplin, poke eres feito?'
    })
}
</script>
