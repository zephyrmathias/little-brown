<template>
  <div class="product-list__container">
    <h1>List of Books</h1>
    <input
      class="product-list__search"
      type="text"
      v-model="searchTerm"
      placeholder="Search Book Name"
    />
    <div class="product-list__body">
      <Product
        v-for="product in filteredProducts"
        :key="product.item"
        v-bind:product="product"
      />
    </div>
  </div>
</template>

<script>
import Product from '@/components/product/Product.vue';

export default {
  name: 'ProductList',
  components: {
    Product,
  },
  data() {
    return { searchTerm: '' };
  },
  props: {
    productList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    filteredProducts() {
      const regex = new RegExp(this.searchTerm, 'i');
      return this.productList.filter((product) => product.title.match(regex));
    },
  },
};
</script>

<style scoped>
  h1 {
    font-size: 24px;
    text-align: left;
    margin: 0 0 25px 0;
    text-transform: uppercase;
  }

  .product-list__container {
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 5px;
    width: 100%;
    max-width: 500px;
    margin-right: 30px;
    height: 100%;
  }

  .product-list__search {
    min-height: 30px;
    width: 100%;
    margin-bottom: 30px;
    background: #f0f0f0;
    border: 1px solid var(--border);
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .product-list__body {
    height: 100%;
    overflow: scroll;
  }

  @media (max-width: 1023px) {
    .product-list__container {
      height: 65vh;
      margin: 0 auto;
    }
  }
</style>
