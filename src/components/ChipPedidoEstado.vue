<template lang="pug">
    div
        q-chip(:color="color" dense text-color="white") {{ estado.descripcion }}
</template>

<script>
import {QChip} from 'quasar'
export default {
    props: ['estado'],
    components: {QChip},
    data: () => ({
        color: 'grey'
    }),
    created(){
        switch (this.estado.descripcion) {
            case 'Rechazado' :
                this.color = 'red'
                break;
            case 'Realizado' :
                this.color = 'green'
                break;
            case 'Sin confirmar' :
                this.color = 'deep-orange'
                break;
            default:
                break;
        }
    }
}
</script>

<style>

</style>
