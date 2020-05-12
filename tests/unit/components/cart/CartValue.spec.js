import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import CartValue from '@/components/cart/CartValue.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('CartValue', () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      getTotalPriceWithDiscount: () => 1000,
      getDiscount: () => 0,
    };
    store = new Vuex.Store({ getters });
    wrapper = shallowMount(CartValue, { store, localVue });
  });

  it('should show cart total price without discount section when there is no discount', () => {
    const discount = wrapper.find('.cart-discount__value');
    const total = wrapper.find('.cart-total-price__value');
    expect(discount.exists()).toBeFalsy();
    expect(total.text()).toBe('1,000฿');
  });

  it('should show cart total price with discount section when there is discount', () => {
    getters = {
      getTotalPriceWithDiscount: () => 1000,
      getDiscount: () => 100,
    };
    store = new Vuex.Store({ getters });
    wrapper = shallowMount(CartValue, { store, localVue });
    const discount = wrapper.find('.cart-discount__value');
    const total = wrapper.find('.cart-total-price__value');
    expect(discount.exists()).toBeTruthy();
    expect(discount.text()).toBe('-100฿');
    expect(total.text()).toBe('1,000฿');
  });
});
