<template lang="pug">
     q-page
        .row.justify-center.q-py-lg
            .col-lg-6.col-md-8.col-sm-12.col-xs-12
                img.fixed-bottom-right(src="../../statics/bg-ecommerce-1.jpg" height="400px")
                q-card.smooth-shadow(style="background: rgba(255,255,255,0.85)")
                    q-card-section.q-px-lg-xl.q-mx-lg-xl.transparent()
                        h4.text-center Nueva cuenta
                        .text-h6.text-center Obten 
                            strong.text-primary 3 meses 
                            | de acceso 
                            strong.text-primary gratuito.
                        q-form(ref="formNuevo" @submit="crear")
                            q-tab-panels(v-model="tab" animated transition-prev="jump-up" transition-next="jump-down" style="background: rgba(255,255,255,0.2)")
                                q-tab-panel(name="usuario")
                                    .text-center.text-body2.text-grey
                                        | Descuide, sus datos personales no serán compartidos públicamente en la plataforma, nos servirán para asociar sus datos y brindarle mayor información de nuestros servicios. 
                                    q-input(label="DNI" 
                                    v-model="usuario.dni" 
                                    type="number" 
                                    lazy-rules 
                                    :rules="[ val => val && val.length == 8 || 'Ingrese el dni']")

                                    q-input(
                                    label="Nombre" 
                                    v-model="usuario.nombre" 
                                    lazy-rules 
                                    :rules="[ val => val && val.length > 0 || 'Ingrese su nombre']")

                                    q-input(
                                    label="Teléfono" 
                                    v-model="usuario.telefono" 
                                    lazy-rules 
                                    :rules="[ val => val && val.length > 0 || 'Ingrese el teléfono']")

                                    q-input(
                                    label="Dirección" 
                                    v-model="usuario.direccion" 
                                    lazy-rules :rules="[ val => val && val.length > 0 || 'Ingrese su dirección']")

                                    q-input(
                                    label="Correo electrónico"  
                                    v-model="usuario.email" 
                                    type="email"
                                    lazy-rules :rules="[ val => val && val.length > 0 || 'Ingrese su dirección']")

                                    q-input(
                                    label="Contraseña"          
                                    v-model="usuario.password" 
                                    type="password"
                                    lazy-rules :rules="[ val => val && val.length > 5 || 'Ingrese una contraseña segura']")

                                    q-input(
                                    label="Confirmar contraseña" 
                                    v-model="usuario.confirm_password" 
                                    type="password"
                                    lazy-rules :rules="[ val => val && val == usuario.password || 'Las contraseñas no coinciden']")

                                    q-btn.text-center.q-mt-md(label="Siguiente" @click="tab = 'empresa'" color="secondary" rounded)
                                q-tab-panel(name="empresa")
                                    q-input(label="RUC"                     
                                    v-model="empresa.ruc" 
                                    type="number"
                                    lazy-rules :rules="[ val => val && val.length == 11  || 'Formato de RUC no válido']"
                                    )
                                    q-input(label="Razón social"            
                                    v-model="empresa.razon_social"
                                    lazy-rules :rules="[ val => val && val.length > 0 || 'Ingrese razón social de la empresa']")
                                    
                                    q-input(label="Dirección de la empresa" 
                                    v-model="empresa.direccion"
                                    lazy-rules :rules="[ val => val && val.length > 0 || 'Ingrese la dirección de la empresa']")

                                    q-input(label="Email de la empresa"
                                    v-model="empresa.email"
                                    lazy-rules :rules="[ val => val && val.length > 0 || 'Ingrese el correo electrónico de la empresa']")

                                    q-input(label="Teléfono de la empresa"  v-model="empresa.telefono"
                                    lazy-rules :rules="[ val => val && val.length > 0 || 'Ingrese el teléfono de la empresa']")

                                    q-btn.text-center.q-mt-md(label="Atrás" @click="tab = 'usuario'" flat)
                                    q-btn.text-center.q-mt-md(label="Crear" type="submit" color="secondary" rounded)
                            
                        
</template>

<script>
import { QTabPanels, QTabPanel, QForm } from 'quasar'
import gql from 'graphql-tag'
export default {
    components: { QTabPanels, QTabPanel, QForm },
    data: () => ({
        tab: 'usuario',
        // usuario: {
        //     dni: 71212729,
        //     nombre: "asd",
        //     telefono: "89732",
        //     direccion: "Jr.Amorarc a",
        //     email: "willsito@gmail.com",
        //     password: "admin123",
        //     confirm_password: "admin123",
        // },
        // empresa: {
        //     ruc: 12345678987,
        //     razon_social: "Wmprea de wilsito",
        //     direccion: "Jr Callao",
        //     email: "wilsito@gmail.com",
        //     telefono: "924212321"
        // }
        usuario: {
            dni: null,
            nombre: null,
            telefono: null,
            direccion: null,
            email: null,
            password: null,
            confirm_password: null,
        },
        empresa: {
            ruc: null,
            razon_social: null,
            direccion: null,
            email: null,
            telefono: null
        }
    }),
    methods: {
        crear(){
            this.$refs.formNuevo.validate().then(success => {
                this.$apollo.mutate({
                    mutation: gql`mutation crearCuenta(
                        $UsuarioNuevo: UsuarioNuevo!, 
                        $EmpresaNuevo: EmpresaNuevo!)
                        {
                        crearCuenta(
                            usuario: $UsuarioNuevo,
                            empresa: $EmpresaNuevo){
                                auth_token{
                                    token_type
                                    access_token
                                }
                                user{
                                    id
                                    email
                                    nombre
                                }
                                empresa{
                                    id
                                    razon_social
                                }
                                email_exists
                                dni_exists
                                ruc_exists
                        }
                    }`,
                    variables: {
                        UsuarioNuevo: this.usuario,
                        EmpresaNuevo: this.empresa
                    }
                }).then(response => {
                    this.cargando = false

                    if (response.data.crearCuenta.email_exists) {
                        this.$q.notify({message: 'El correo electrónico ya está registrado.', color: 'red'})
                        return
                    }
                    if (response.data.crearCuenta.dni_exists) {
                        this.$q.notify({message: 'El DNI ya está registrado.', color: 'red'})
                        return
                    }
                    if (response.data.crearCuenta.ruc_exists) {
                        this.$q.notify({message: 'El RUC ya está registrado.', color: 'red'})
                        return
                    }

                    if(response.data.crearCuenta.auth_token !== null){
                        console.log('Iniciando sesion');
                        let auth = JSON.parse(JSON.stringify(response.data.crearCuenta))
                        this.$store.commit('auth/login', auth)
                        console.log('Datos en el card login al iniciar sesion:', this.$store.state.auth.info);
                        this.$router.push({name: 'index'})
                    }else{
                        this.$q.notify({
                            color: 'red',
                            message: 'Error iniciando sesión.'
                        })
                    }
                    // console.log(data);
                    this.$q.notify({ color: 'green', message: 'creado correctamente.' })
                    
                }).catch(e => {
                    console.log('Error creando cuenta', e);
                    this.$q.notify({ color: 'red', message: 'Error creando cuenta.' })
                })
            })
            .catch(e => {
                this.$q.notify({ color: 'red', message: 'Llene correctamente los campos.' })
            })
        }
    }

}
</script>

<style>

</style>
