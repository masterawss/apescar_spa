<template lang="pug">
    q-list
        .text-h5.q-ml-md Pedidos
        q-item(v-for="pedido in pedidos")
            q-item-section
                q-item-label {{ pedido.empresa.razon_social }}
                q-item-label(caption ) {{ pedido.mensaje_interesado }}
                .row.text-grey
                    .col-6
                        | Cantidad
                    .col-6
                        | Fecha esperada

            q-item-section(side top)
                q-item-label(caption) {{ pedido.created_at }}
</template>

<script>
export default {
    props: ['pedidos']
}
</script>

<style>

</style>
