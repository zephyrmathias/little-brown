<template>
  <div class="receipt-product">
    <img
      class="receipt-product__img"
      v-bind:src="product.cover"
      v-bind:alt="product.title"
    />
    <div class="receipt-product__info">
      <div class="receipt-product__name">{{ product.title }}</div>
      <div class="receipt-product__price">
        <span>Price</span>
        <span class="receipt-product__price-value">
          {{ price }}
        </span>
      </div>
      <div class="receipt-product__qty">
        <span>Quantity</span>
        <span class="receipt-product__qty-value">
          {{ product.quantity }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import addCurrency from '@/utils/currency';

export default {
  name: 'ReceiptProduct',
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
    price() {
      return addCurrency(this.product.price);
    },
  },
};
</script>

<style scoped>
  .receipt-product {
    margin-top: 30px;
    display: flex;
  }

  .receipt-product__img {
    width: 100px;
  }

  .receipt-product__info {
    margin-left: 15px;
  }

  .receipt-product__name {
    font-size: 14px;
  }

  .receipt-product__price,
  .receipt-product__qty {
    margin-top: 15px;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    width: 120px;
    display: flex;
    justify-content: space-between;
  }

  .receipt-product__price-value,
  .receipt-product__qty-value {
    color: var(--primary);
    margin-left: 15px;
  }
</style>
