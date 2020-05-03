<template>
  <nav v-if="this.$store.state.isLogin" class="navbar fixed-bottom  navbar-light" style="background-color: #e3f2fd;">
    <span class="navbar-text mr-auto">
        <strong>Vuejs Çalışmaları</strong> | Oğuzhan ÖNDER
    </span>
    <span class="navbar-text navbar-nav my-2 my-lg-0 mr-3">
        <strong>Alış Tutarı : </strong>
        <span class="badge badge-danger">{{getTradeResult.purchase | currency}}</span>
    </span>
    <span class="navbar-text navbar-nav my-2 my-lg-0 mr-3">
        <strong>Satış Tutarı : </strong>
        <span class="badge badge-success">{{getTradeResult.sale | currency}}</span>
    </span>
    <span class="navbar-text navbar-nav my-2 my-lg-0">
        <strong>Bakiye : </strong>
        <span class="badge badge-primary">{{getTradeResult.balance | currency}}</span>
    </span>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "Footer",
    computed: mapGetters(["getTradeResult"])
  }
</script>

<style scoped>

</style>
