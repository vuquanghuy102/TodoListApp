<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import initData from './mixins/init_data';
import Index from './page/Index.vue';

export default {
  name: 'App',

  components: {
    Index
  },

  mixins: [initData],
}
</script>

<style scoped>
@import "./assets/css/main.css";
</style>