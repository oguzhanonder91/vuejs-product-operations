<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Change Password</h1>
                <p class="text-muted">{{message}}</p>
                <div v-if="this.key === 'valid'">
                  <CInput
                    v-model="passwordDto.password"
                    placeholder="Password"
                    type="password"
                    autocomplete="new-password"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-lock-locked"/>
                    </template>
                  </CInput>
                  <CInput
                    v-model="passwordDto.matchingPassword"
                    placeholder="Repeat password"
                    type="password"
                    autocomplete="new-password"
                    class="mb-4"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-lock-locked"/>
                    </template>
                  </CInput>
                  <CButton color="success" @click="changePassword" block>Change Password</CButton>
                </div>
                <CButton color="primary" @click="goToLoginPage" block>Go to Login Page</CButton>
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
    name: "ChangePassword",
    data() {
      return {
        passwordDto: {
          password: null,
          matchingPassword: null
        },
        message: null,
        key: null,
        id: null
      }
    },
    methods: {
      changePassword() {
        this.$store.dispatch("changePassword", [this.id ,this.passwordDto]);
      },
      goToLoginPage() {
        util.common.routePush("login");
      }
    },
    created() {
      let split = this.$route.path.split("/");
      let param1 = split[split.length - 2];
      let param2 = split[split.length - 1];
      if (param1 !== undefined && param1.length > 0 && param2 !== undefined && param2.length > 0) {
        this.$store.dispatch("changePasswordTokenControl", {param1, param2})
          .then(res => {
            if (res) {
              this.message = res.body.message;
              this.key = res.body.key;
              this.id = res.body.data;
            }
          })
      }

    }
  }
</script>

<style scoped>

</style>
