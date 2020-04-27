<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #563F7A">
    <router-link to ="/" class="navbar-brand">Ürün Listesi</router-link>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to ="/purchase" class="nav-link">Ürün İşlemleri</router-link>
        </li>
        <li class="nav-item">
          <router-link to ="/sell" class="nav-link">Ürün Çıkışı</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>
