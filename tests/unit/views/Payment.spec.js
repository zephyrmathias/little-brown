import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Payment from '@/views/Payment.vue';
import PaymentOption from '@/components/payment/PaymentOption.vue';
import Cart from '@/components/cart/Cart.vue';
import PaymentDetail from '@/components/payment/PaymentDetail.vue';

const localVue = createLocalVue();
const router = new VueRouter();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('Payment', () => {
  let state;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      cart: {
        products: [
          {
            id: '123',
            cover: 'cover.jpg',
            title: 'Title',
            price: '200',
          },
          {
            id: '234',
            cover: 'cover2.jpg',
            title: 'Title 2',
            price: '400',
          },
        ],
      },
      payment: {
        payment_type: 'pay_by_cash',
        cash: 800,
        change: 200,
      },
    };
    getters = {
      getPayment: () => state.cart.payment,
      getTotalProducts: () => state.cart.products.length,
    };
    store = new Vuex.Store({ state, getters });
    store.dispatch = jest.fn();
    wrapper = shallowMount(Payment, {
      store,
      localVue,
      router,
    });
  });

  it('should show cart, payment option and payment detail', () => {
    const paymentOption = wrapper.find(PaymentOption);
    const cart = wrapper.find(Cart);
    const paymentDetail = wrapper.find(PaymentDetail);
    expect(paymentOption.exists()).toBeTruthy();
    expect(cart.exists()).toBeTruthy();
    expect(paymentDetail.exists()).toBeTruthy();
  });

  it('should clear data and navigate back to homepage when click on Back', () => {
    const back = wrapper.find('.payment-action__secondary-cta');
    back.trigger('click');
    expect(store.dispatch).toHaveBeenNthCalledWith(1, 'resetPayment');
  });

  it('should clear data and navigate back to homepage when click on Back', () => {
    state = {
      cart: { products: [] },
      payment: {
        payment_type: 'pay_by_cash',
        cash: 800,
        change: 200,
      },
    };
    getters = {
      getPayment: () => state.cart.payment,
      getTotalProducts: () => state.cart.products.length,
    };
    store = new Vuex.Store({ state, getters });
    store.dispatch = jest.fn();
    wrapper = shallowMount(Payment, {
      store,
      localVue,
      router,
    });
  });
});
