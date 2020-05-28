<template>
  <div v-if="getIsLogin" class="container">
    <div class="row">
      <div class="col-12 mb-5 card mt-5 shadow">
        <div class="card-body">
          <h3>Ürün Listesi</h3>
          <hr>
          <table class="table table-hover table-striped table-bordered">
            <thead>
            <th>id</th>
            <th>Ürün Adı</th>
            <th>Kalan Adet</th>
            <th>Satılan Adet</th>
            <th>Fiyat</th>
            <th>Açıklama</th>
            </thead>
            <tbody>
            <tr v-for="product in getProductList">
              <td class="align-middle text-center"><span class="badge badge-info"> {{product.id}} </span></td>
              <td class="align-middle text-center"> {{product.title}}</td>
              <td class="align-middle text-center" :class="getCountClass(product.count)"> {{product.count}}</td>
              <td class="align-middle text-center"> {{product.sellCount}}</td>
              <td style="width: 120px;"> {{product.price | currency}}</td>
              <td class="align-middle"> {{product.description}}</td>
            </tr>
            </tbody>
          </table>
          <div v-if="getProductList == null || getProductList.length === 0" class="alert alert-warning">
            <strong>Henüz Burada Bir Kayıt Bulamadık</strong>
            <br>
            <small>Kayıt Eklemek için Ürün İşlemleri menüsünden yararlanabilirsiniz
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "ProductList",
    computed: {
      ...mapGetters(["getProductList","getIsLogin"]),
    },
    methods: {
      getCountClass(count) {
        return {
          'btn-danger text-white': count <= 0,
          'btn-success text-white': count > 0
        }
      }
    }
  }

  // Computed ' a parametre gönderemiyoruz.
</script>

<style scoped>

</style>
