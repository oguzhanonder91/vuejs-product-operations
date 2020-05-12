<template>
  <div class="container">
    <div class="row">
      <div class="col-6 offset-3 pt-3 card mt-5 shadow">
        <div class="card-body">
          <h3>Kayıt Ol</h3>
          <hr>
          <div class="form-group">
            <label>Ad</label>
            <input type="text" v-model="user.name" class="form-control" placeholder="İsim Giriniz">
          </div>
          <div class="form-group">
            <label>Soyad</label>
            <input type="text" v-model="user.surname" class="form-control" placeholder="Soyisim Giriniz">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="text" v-model="user.email" class="form-control" placeholder="Mail Adresininizi Giriniz">
          </div>
          <div class="form-group">
            <label>Şifre</label>
            <input type="password" v-model="user.password" class="form-control" placeholder="Şifrenizi Giriniz">
          </div>
          <div class="form-group">
            <label>Şifre Tekrar</label>
            <input type="password" v-model="user.matchingPassword" class="form-control"
                   placeholder="Şifrenizi Tekrar Giriniz">
          </div>
          <hr>
          <button class="btn btn-primary" @click="createUser">Kayıt Ol</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        user: {
          name: null,
          surname: null,
          email: null,
          password: null,
          matchingPassword: null,
          roleCode: "USER"
        }
      }
    },
    methods: {
      createUser() {
        this.$store.dispatch("userRegister", this.user)
          .then(res => {
            if (res) {
              this.$router.push("/login");
            }
          })
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 20px;
    padding: 20px;
  }
</style>
