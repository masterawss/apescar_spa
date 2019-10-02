<template lang="pug">
    div
        q-chip(dense :color="color[estado]" text-color="white") {{estado}}
</template>

<script>
import {QChip} from 'quasar'
export default {
    props: ['estado'],
    components: {QChip},
    data: () => ({
        color: {
            activado : 'blue',
            pendiente: 'yellow',
            desactivado: 'red'
        }
    })
}
</script>

<style>

</style>
