<template lang="pug">
  q-layout(view='hHh Lpr lFf')
    q-header
      q-toolbar.q-mx-lg-xl.q-px-lg-xl
        q-btn(flat dense round @click='leftDrawerOpen = !leftDrawerOpen' aria-label='Menu')
          q-icon(name='menu')
        q-toolbar-title
          q-avatar
            img(src="/statics/logo2.png")
          | &nbsp apescar
        
        q-btn(flat label="Ofertas" @click="$router.push({name: 'oferta.index'})")
        q-btn(flat label="Demandas" @click="$router.push({name: 'demanda.index'})")
        // q-btn(flat label="Empresas" @click="$router.push({name: 'empresa.index'})")
        q-btn.q-mx-md(flat round icon="notifications_none")
        .q-mr-lg-xl.q-pr-lg-md
          // q-btn.q-mr-lg-xl(color="secondary" label="" @click="login = true")
          q-btn-dropdown( label="Nombre de usuario" flat)
            q-list
              q-item(clickable v-close-popup)
                q-item-section
                  q-item-label Nombre de usuario
          
        // div Quasar v{{ $q.version }}
    // q-drawer.smooth-shadow( v-model='leftDrawerOpen' content-class='smooth-shadow')
    //   q-list
    //     q-item-label(header) Essential Links
    //     q-item(clickable tag='a' target='_blank' href='http://v1.quasar-framework.org')
    //       q-item-section(avatar)
    //         q-icon(name='school')
    //       q-item-section
    //         q-item-label Docs
    //         q-item-label(caption) v1.quasar-framework.org
    q-page-container
      q-dialog(
        v-model="login"
        :maximized="$q.platform.is.mobile"
        transition-show="slide-up"
        transition-hide="slide-down")
          w-login-card
      router-view
</template>

<script>
import { openURL, QAvatar, QDialog, QCard, QCardSection, QBtnDropdown } from 'quasar'
import WLoginCard from '../components/Login.vue'
export default {
  name: 'MyLayout',
  components: {QAvatar, WLoginCard, QDialog, QCard, QCardSection, QBtnDropdown},
  data () {
    return {
      login: false,
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
