<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            src="../assets/765-default-avatar.png"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <div class="text-center mt-1" style="height: 35px">
      <strong>{{getUser.name}} {{getUser.surname}}</strong>
    </div>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-user"/>
      Profile
    </CDropdownItem>
    <CDropdownItem @click="logout">
      <CIcon name="cil-lock-locked"/>
      Logout
    </CDropdownItem>


  </CDropdown>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'TheHeaderDropdownAccnt',
    data() {
      return {}
    },
    methods: {
      logout() {
        this.$store.dispatch("logout");
      }
    },
    computed: {
      ...mapGetters(["getUser"]),
    }
  }
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>
