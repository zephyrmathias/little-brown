<template>
  <div class="thank-you__container">
    <img
      width="200px"
      src="../../assets/thankyou.png"
      alt="Thank You"
    />
    <div class="thank-you__title">
      <span>Thank you for purchasing.</span>
      <span>We hope you enjoy our products.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThankYou',
};
</script>

<style scoped>
  .thank-you__title {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    text-align: center;
  }

  .thank-you__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
