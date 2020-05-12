<template>
  <div class="cart__empty">
    <img src="../../assets/sorry.png" alt="No Item" >
    <span class="cart__empty-text">Cart is empty</span>
  </div>
</template>

<script>
export default {
  name: 'CartEmpty',
};
</script>

<style scoped>
  .cart__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;
  }

  .cart__empty-text {
    font-size: 20px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
    margin-top: 15px;
  }
</style>
