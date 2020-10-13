<template>
  <div id="app">
    <router-view></router-view>
    <CElementCover v-if="getIsLoading"
                   :boundaries="[{ sides: ['top', 'left'], query: '.media-body' }]"
                   :opacity="0.8"
    >
      <h1 class="d-inline">Loading... </h1>
      <CSpinner size="5xl" color="success"/>
    </CElementCover>
    <CToaster :autohide="5000" position="top-right">
      <MyCToast :show.sync="getMyToast.show" :header="getMyToast.header">
        <CIcon :height="42" :name="getMyToast.icon"/>
        <b>{{getMyToast.message}}</b>
      </MyCToast>
    </CToaster>
  </div>
</template>

<script>

  import {mapGetters} from 'vuex';
  import MyCToast from "./components/MyCToast";


  export default {
    name: 'app',
    components: {MyCToast},
    data() {
      return {}
    },
    created() {
      if (this.getIsLogin) {
        this.$store.dispatch("getTradeResult");
        this.$store.dispatch("getUserAndMenus");
      }else{
        this.$store.dispatch("initIsLogin");
      }
    },
    computed: {
      ...mapGetters(["getIsLoading", "getMyToast","getIsLogin"]),
    }
  }
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
