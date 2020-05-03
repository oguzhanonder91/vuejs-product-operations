<template>
  <div id="app">
    <Header></Header>
    <transition name="fade" mode="out-in">
      <RouterView></RouterView>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'

  export default {
    name: 'app',
    components: {Header, Footer},
    data() {
      return {}
    },
    created() {
      if (this.$store.state.isLogin == null) {
        this.$store.dispatch("initIsLogin");
      }
      if (this.$store.state.isLogin) {
        this.$store.dispatch("getTradeResult");
        this.$store.dispatch("initApp");
      }

    }
  }
</script>

<style>
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity .3s ease-out;
  }

  .fade-leave {

  }

  .fade-leave-active {
    transition: opacity .3s ease-out;

  }
</style>
