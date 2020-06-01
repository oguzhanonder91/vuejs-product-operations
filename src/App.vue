<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


  export default {
    name: 'app',
    data() {
      return {}
    },
    created() {
      if (this.$store.getters.getIsLogin == null) {
        this.$store.dispatch("initIsLogin");
      }
      if (this.$store.getters.getIsLogin) {
        this.$store.dispatch("getTradeResult");
        this.$store.dispatch("initApp");
      }

    }
  }
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
