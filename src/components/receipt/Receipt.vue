<template>
  <div class="receipt__container">
    <span class="receipt__title">Receipt</span>
    <ReceiptProduct
      v-for="product in this.cart.products"
      :key="product.id"
      v-bind:product="product"
    />
    <TotalPrice v-bind:total="this.cart.total" />
    <ReceiptPayment v-if="this.payment" v-bind:payment="this.payment" />
  </div>
</template>

<script>
import ReceiptProduct from '@/components/receipt/ReceiptProduct.vue';
import TotalPrice from '@/components/receipt/TotalPrice.vue';
import ReceiptPayment from '@/components/receipt/Payment.vue';

export default {
  name: 'Receipt',
  props: {
    cart: {
      products: {
        type: Array,
      },
      total: {
        discount: Number,
        totalPrice: Number,
        totalWithDiscount: Number,
      },
    },
    payment: {
      payment_type: String,
      cash: Number,
      change: Number,
    },
  },
  components: {
    ReceiptProduct,
    TotalPrice,
    ReceiptPayment,
  },
};
</script>

<style scoped>
  .receipt__container {
    width: 100%;
    max-width: 500px;
    margin: 30px auto 15px;
    border-radius: 5px;
    border: 1px solid var(--border);
    padding: 20px;
    box-sizing: border-box;
  }

  .receipt__title {
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
  }
</style>
