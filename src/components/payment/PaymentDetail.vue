<template>
  <div class="payment-detail__container" v-if="paymentDetail">
    <div class="payment-detail__title">Payment Detail</div>
    <div class="payment-detail__item">
      <span class="payment-detail__item-title">Payment Type</span>
      <span class="payment-detail__item-value">{{ paymentType }}</span>
    </div>
    <div class="payment-detail__item">
      <span class="payment-detail__item-title">cash</span>
      <span class="payment-detail__item-value">{{ cash }}</span>
    </div>
    <div class="payment-detail__item">
      <span class="payment-detail__item-title">change</span>
      <span class="payment-detail__item-value">{{ change }}</span>
    </div>
  </div>
</template>

<script>
import addCurrency from '@/utils/currency';

export default {
  name: 'PaymentDetail',
  computed: {
    paymentDetail() {
      return this.$store.getters.getPayment;
    },
    paymentType() {
      return this.$store.getters.getPayment.payment_type.replace(/_/g, ' ');
    },
    cash() {
      return addCurrency(+this.$store.getters.getPayment.cash);
    },
    change() {
      return addCurrency(this.$store.getters.getPayment.change);
    },
  },
};
</script>

<style scoped>
  .payment-detail__container {
    margin-top: 20px;
    border: 1px solid var(--border);
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
  }

  .payment-detail__title {
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  .payment-detail__item {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    text-transform: uppercase;
  }

  .payment-detail__item-title {
    font-size: 14px;
    font-weight: bold;
  }

  .payment-detail__item-value {
    font-size: 14px;
  }
</style>
