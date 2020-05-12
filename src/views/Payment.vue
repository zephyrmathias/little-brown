<template>
  <div class="payment__container">
    <PaymentOption />
    <div class="payment-action__container">
      <Cart />
      <PaymentDetail />
      <router-link to="/summary">
        <button
          class="primary-btn payment-action__primary-cta"
          v-bind:class="{'disabled-btn': !paymentDetail }"
          :disabled="!paymentDetail"
        >
          Proceed to Pay
        </button>
      </router-link>
      <router-link to="/">
        <button class="secondary-btn payment-action__secondary-cta" @click="onClickBack">
          Back
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import PaymentOption from '@/components/payment/PaymentOption.vue';
import Cart from '@/components/cart/Cart.vue';
import PaymentDetail from '@/components/payment/PaymentDetail.vue';

export default {
  name: 'Payment',
  components: {
    PaymentOption,
    Cart,
    PaymentDetail,
  },
  methods: {
    onClickBack() {
      this.$store.dispatch('resetPayment');
    },
  },
  computed: {
    paymentDetail() {
      return this.$store.getters.getPayment;
    },
    totalProducts() {
      return this.$store.getters.getTotalProducts;
    },
  },
  mounted() {
    if (!this.totalProducts) {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
  .payment__container {
    display: flex;
    height: 100%;
  }

  .payment-action__container {
    height: 100%;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
  }

  .payment-action__primary-cta {
    margin-top: 20px;
    width: 100%;
  }

  .payment-action__secondary-cta {
    margin-top: 15px;
    width: 100%;
  }

  @media (max-width: 1023px) {
    .payment__container {
      display: block;
      padding: 0 15px;
      box-sizing: border-box;
    }

    .payment-action__container {
      margin: 20px auto;
      max-width: 500px;
    }
  }
</style>
