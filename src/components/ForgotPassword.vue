<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CJumbotron>
          <h1 class="display-4">
            Forgot Password
          </h1>
          <p>Enter your e-mail address registered on System below, and we will send the link to change your password to
            your e-mail.</p>
          <CInput
            v-model="email"
            placeholder="Email"
            autocomplete="email"
          >
            <template #prepend-content>
              <CIcon name="cil-user"/>
            </template>
          </CInput>
          <CButton class="col-lg-12" @click="sendEmail" color="primary">Send</CButton>
          <CButton class="col-lg-12 mt-1" @click="goToLogin" color="primary">Login Page</CButton>
        </CJumbotron>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
  import * as util from '../util/util';

  export default {
    name: "ForgotPassword",
    data() {
      return {
        email: null
      }
    },
    created() {
      if (this.$store.getters.getIsLogin) {
        this.$store.dispatch("getTradeResult");
        this.$store.dispatch("getUserAndMenus");
        util.common.routePush("dashboard");
      }
    },
    methods: {
      sendEmail() {
        this.$store.dispatch("userForgotPassword",this.email);
      },
      goToLogin() {
        util.common.routePush("login");
      },
    }

  }
</script>

<style scoped>

</style>
