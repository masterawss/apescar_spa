<template lang="pug">

    div
        q-card.smooth-shadow
            q-card-section
                .q-mx-md
                    q-avatar.smooth-shadow.q-mr-lg(size="90px")
                        img(:src=" empresa.url_imagen")
                    .text-h6.text-primary {{ empresa.razon_social }}
                    q-btn.q-my-sm(v-if="$store.state.auth.info.empresa.id == empresa.id" flat label="editar perfil" icon="edit" @click="$router.push({name: 'configuracion.index'})" color="secondary")

                q-list.text-grey-9.q-mt-md( padding class="rounded-borders")
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
import { QAvatar } from 'quasar'
export default {
    props: ['empresa'],
    components: {QAvatar}
}
</script>

<style>

</style>
