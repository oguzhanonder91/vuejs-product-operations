<template>
  <div id="app">
    <router-view></router-view>
    <CElementCover v-if ="this.$store.getters.getIsLoading"
      :boundaries="[{ sides: ['top', 'left'], query: '.media-body' }]"
      :opacity="0.8"
    >
      <h1 class="d-inline">Loading... </h1><CSpinner size="5xl" color="success"/>
    </CElementCover>
  </div>
</template>

<script>


  export default {
    name: 'app',
    data() {
      return {}
    },
    created() {
      /*if (this.$store.getters.getIsLogin == null) {
        this.$store.dispatch("initIsLogin");
      }*/
      if (this.$store.getters.getIsLogin) {
        this.$store.dispatch("getTradeResult");
        //this.$store.dispatch("initApp");
      }

    }
  }
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
