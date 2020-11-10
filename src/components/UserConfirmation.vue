<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>User Confirmation</h1>
                <p class="text-muted">{{message}}</p>
                <div v-if="this.key === 'valid'">
                  <CAlert
                    :show.sync="currentAlertCounter"
                  >
                    You will be redirected to Login page in {{currentAlertCounter}} seconds.
                    <CProgress
                      :max="10"
                      :value="currentAlertCounter"
                      height="3px"
                      color="primary"
                      animate
                    />
                  </CAlert>
                  <p>If you don't want to wait please click</p>
                </div>
                <CButton  v-if = "this.key !== 'valid'" @click="reSend" block color="success">Resend Confirmation Code</CButton>
                <CButton @click="goToLogin" color="primary" block>Go to Login Page</CButton>
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
    name: "UserConfirmation",
    data() {
      return {
        message: "",
        currentAlertCounter: 0,
        key: "",
        id : ""
      }
    },
    methods: {
      goToLogin() {
        util.common.routePush("login");
      },
      reSend(){
        this.$store.dispatch("reSendConfirmation", this.id)
      }
    },
    watch: {
      currentAlertCounter: function (val) {
        if (val === 0) {
          util.common.routePush("login");
        }
      }
    },
    created() {
      let split = this.$route.path.split("/");
      let param1 = split[split.length - 2];
      let param2 = split[split.length - 1];
      if (param1 !== undefined && param1.length > 0 && param2 !== undefined && param2.length > 0) {
        this.$store.dispatch("registerConfirm", {param1, param2})
          .then(res => {
            if (res) {
              this.message = res.body.message;
              this.key = res.body.key;
              this.id = res.body.data;
              this.currentAlertCounter = 10;
            }
          })
      }

    }
  }
</script>

<style scoped>

</style>
