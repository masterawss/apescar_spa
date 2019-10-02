<template lang="pug">
    q-card
        .bg-primary(style="height: 70px; width: 100%")
        //- q-img(
            src="https://placeimg.com/500/300/nature"
            :ratio="28/9")
        q-card-section(v-ripple clickable @click="$router.push({name: 'empresa.show', params: {id: empresa.id}})")
            q-avatar.bg-white.smooth-shadow(size="100px" style="margin-top: -70px" )
                img(:src="empresa.url_imagen")
            strong {{empresa.razon_social}}
            p.q-mt-md {{empresa.descripcion}}
            p.text-grey 
                q-icon(name="phone")
                span &nbsp &nbsp {{ empresa.telefono }}
                br
                q-icon(name="location_on") 
                span &nbsp &nbsp {{ empresa.direccion }}
                br
                q-icon(name="email") 
                span &nbsp &nbsp {{ empresa.email }}
                w-chip-estado-empresa( v-if="empresa.estado" :estado="empresa.estado.descripcion")
        //- q-card.smooth-shadow
            q-card-section
                q-list.text-grey-9( padding class="rounded-borders")
                    q-item-label(header) Información de contacto
                    q-item(v-ripple)
                        q-item-section(avatar)
                            q-icon.q-mr-sm(name="phone")
                        q-item-section
                            | {{ empresa.telefono }}
                    q-item(v-ripple)
                        q-item-section(avatar)
                            q-icon.q-mr-sm(name="location_on")
                        q-item-section
                            | {{ empresa.direccion }}
                    q-item(v-ripple)
                        q-item-section(avatar)
                            q-icon.q-mr-sm(name="mail")
                        q-item-section
                            | {{ empresa.email }}

    //- .row.q-col-gutter-md.q-my-sm
    //-     .col-md-8
    //-         q-card.smooth-shadow
    //-             q-card-section
    //-                 .row.items-center
    //-                     .col-auto
    //-                         q-avatar.smooth-shadow.q-mr-lg(size="90px")
    //-                             img(:src=" empresa.url_imagen")
    //-                     .col
    //-                         .text-h5 {{ empresa.razon_social }}
    //-     .col-md-4
    //-         q-card.smooth-shadow
    //-             q-card-section
    //-                 q-list.text-grey-9( padding class="rounded-borders")
    //-                     q-item-label(header) Información de contacto
    //-                     q-item(v-ripple)
    //-                         q-item-section(avatar)
    //-                             q-icon.q-mr-sm(name="phone")
    //-                         q-item-section
    //-                             | {{ empresa.telefono }}
    //-                     q-item(v-ripple)
    //-                         q-item-section(avatar)
    //-                             q-icon.q-mr-sm(name="location_on")
    //-                         q-item-section
    //-                             | {{ empresa.direccion }}
    //-                     q-item(v-ripple)
    //-                         q-item-section(avatar)
    //-                             q-icon.q-mr-sm(name="mail")
    //-                         q-item-section
    //-                             | {{ empresa.email }}

</template>

<script>
import { QAvatar, QImg } from 'quasar'
import WChipEstadoEmpresa from './ChipEstadoEmpresa'
export default {
    props: ['empresa'],
    components: {QAvatar, QImg, WChipEstadoEmpresa}
}
</script>

<style>

</style>
