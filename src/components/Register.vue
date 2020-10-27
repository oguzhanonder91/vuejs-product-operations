<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <CInput
                  v-model="user.name"
                  placeholder="Name"
                  autocomplete="name"
                >
                  <template #prepend-content>
                    <CIcon name="cil-user"/>
                  </template>
                </CInput>
                <CInput
                  v-model="user.surname"
                  placeholder="Surname"
                  autocomplete="surname"
                >
                  <template #prepend-content>
                    <CIcon name="cil-user"/>
                  </template>
                </CInput>
                <CInput
                  v-model="user.email"
                  placeholder="Email"
                  autocomplete="email"
                  prepend="@"
                />
                <CInput
                  v-model="user.password"
                  placeholder="Password"
                  type="password"
                  autocomplete="new-password"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked"/>
                  </template>
                </CInput>
                <CInput
                  v-model="user.matchingPassword"
                  placeholder="Repeat password"
                  type="password"
                  autocomplete="new-password"
                  class="mb-4"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked"/>
                  </template>
                </CInput>
                <CButton color="success" @click="createUser" block>Create Account</CButton>
                <CButton color="info" @click="goToLoginPage" block>Go to Login Page</CButton>
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
      goToLoginPage() {
        util.common.routePush("login");
      },
      createUser() {
        this.$store.dispatch("userRegister", this.user);
      }
    }
  }
</script>

<style scoped>

</style>
