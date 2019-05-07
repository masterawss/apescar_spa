<template lang="pug">
    q-page
        .row.justify-center
            .col-9
                .row
                    .col-6(v-for="i in 6")
                        w-demanda-card
</template>
<script>
import WDemandaCard from '../../components/DemandaCard'
export default {
    components: { WDemandaCard }
}
</script>
<style>

</style>
