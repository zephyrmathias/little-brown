import Vue from 'vue';
import Vuex from 'vuex';
import { promoDiscount, promoBooks } from '../utils/promotion';

Vue.use(Vuex);

export function initialState() {
  return {
    cart: {
      products: [],
      total: {
        discount: 0,
        totalPrice: 0,
        totalWithDiscount: 0,
      },
    },
    payment: null,
  };
}

export const mutations = {
  addToCart(state, product) {
    state.cart.products = [...state.cart.products, product];
    const price = product.quantity * product.price;
    state.cart.total.totalPrice += price;
    state.cart.total.totalWithDiscount += price;
  },
  increaseQty(state, product) {
    state.cart.products = state.cart.products.map((p) => (
      p.id === product.id
        ? { ...p, quantity: (p.quantity + product.quantity) }
        : p
    ));
    const price = product.quantity * product.price;
    state.cart.total.totalPrice += price;
    state.cart.total.totalWithDiscount += price;
    state.payment = null;
  },
  decreaseQty(state, product) {
    state.cart.products = state.cart.products.map((p) => (
      p.id === product.id
        ? { ...p, quantity: (p.quantity - product.quantity) }
        : p
    ));
    const price = product.quantity * product.price;
    state.cart.total.totalPrice -= price;
    state.cart.total.totalWithDiscount -= price;
    state.payment = null;
  },
  removeProduct(state, product) {
    state.cart.products = state.cart.products.filter((p) => p.id !== product.id);
    const price = product.quantity * product.price;
    state.cart.total.totalPrice -= price;
    state.cart.total.totalWithDiscount -= price;
  },
  calculatePromotion(state) {
    const allPromoBookIds = promoBooks.map((data) => data.id);
    const matchedBooks = state.cart.products.filter((p) => allPromoBookIds.includes(p.id));
    const promotion = promoDiscount.find((promo) => promo.condition === matchedBooks.length);

    if (promotion) {
      const totalPrice = matchedBooks.reduce((total, product) => total + +product.price, 0);
      const discount = +(totalPrice * promotion.discount).toFixed(2);
      state.cart.total.discount = discount;
      state.cart.total.totalWithDiscount = state.cart.total.totalPrice - discount;
    } else {
      state.cart.total.discount = 0;
      state.cart.total.totalWithDiscount = state.cart.total.totalPrice;
    }
  },
  payByCash(state, cash) {
    const { cart } = state;
    state.payment = {
      payment_type: 'pay_by_cash',
      cash,
      change: cash - cart.total.totalWithDiscount,
    };
  },
  resetPayment(state) {
    state.payment = null;
  },
  clearData(state) {
    const s = initialState();
    Object.keys(s).forEach((key) => {
      state[key] = s[key];
    });
  },
};

export const actions = {
  addToCart(context, product) {
    const { cart } = context.state;
    const isSameProduct = cart.products.find((p) => p.id === product.id);
    if (isSameProduct) {
      context.commit('increaseQty', product);
    } else {
      context.commit('addToCart', product);
      context.commit('calculatePromotion');
    }
  },
  increaseQty(context, product) {
    context.commit('increaseQty', product);
  },
  decreaseQty(context, product) {
    context.commit('decreaseQty', product);
  },
  removeFromCart(context, product) {
    const { cart } = context.state;
    const matchedProduct = cart.products.find((p) => p.id === product.id);
    if (matchedProduct) {
      context.commit('removeProduct', product);
      context.commit('calculatePromotion');
    }
  },
  savePayByCash(context, cash) {
    context.commit('payByCash', cash);
  },
  resetPayment(context) {
    context.commit('resetPayment');
  },
  clearData(context) {
    context.commit('clearData');
  },
};

export const getters = {
  getTotalProducts: (state) => (
    state.cart.products.reduce((total, product) => total + product.quantity, 0)
  ),
  getTotalPrice: (state) => state.cart.total.totalPrice,
  getTotalPriceWithDiscount: (state) => state.cart.total.totalWithDiscount,
  getDiscount: (state) => state.cart.total.discount,
  getPayment: (state) => state.payment,
};

export default new Vuex.Store({
  state: initialState,
  getters,
  mutations,
  actions,
});
