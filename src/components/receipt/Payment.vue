<template>
  <div>
    <div class="receipt-payment__item">
      <span class="receipt-payment__title">Payment Type</span>
      <span>{{ paymentType }}</span>
    </div>
    <div class="receipt-payment__item">
      <span class="receipt-payment__title">Cash</span>
      <span>{{ cash }}</span>
    </div>
    <div class="receipt-payment__item">
      <span class="receipt-payment__title">Change</span>
      <span>{{ change }}</span>
    </div>
  </div>
</template>

<script>
import addCurrency from '@/utils/currency';

export default {
  name: 'ReceiptPayment',
  props: {
    payment: {
      payment_type: String,
      cash: Number,
      change: Number,
    },
  },
  computed: {
    paymentType() {
      return this.payment.payment_type.replace(/_/g, ' ');
    },
    cash() {
      return addCurrency(+this.payment.cash);
    },
    change() {
      return addCurrency(this.payment.change);
    },
  },
};
</script>

<style scoped>
  .receipt-payment__item {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    font-size: 14px;
    text-transform: uppercase;
  }

  .receipt-payment__title {
    font-weight: bold;
  }
</style>
