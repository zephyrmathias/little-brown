<template>
  <div class="total-price__container">
    <div class="total-price__item">
      <span>Sub-Total</span>
      <span>{{ totalPrice }}</span>
    </div>
    <div class="total-price__item discount" v-if="discount > 0">
      <span>Discount</span>
      <span>-{{ discountFormatted }}</span>
    </div>
    <div class="total-price__item total">
      <span>Total</span>
      <span>{{ totalWithDiscount }}</span>
    </div>
  </div>
</template>

<script>
import addCurrency from '@/utils/currency';

export default {
  name: 'ReceiptTotal',
  props: {
    total: {
      discount: Number,
      totalPrice: Number,
      totalWithDiscount: Number,
    },
  },
  computed: {
    totalPrice() {
      return addCurrency(this.total.totalPrice);
    },
    discount() {
      return this.total.discount;
    },
    discountFormatted() {
      return addCurrency(this.total.discount);
    },
    totalWithDiscount() {
      return addCurrency(this.total.totalWithDiscount);
    },
  },
};
</script>

<style scoped>
  .total-price__container {
    width: 100%;
    border-top: 1px solid var(--border);
    padding: 5px 0;
    margin: 30px 0;
  }

  .total-price__item {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    font-size: 14px;
    text-transform: uppercase;
  }

  .discount {
    color: var(--discount);
  }

  .total {
    color: var(--primary);
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 5px;
    border-bottom: 4px double var(--primary);
  }
</style>
