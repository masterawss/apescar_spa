<template lang="pug">
    q-card.smooth-shadow.q-ma-lg
        q-card-section
            .text-center
                .text-h4 Contáctanos
                .q-mb-lg.text-grey-8 Para cualquier consulta no dude en contactarse con nosotros, estaremos gustosos de atenderle.
            .row
                .col-lg-8.col-12
                    v-map( style="height:400px ; width:100% " :center="plaza" api-key="AIzaSyC44MgE45RAPUXYrQpaZVa_zqNA3ZJ0HE4" :zoom="13")
                        v-marker(:position="cite")
                .col-lg-4.col-12
                    q-list
                        q-item
                            q-item-section(avatar)
                                q-icon(color="primary" name="location_on")
                            q-item-section Car. a Bello Horizonte km. 2.3  La Banda de Shilcayo - San Martín
                        q-item
                            q-item-section(avatar)
                                q-icon(color="primary" name="phone")
                            q-item-section #945 133 848 - 945 133 848
</template>

<script>
import { VMap, VMarker } from 'v-maps'
export default {
    computed: {
      cite() {
        return { lat: -6.514132, lng: -76.331565 }
      },
      plaza(){
          return { lat: -6.4877071, lng: -76.3599744 }
      }    
    },
    components: { VMarker, VMap }
}
</script>

<style>

</style>
