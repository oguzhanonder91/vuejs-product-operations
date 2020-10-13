<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show=" (value)=> sideBarMinimize( ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon
        class="c-sidebar-brand-full"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 556 134"
      />
      <CIcon
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      />
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="this.$store.getters.getShowMenus"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="sideBarMinimize( ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>

export default {
  name: 'TheSidebar',
  methods : {
    sideBarMinimize(param){
      this.$store.commit("set",param);
    }
  },
  computed: {
    show () {
      return this.$store.state.sidebarShow
    },
    minimize () {
      return this.$store.state.sidebarMinimize
    }
  }
}
</script>
