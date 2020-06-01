<template>
  <div class="c-app">
    <TheSidebar v-if="getIsLogin"/>
    <CWrapper>
      <TheHeader v-if="getIsLogin"/>
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
        <TheFooter v-if="getIsLogin"/>
      </div>
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'
import {mapGetters} from 'vuex';

export default {
  name: 'TheContainer',
  components: {
    TheSidebar,
    TheHeader,
    TheFooter
  },
  computed:{
    ...mapGetters(["getIsLogin"]),
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
