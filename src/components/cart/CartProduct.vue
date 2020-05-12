<template>
  <div class="cart-product__container">
    <img
      class="cart-product__img"
      v-bind:src="product.cover"
      v-bind:alt="product.title"
    />
    <div class="cart-product__info">
      <div class="cart-product__name">{{ product.title }}</div>
      <div class="cart-product__price">{{ totalPrice }}</div>
      <div class="cart-product__info-btm">
        <span class="cart-delete" @click="removeFromCart">Delete</span>
        <div class="cart-product__qty">
          <span class="cart-product__qty-cta" @click="decreaseQty">-</span>
          <span class="cart-product__qty-item">{{ product.quantity }}</span>
          <span class="cart-product__qty-cta" @click="increaseQty">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addCurrency from '@/utils/currency';

export default {
  name: 'CartProduct',
  props: {
    product: {
      id: String,
      cover: String,
      title: String,
      price: String,
      quantity: Number,
    },
  },
  computed: {
    totalPrice() {
      const price = this.product.price * this.product.quantity;
      return addCurrency(price);
    },
  },
  methods: {
    removeFromCart() {
      this.$store.dispatch('removeFromCart', this.product);
    },
    increaseQty() {
      const product = { ...this.product, quantity: 1 };
      this.$store.dispatch('increaseQty', product);
    },
    decreaseQty() {
      if (this.product.quantity === 1) { return; }
      const product = { ...this.product, quantity: 1 };
      this.$store.dispatch('decreaseQty', product);
    },
  },
};
</script>

<style scoped>
  .cart-product__container {
    display: flex;
    margin-bottom: 30px;
  }

  .cart-product__img {
    width: 50px;
  }

  .cart-product__info {
    margin-left: 15px;
    width: 100%;
  }

  .cart-product__info-btm {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  .cart-product__name {
    display: block;
    font-size: 14px;
  }

  .cart-product__qty {
    width: 100px;
    font-size: 14px;
    border: 1px solid var(--border);
    height: 30px;
    display: flex;
  }

  .cart-product__qty-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    cursor: pointer;
  }

  .cart-product__qty-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .cart-product__price {
    font-size: 14px;
    font-weight: bold;
    margin-top: 15px;
    color: var(--primary);
  }

  .cart-delete {
    align-self: flex-end;
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
    text-transform: uppercase;
    color: var(--border);
  }
</style>
