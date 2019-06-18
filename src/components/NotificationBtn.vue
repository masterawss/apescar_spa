<template lang="pug">
    div
        q-btn.q-mx-md(v-if="isAuth" flat round icon="notifications_none" @click="$router.push({ name: 'notificaciones.show' })" )
            q-badge( v-show="cantidad_notificaciones > 0" color="red" floating) {{ cantidad_notificaciones }}
        //- | {{ user.id }}
</template>

<script>
import { QBadge } from 'quasar'
import gql from 'graphql-tag';
export default {
    components: {QBadge},
    created(){
        this.$apollo.query({
            query:  gql`query nuevasNotificaciones($count_unread: Boolean){
                notificaciones(count_unread: $count_unread){
                    total_unread
                }
            }`,
            variables: {
                count_unread: true
            }
        }).then(response => {
            console.log('RESPUESTA DE NOTIFIACIONES: ', response);
            this.cantidad_notificaciones = response.data.notificaciones[0].total_unread
        }).catch(e => {
            console.log('ERROR DE NOTIFIACIONES: ', e);
        })
    },
    mounted() {
        this.$echo.private('App.User.' + this.user.id)
        // .listen('.test', (payload) => {
        //     this.cantidad_notificaciones++
        //     // console.log('HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', payload);
        //     // console.log('HOLA LISTEN', payload);
        //     // console.log('CANTIDAD ', this.cantidad_notificaciones);
        // })
        .notification((object) => {
            this.cantidad_notificaciones++
            // console.log('HLA NOTIFICACION', object);
            // console.log('CANTIDAD ', this.cantidad_notificaciones);
        })
    },
    data: () => ({
        cantidad_notificaciones: 0
    }),
    computed: {
        isAuth(){
            return this.$store.state.auth.is_auth
        },
        user(){
            return this.$store.state.auth.info.user
        }
    }
}


// import Pusher from 'pusher-js' // import Pusher

// export default {
//   // ...
//   created () {
//     // ...
//     this.subscribe()
//   },
//   methods: {
//     // ...
//     subscribe () {
//     //   let pusher = new Pusher('11295f70c33fc0c62079', { cluster: 'us2' })
//     //   pusher.subscribe('App\\Events\\TestPublish')
//     //   pusher.bind('test', data => {
//     //     console.log('HOLOOOOOOOOOOOOOOOOOOOOOO', data);
//     //   })
//     }
//   },
//   computed: {
//         isAuth(){
//             return this.$store.state.auth.is_auth
//         }
//   }
// }
</script>

<style>

</style>
