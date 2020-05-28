<template>
  <div v-if="getIsLogin" class="container">
    <div class="loading" :style="isLoading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 offset-3 pt-3 card mt-5 shadow">
        <div class="card-body">
          <h3>Ürün İşlemleri</h3>
          <hr>
          <div class="form-group">
            <label>Ürün Adı</label>
            <input type="text" class="form-control" v-model="product.title" placeholder="Ürün adını giriniz..">
          </div>
          <div class="form-group">
            <label>Adet</label>
            <input type="number" class="form-control" v-model="product.count" placeholder="Ürün adetini giriniz..">
          </div>
          <div class="form-group">
            <label>Fiyat</label>
            <input type="number" class="form-control" v-model="product.price" placeholder="Ürün fiyatı giriniz..">
          </div>
          <div class="form-group">
            <label>Açıklama</label>
            <textarea cols="30" rows="5" placeholder="Ürüne ait bir açıklama giriniz..."
                      v-model="product.description" class="form-control"></textarea>
          </div>
          <hr>
          <button @click="saveProduct" :disabled="saveEnabled" class="btn btn-primary">Kaydet</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {productMixin} from '../util/productMixin';
  import {mapGetters} from 'vuex';

  export default {
    name: "ProductPurchase",
    mixins: [productMixin],
    data() {
      return {
        product: {
          title: "",
          count: null,
          price: null,
          description: ""
        },
        saveButtonClicked: false
      }
    },
    methods: {
      saveProduct() {
        this.saveButtonClicked = true;
        this.$store.dispatch("saveProduct", this.product);
      }
    },
    computed: {
      saveEnabled() {
        if (this.product.title.length > 0 && this.product.description.length > 0 && this.product.price > 0 && this.product.count > 0) {
          return false;
        } else {
          return true;
        }
      },
      ...mapGetters(["getIsLogin"]),
    },
    beforeRouteLeave(to, from, next) {
      if ((this.product.title.length > 0 || this.product.description.length > 0 || this.product.price > 0 || this.product.count > 0) && !this.saveButtonClicked) {
        if (confirm("Kaydedilmemiş veriler var . Çıkmak İstediğinizden emin misiniz ? ")) {
          next()
        } else {
          next(false);
        }
      } else {
        next();
      }
    }
  }
</script>

<style scoped>

</style>
