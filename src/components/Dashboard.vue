<template>
  <div v-if="getIsLogin">
    <Trade></Trade>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Trade from "./Trade";

  export default {
    name: 'Dashboard',
    components: {Trade},
    data() {
      return {}
    },
    methods: {},
    computed: {
      ...mapGetters(["getIsLogin"]),
    }
  }
</script>
