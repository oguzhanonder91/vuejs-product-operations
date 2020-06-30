<template>

  <CContainer class="d-flex content-center min-vh-100">
    <CRow>
      <CCol>
        <CCardGroup>
          <CCard class="p-4">
            <CCardBody>
              <CForm>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <CInput
                  v-model="loginRequest.username"
                  placeholder="Email"
                  autocomplete="email"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  v-model="loginRequest.password"
                  placeholder="Password"
                  type="password"
                  autocomplete="current-password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CRow>
                  <CCol col="6" class="text-left">
                    <CButton color="primary" class="px-4" @click="login">Login</CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard
            color="primary"
            text-color="white"
            class="text-center py-5 d-sm-down-none"
            body-wrapper
          >
            <h2>Sign up</h2>
            <p>If you do not have an account yet, you can create an account by clicking the link below.</p>
            <CButton
              color="primary"
              class="active mt-3"
              @click="goToRegister"
            >
              Register Now!
            </CButton>
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>

</template>

<script>

  import * as util from '../util/util';

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
      },
      goToRegister(){
       util.common.routePush("register");
      }
    },
  }
</script>

<style scoped>
  .container {
    margin-top: 40px;
    padding: 40px;
  }
</style>
