<template>
    <v-card class="overflow-hidden" style="border-radius: 0;">
      <v-app-bar
        color="#6A76AB"
        dark
        prominent
        src="https://picsum.photos/1920/1080?random"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template>
  
  
        <v-toolbar-title style="padding-left: 80px;">Vestuarios</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab to="/registro">Realizar un registro</v-tab>
  
            <v-tab to="/tabla">Administrar registros</v-tab>
  
            <v-tab to="/carrousel">Carrousel</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques-4"
        class="overflow-y-auto"
        max-height="600"
      >
      </v-sheet>
    </v-card>
  </template>

  <script>

    export default {
        data(){

        },
        methods: {
            llamarRegistro(){
                this.$router.push('/registro')
            },
            llamarTabla(){
                this.$router.push('/tabla')
            },
            llamarCarrousel(){
                this.$router.push('/carrousel')
            },
        }
    }
</script>