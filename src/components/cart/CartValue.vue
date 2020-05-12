<template>
  <div class="cart-value__container">
    <div class="cart-discount" v-if="discount > 0">
      <span class="cart-discount__title">Discount</span>
      <span class="cart-discount__value">-{{ discountFormatted }}</span>
    </div>
    <div class="cart-total-price">
      <span class="cart-total-price__title">Total</span>
      <span class="cart-total-price__value">{{ totalPriceWithDiscount }}</span>
    </div>
  </div>
</template>

<script>
import addCurrency from '@/utils/currency';

export default {
  name: 'CartValue',
  computed: {
    totalPriceWithDiscount() {
      return addCurrency(this.$store.getters.getTotalPriceWithDiscount);
    },
    discount() {
      return this.$store.getters.getDiscount;
    },
    discountFormatted() {
      return addCurrency(this.$store.getters.getDiscount);
    },
  },
};
</script>

<style scoped>
  .cart-value__container {
    padding: 20px 0;
    border-top: 1px solid var(--border);
    background: #fff;
  }

  .cart-discount {
    display: flex;
    justify-content: space-between;
  }

  .cart-discount__title {
    font-size: 14px;
    text-transform: uppercase;
    font-weight: bold;
    color: red;
  }

  .cart-discount__value {
    font-size: 14px;
    color: red;
  }

  .cart-total-price {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  .cart-total-price__title {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
  }

  .cart-total-price__value {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    color: var(--primary);
  }
</style>
