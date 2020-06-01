<template>
  <CCardGroup class="mb-4">
    <CWidgetProgressIcon
      :header="getTradeResult.purchase | currency"
      text="TOPLAM ALIŞ TUTARI"
      color="warning"
      inverse
    >
      <CIcon name="cil-basket" height="36"/>
    </CWidgetProgressIcon>
    <CWidgetProgressIcon
      :header="getTradeResult.sale | currency"
      text="TOPLAM SATIŞ TUTARI"
      color="primary"
      inverse
    >
      <CIcon name="cil-chartPie" height="36"/>
    </CWidgetProgressIcon>
    <CWidgetProgressIcon
      :header="getTradeResult.balance | currency"
      text="BAKİYE"
      color="success"
      inverse
    >
      <CIcon name="cil-speedometer" height="36"/>
    </CWidgetProgressIcon>
  </CCardGroup>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "Trade",
    computed: mapGetters(["getTradeResult", "getIsLogin"])

  }
</script>

<style scoped>

</style>
