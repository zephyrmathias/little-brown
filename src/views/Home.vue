<template>
  <div class="home__container">
    <ProductList v-bind:productList="productList" />
    <div class="home__actions-container">
      <Cart />
      <router-link to="/payment">
        <button
          class="primary-btn home__actions-cta"
          v-bind:class="{ 'disabled-btn': totalProducts === 0 }"
          :disabled="totalProducts === 0"
        >
          Proceed to Next Step
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProductList from '@/components/product/ProductList.vue';
import Cart from '@/components/cart/Cart.vue';

export default {
  name: 'Home',
  components: {
    ProductList,
    Cart,
  },
  data() {
    return { productList: [] };
  },
  async mounted() {
    const config = {
      headers: { 'Access-Control-Allow-Origin': '*' },
    };
    const { data } = await axios.get(process.env.VUE_APP_API_URL, config);
    this.productList = data?.books;
  },
  computed: {
    totalProducts() {
      return this.$store.getters.getTotalProducts;
    },
  },
};
</script>

<style scoped>
  .home__container {
    display: flex;
    height: 100%;
  }

  .home__actions-container {
    height: 100%;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
  }

  .home__actions-cta {
    margin-top: 20px;
    width: 100%;
  }

  @media (max-width: 1023px) {
    .home__container {
      display: block;
      padding: 0 15px;
      box-sizing: border-box;
    }

    .home__actions-container {
      margin: 20px auto;
      max-width: 500px;
    }
  }
</style>
