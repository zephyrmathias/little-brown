import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Cart from '@/components/cart/Cart.vue';
import CartEmpty from '@/components/cart/CartEmpty.vue';
import CartProduct from '@/components/cart/CartProduct.vue';
import CartValue from '@/components/cart/CartValue.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Cart', () => {
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
    };
    getters = { getTotalProducts: () => state.cart.products.length };
    store = new Vuex.Store({ state, getters });
    wrapper = shallowMount(Cart, { store, localVue });
  });

  it('should show cart empty when there is no product', () => {
    state = { cart: { products: [] } };
    getters = { getTotalProducts: () => state.cart.products.length };
    store = new Vuex.Store({ state, getters });
    wrapper = shallowMount(Cart, { store, localVue });
    const cartEmpty = wrapper.find(CartEmpty);
    expect(cartEmpty.exists()).toBeTruthy();
    expect(wrapper.vm.totalProducts).toBe(0);
  });

  it('should show cart with products', () => {
    const cartEmpty = wrapper.find(CartEmpty);
    const cartProduct = wrapper.find(CartProduct);
    const cartValue = wrapper.find(CartValue);
    expect(cartEmpty.exists()).toBeFalsy();
    expect(cartProduct.exists()).toBeTruthy();
    expect(cartValue.exists()).toBeTruthy();
    expect(wrapper.vm.totalProducts).toBe(2);
  });
});
