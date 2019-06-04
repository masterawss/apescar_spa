<template lang="pug">
  q-layout(view='lHh Lpr lFf')
    q-header
      q-toolbar.q-mx-lg-xl.q-px-lg-xl(v-if="$q.screen.lt.sm")
        q-btn(flat dense round @click='leftDrawerOpen = !leftDrawerOpen' aria-label='Menu')
          q-icon(name='menu')

        q-toolbar-title
          q-avatar(@click="$router.push({name: 'index'})")
            img(src="/statics/logo2.png")
          | &nbsp apescar

      q-toolbar.q-mx-lg-xl.q-px-lg-xl(v-else)
        
        q-toolbar-title
          q-avatar(@click="$router.push({name: 'index'})")
            img(src="/statics/logo2.png")
          | &nbsp apescar
          
        q-btn(v-if="isAuth" flat label="Ofertas" @click="$router.push({name: 'oferta.index'})")
        q-btn(v-if="isAuth" flat label="Demandas" @click="$router.push({name: 'demanda.index'})")
        // q-btn(flat label="Empresas" @click="$router.push({name: 'empresa.index'})")
        

        q-btn.q-mx-md(v-if="isAuth" flat round icon="notifications_none")
        
        .q-mr-lg-xl.q-pr-lg-md
          q-btn-dropdown( v-if="isAuth" :label="user.nombre" flat)
            q-list
              q-item(clickable v-close-popup @click="$router.push({name: 'empresa.show', params: { id: empresa.id } })")
                q-item-section
                  q-item-label Perfil
              q-item(clickable v-close-popup)
                q-item-section
                  q-item-label Configuración
              q-item(clickable v-close-popup @click="logout")
                q-item-section
                  q-item-label Salir
        
          
        // div Quasar v{{ $q.version }}
     
    q-drawer.smooth-shadow( v-if="$q.screen.lt.sm" v-model='leftDrawerOpen' content-class='smooth-shadow')
      q-list
        q-item-label(header) Essential Links
        q-item(clickable tag='a' target='_blank' href='http://v1.quasar-framework.org')
          q-item-section(avatar)
            q-icon(name='school')
          q-item-section
            q-item-label Docs
            q-item-label(caption) v1.quasar-framework.org
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
    openURL,
    logout () {
      this.$store.commit('auth/logout')
      this.$router.push({name: 'index'})
    }
  },
  computed: {
    isAuth(){
        return this.$store.state.auth.is_auth
    },
    user(){
      return this.$store.state.auth.info.user
    },
    empresa(){
      return this.$store.state.auth.info.empresa
    }
  }
}
</script>

<style>
</style>
