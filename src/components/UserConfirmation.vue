<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CJumbotron>
          <h1 class="display-4">
            <CAlert>
              {{message}}
            </CAlert>
          </h1>
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
          <CButton @click="goToLogin" color="primary">Go to Login Page</CButton>
        </CJumbotron>
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
        currentAlertCounter: 0
      }
    },
    methods: {
      goToLogin() {
        util.common.routePush("login");
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
      let param = split[split.length - 1];
      if (param !== undefined && param.length > 0) {
        this.$store.dispatch("registerConfirm", param)
          .then(res => {
            if (res) {
              this.message = res.bodyText;
              this.currentAlertCounter = 10;
            }
          })
      }

    }
  }
</script>

<style scoped>

</style>
