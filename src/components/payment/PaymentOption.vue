<template>
  <div class="payment-option__container">
    <h1>Select Payment Options</h1>
    <div class="payment-options">
      <div class="payment-option payment-option__selected">
        Pay By Cash
      </div>
      <div class="payment-option payment-option__deselected">
        Pay By Credit Card
      </div>
    </div>
    <PayByCash />
  </div>
</template>

<script>
import PayByCash from '@/components/payment/PayByCash.vue';

export default {
  name: 'PaymentOption',
  components: { PayByCash },
};
</script>

<style scoped>
  h1 {
    font-size: 24px;
    text-align: left;
    margin: 0 0 25px 0;
    text-transform: uppercase;
  }

  .payment-option__container {
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 5px;
    width: 100%;
    max-width: 500px;
    margin-right: 30px;
    height: fit-content;
    max-height: 100%;
  }

  .payment-options {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .payment-option {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 80px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    margin-right: 15px;
    cursor: pointer;
    text-align: center;
  }

  .payment-option:nth-last-child(1) {
    margin-right: 0;
  }

  .payment-option__selected {
    background: var(--primary);
    color: #fff;
  }

  .payment-option__deselected {
    background: var(--grey);
    color: var(--border);
  }

  @media (max-width: 1023px) {
    .payment-option__container {
      margin: 0 auto;
    }
  }
</style>
