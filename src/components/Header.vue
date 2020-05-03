<template>
  <nav v-if="this.$store.state.isLogin" class="navbar navbar-expand-lg navbar-dark" style="background-color: #563F7A">
    <router-link to="/" class="navbar-brand">Ürün Listesi</router-link>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/purchase" class="nav-link">Ürün İşlemleri</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/sell" class="nav-link">Ürün Çıkışı</router-link>
        </li>
      </ul>
      <ul class="navbar-nav my-2 my-lg-0">
        <li class="nav-item">
          <a href="#" @click="logout" class="nav-link">Çıkış Yap</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "Header",
    methods:{
      logout(){
        this.$store.dispatch("logout")
          .then(res => {
            this.$router.push("/login");
          })
      }
    }
  }
</script>

<style scoped>

</style>
