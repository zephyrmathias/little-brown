<template>
  <div class="cart__container">
    <h1>Cart</h1>
    <CartEmpty v-if="totalProducts === 0" />
    <div class="cart__body" v-else>
      <CartProduct
        v-for="product in this.$store.state.cart.products"
        :key="product.id"
        v-bind:product="product"
      />
    </div>
    <CartValue />
  </div>
</template>

<script>
import CartEmpty from '@/components/cart/CartEmpty.vue';
import CartProduct from '@/components/cart/CartProduct.vue';
import CartValue from '@/components/cart/CartValue.vue';

export default {
  name: 'Cart',
  components: {
    CartEmpty,
    CartProduct,
    CartValue,
  },
  computed: {
    totalProducts() {
      return this.$store.getters.getTotalProducts;
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

  .cart__container {
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 5px;
    width: 100%;
    max-width: 400px;
    height: 100%;
    overflow: hidden;
  }

  .cart__body {
    height: 100%;
    overflow: scroll;
  }

  @media (max-width: 1023px) {
    .cart__container {
      height: 65vh;
      max-width: 500px;
    }
  }
</style>
