<template>
  <div class="container">
    <div class="row">
      <div class="col-6 offset-3 pt-3 card mt-5 shadow">
        <div class="card-body">
          <h3>Login</h3>
          <hr>
          <div class="form-group">
            <label>Email</label>
            <input type="text" v-model="loginRequest.username" class="form-control"
                   placeholder="Mail Adresininizi Giriniz">
          </div>
          <div class="form-group">
            <label>Şifre</label>
            <input type="password" v-model="loginRequest.password" class="form-control" placeholder="Şifrenizi Giriniz">
          </div>
          <hr>

          <button class="btn btn-primary" @click="login">Giriş Yap</button>
          <router-link style="padding-left: 5px" to="/register">Kayıt Ol</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        loginRequest: {
          username: null,
          password: null
        },
      }
    },
    methods: {
      login() {
        this.$store.dispatch("login", this.loginRequest)
          .then(res => {
            this.$store.dispatch("getTradeResult");
            this.$store.dispatch("initApp");
            this.$router.push("/");
          })
      },
    },
  }
</script>

<style scoped>
  .container {
    margin-top: 40px;
    padding: 40px;
  }
</style>
