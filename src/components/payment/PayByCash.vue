<template>
  <div class="pay-by-cash">
    <span class="pay-by-cash__title">Pay By Cash</span>
    <div class="pay-by-cash__amount-to-pay">
      <span class="amount-to-pay__value">{{ totalPriceWithDiscount }}</span>
      <span class="amount-to-pay__title">Amount to Pay</span>
    </div>
    <div class="pay-by-cash__cash">
      <span class="pay-by-cash__cash-title">CASH</span>
      <input
        class="pay-by-cash__cash-input"
        type="number"
        v-model="cash"
        placeholder="Enter Cash Here..."
      />
    </div>
    <div class="pay-by-cash__error" v-if="error">
      {{ error }}
    </div>
    <div class="pay-by-cash__ctas">
      <button
        class="secondary-btn pay-by-cash__secondary-cta"
        @click="reset"
      >
        Reset
      </button>
      <button
        class="primary-btn pay-by-cash__primary-cta"
        @click="savePayByCash"
        :disabled="!cash"
        v-bind:class="{ 'disabled-btn': !cash }"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import addCurrency from '@/utils/currency';

export default {
  name: 'PayByCash',
  data() {
    return { cash: '', error: '' };
  },
  computed: {
    totalPriceWithDiscount() {
      return addCurrency(this.$store.getters.getTotalPriceWithDiscount);
    },
  },
  methods: {
    reset() {
      this.cash = '';
      this.error = '';
      this.$store.dispatch('resetPayment');
    },
    savePayByCash() {
      if (this.cash < this.$store.getters.getTotalPriceWithDiscount) {
        this.error = 'Not Enough Cash';
      } else {
        this.$store.dispatch('savePayByCash', this.cash);
        this.error = '';
      }
    },
  },
};
</script>

<style scoped>
  .pay-by-cash {
    width: 300px;
    border: 1px solid var(--border);
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 30px auto 0;
  }

  .pay-by-cash__title {
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .pay-by-cash__amount-to-pay {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
  }

  .amount-to-pay__value {
    font-size: 20px;
    font-weight: bold;
    color: var(--primary);
  }

  .amount-to-pay__title {
    font-size: 12px;
    margin-top: 5px;
    text-transform: uppercase;
  }

  .pay-by-cash__cash {
    margin-top: 20px;
  }

  .pay-by-cash__cash-title {
    font-size: 14px;
    margin-right: 15px;
  }

  .pay-by-cash__cash-input {
    min-height: 30px;
    margin-bottom: 30px;
    border: 1px solid var(--border);
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .pay-by-cash__primary-cta {
    width: 100px;
  }

  .pay-by-cash__secondary-cta {
    width: 100px;
    margin-right: 15px;
  }

  .pay-by-cash__error {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
    background: var(--error);
    color: var(--discount);
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
  }
</style>
