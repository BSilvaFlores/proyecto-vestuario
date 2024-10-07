<template>
  <v-app>
    <BarraNavegacion/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import BarraNavegacion from './components/BarraNavegacion.vue';

export default {
  name: 'App',
  components:{
    BarraNavegacion
  },
  data: () => ({
    //
  }),
};
</script>
