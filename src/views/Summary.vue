<template>
  <div class="summary__container">
    <ThankYou />
    <Receipt v-bind:cart="this.cart" v-bind:payment="this.payment" />
    <div class="summary-cta__container">
      <router-link to="/">
        <button class="primary-btn summary-cta">
          Back
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import ThankYou from '@/components/receipt/ThankYou.vue';
import Receipt from '@/components/receipt/Receipt.vue';

export default {
  name: 'Summary',
  data() {
    return {
      cart: this.$store.state.cart,
      payment: this.$store.state.payment,
    };
  },
  components: {
    ThankYou,
    Receipt,
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
    if (!this.totalProducts && !this.paymentDetail) {
      this.$router.push('/');
    }
    this.$store.dispatch('clearData');
  },
};
</script>

<style scoped>
  .summary__container {
    height: 100%;
    overflow: auto;
  }

  .summary-cta__container {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .summary-cta {
    width: 200px;
  }

  @media (max-width: 1023px) {
    .summary__container {
      padding: 0 15px;
      margin-bottom: 20px;
    }
  }
</style>
