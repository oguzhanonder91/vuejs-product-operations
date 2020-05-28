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
          <h3>Ürün Çıkışı</h3>
          <hr>
          <div class="form-group">
            <label>Ürün Adı</label>
            <select v-model="selected" @change="changeProduct" class="form-control">
              <option
                v-for="product in getProductList"
                :value="product.id"
                :disabled="product.remaining == 0">
                {{product.title}}
              </option>
            </select>
          </div>
          <div v-if="selectedProduct!==null" class="card mb-2 border border-danger">
            <div class="card-body">
              <div class="row">
                <div class="col-12 text-center">
                  <div class="mb-3">
                    <span class="badge badge-info">Stok : {{selectedProduct.remaining}}</span>
                    <span class="badge badge-primary">Fiyat : {{selectedProduct.price | currency}}</span>
                  </div>
                  <p class="border border-warning p-2 text-secondary"> {{selectedProduct.description}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>Adet</label>
            <input type="number" v-model="sellCount" class="form-control" placeholder="Ürün adetini giriniz..">
          </div>
          <div class="form-group">
            <label>Satış Fiyatı</label>
            <input type="number" v-model="sellPrice" class="form-control" placeholder="Satış fiyatını giriniz..">
          </div>
          <hr>
          <button class="btn btn-primary" :disabled="saveEnabled" @click="sellProduct">Kaydet</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {productMixin} from '../util/productMixin';

  export default {
    name: "ProductSell",
    mixins: [productMixin],
    data() {
      return {
        selected: null,
        selectedProduct: null,
        sellCount: null,
        sellPrice: null,
        saveButtonClicked: false
      }
    },
    computed: {
      ...mapGetters(["getProductList", "getIsLogin"]),
      saveEnabled() {
        if (this.sellCount > 0 && this.selected != null && this.sellPrice > 0) {
          return false;
        } else {
          return true;
        }
      },
    },
    methods: {
      changeProduct() {
        let selectedProduct = this.$store.getters.getProduct(this.selected);
        this.selectedProduct = selectedProduct;
      },
      sellProduct() {
        if (this.sellCount > this.selectedProduct.remaining) {
          alert("Girilen miktar sayısı ürünün adedinden fazla olamaz");
          return;
        }
        this.saveButtonClicked = true;
        this.selectedProduct.sellCount = parseInt(this.sellCount);
        this.selectedProduct.sellPrice = this.sellPrice;
        this.$store.dispatch("sellProduct", this.selectedProduct);
      }
    },
    beforeRouteLeave(to, from, next) {
      if ((this.sellCount > 0 || this.selected != null || this.sellPrice > 0) && !this.saveButtonClicked) {
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
  .border-danger {
    border-style: dashed !important;
  }
</style>
