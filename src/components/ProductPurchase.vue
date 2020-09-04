<template>
  <div>
    <h3 id ="productOperations">Ürün İşlemleri</h3>
    <CButton id="createButton"
      @click="createOperation"
      color="primary"
    >
      Yeni Kayıt
    </CButton>
    <MyModal
      title="Kayıt Ekranı"
      ok="Kaydet"
      cancel="İptal"
      :show.sync="modalShow"
      :processType= "process"
      @update:show="saveOrUpdateProduct"
    >
      <div>
        <CRow>
          <CCol sm="12">
            <CInput
              label="Adı"
              placeholder="Ürün Adı Giriniz"
              v-model="product.title"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CInput
              label="Adeti"
              placeholder="Ürün Adeti Giriniz"
              v-model="product.total"
              type="number"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CInput
              label="Fiyatı"
              placeholder="Ürün Fiyatı Giriniz"
              v-model="product.price"
              type="number"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CTextarea
              label="Açıklama"
              placeholder="Ürün Açıklama Giriniz"
              v-model="product.description"
            />
          </CCol>
        </CRow>
      </div>
    </MyModal>
    <MyModal
      title="Silme Onayı"
      ok="Sil"
      cancel="İptal"
      :show.sync="modalDeleteShow"
      processType= "delete"
      @update:show="deleteProduct"
    >
      <h3>{{product.title}}</h3> ürününü silmek istiyor musunuz ?
    </MyModal>

    <CCardBody
      color="white">
      <CDataTable
        :items="getProductList"
        :fields="fields"
        column-filter
        :table-filter="{
      label : 'Arama',
      placeholder : 'Arama yapılacak kelime ....'
      }"
        :items-per-page-select="{
       label : 'Sayfada gösterilecek adet : '
      }"
        :items-per-page="5"
        hover
        sorter
        striped
        bordered
        small
        fixed
        pagination
      >

        <template #show_details="{item, index}">
          <td class="py-2">
            <CButton
              color="primary"
              variant="outline"
              square
              size="sm"
              @click="editOperation(item)"
            >
              Güncelle
            </CButton>
          </td>
          <td class="py-2">
            <CButton
              color="danger"
              variant="outline"
              square
              size="sm"
              @click="deleteOperation(item)"
            >
              Sil
            </CButton>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import MyModal from "./MyModal";

  const fields = [

    {key: 'title', label: 'Ürün Adı', _style: 'width:40%'},
    {key: 'remaining', label: "Kalan Miktar"},
    {key: 'sellCount', label: "Satılan Miktar",},
    {key: 'price', label: "Fiyat",},
    {key: 'profit', label: "Kar / Zarar"},
    {key: 'description', label: "Açıklama", _style: 'width:50%;'},
    {
      key: 'show_details',
      label: 'İşlemler',
      _style: 'width:1%',
      sorter: false,
      filter: false
    }
  ]

  export default {
    name: "ProductPurchase",
    components: {MyModal},
    data() {
      return {
        product: {
          title: "",
          total: null,
          price: null,
          remaining: null,
          description: ""
        },
        modalShow: false,
        modalDeleteShow : false,
        process : 'create',
        fields,
      }
    },
    methods: {
      saveProduct() {
        this.product.remaining = this.product.total;
        this.$store.dispatch("saveProduct", this.product);
      },
      updateProduct(){

      },
      deleteProduct(value,e,type) {
        if (type === "delete") {
          // actions ile servera git
        }
      },
      saveOrUpdateProduct(value, e, type) {
        if (type === "create") {
          this.saveProduct();
        }
      },
      editOperation(value) {
        this.product = value;
        this.modalShow = true;
        this.process = 'update'
      },
      createOperation() {
        this.product = {};
        this.modalShow = true;
        this.process = 'create'
      },
      deleteOperation(value) {
        this.product = value;
        this.modalDeleteShow = true;
      },
    },
    created() {
      this.$store.dispatch("getAllProduct");
    },
    computed: {
      ...mapGetters(["getProductList"]),
      saveEnabled() {
        /* if (this.product.title.length > 0 && this.product.description.length > 0 && this.product.price > 0 && this.product.total > 0) {
           return false;
         } else {
           return true;
         }*/
      },
    },
  }
</script>

<style scoped>
#createButton {
  margin-bottom: 5px !important;
}
#productOperations {
  margin-bottom: 15px !important;
  margin-top: -15px !important;
}
</style>
