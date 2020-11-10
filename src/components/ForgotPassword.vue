<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Forgot Password</h1>
                <p class="text-muted">Enter your e-mail address registered on System below, and we will send the link to change your password to
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
                <CButton color="success" @click="sendEmail" block>Send</CButton>
                <CButton color="primary mt-2" @click="goToLogin" block>Login Page</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
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
