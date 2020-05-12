<template>
  <div class="product">
    <img
      class="product-img"
      v-bind:src="product.cover"
      v-bind:alt="product.title"
    >
    <div class="product-info">
      <span class="product-name">{{ product.title }}</span>
      <div class="product-price__container">
        <span>PRICE</span>
        <span class="product-price">{{ price }}</span>
      </div>
      <div class="product-actions">
        <div class="product-action__qty">
          <div class="product-action__btn" @click="decrease">-</div>
          <span class="product-action__quantity">{{ quantity }}</span>
          <div class="product-action__btn" @click="increase">+</div>
        </div>
        <div class="product-action__cta" @click="add">Add</div>
      </div>
    </div>
  </div>
</template>

<script>
import addCurrency from '@/utils/currency';

export default {
  name: 'Product',
  data() {
    return { quantity: 1 };
  },
  props: {
    product: {
      id: String,
      cover: String,
      title: String,
      price: String,
    },
  },
  methods: {
    decrease() {
      if (this.quantity === 1) { return; }
      this.quantity -= 1;
    },
    increase() {
      this.quantity += 1;
    },
    add() {
      const product = {
        id: this.product.id,
        cover: this.product.cover,
        title: this.product.title,
        price: this.product.price,
        quantity: this.quantity,
      };
      this.$store.dispatch('addToCart', product);
    },
  },
  computed: {
    price() {
      return addCurrency(this.product.price);
    },
  },
};
</script>

<style>
  .product {
    display: flex;
    width: 100%;
    margin-bottom: 30px;
  }

  .product:nth-last-child(1) {
    margin-bottom: 0;
  }

  .product-img {
    width: 150px;
  }

  .product-info {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
  }

  .product-name {
    font-size: 14px;
    font-weight: bold;
  }

  .product-price__container {
    font-size: 14px;
    margin-top: 15px;
  }

  .product-price {
    margin-left: 10px;
  }

  .product-actions {
    margin-top: 15px;
    display: flex;
    align-items: center;
  }

  .product-action__qty {
    font-size: 14px;
    border: 1px solid var(--border);
    height: 30px;
    width: 100px;
    display: flex;
  }

  .product-action__quantity {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .product-action__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    cursor: pointer;
  }

  .product-action__cta {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 60px;
    background: var(--primary);
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 0 10px;
    margin-left: 15px;
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    .product-img {
      width: 80px;
    }
  }
</style>
