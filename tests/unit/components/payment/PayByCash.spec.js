import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import PayByCash from '@/components/payment/PayByCash.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('PayByCash', () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      getTotalPriceWithDiscount: () => 1000,
    };
    store = new Vuex.Store({ getters });
    store.dispatch = jest.fn();
    wrapper = shallowMount(PayByCash, { store, localVue });
  });

  it('should set default value for cash and error', () => {
    const defaultData = PayByCash.data();
    expect(typeof PayByCash.data).toBe('function');
    expect(defaultData.cash).toBe('');
    expect(defaultData.error).toBe('');
  });

  it('should show total price with discount', () => {
    const elem = wrapper.find('.amount-to-pay__value');
    expect(elem.text()).toBe('1,000฿');
    expect(wrapper.vm.totalPriceWithDiscount).toBe('1,000฿');
  });

  it('should reset cash and error when click on Reset cta', () => {
    wrapper.setData({ cash: 123, error: 'error' });
    const elem = wrapper.findAll('.pay-by-cash__secondary-cta').at(0);
    elem.trigger('click');
    expect(wrapper.vm.$data.cash).toBe('');
    expect(wrapper.vm.$data.error).toBe('');
    expect(store.dispatch).toHaveBeenNthCalledWith(1, 'resetPayment');
  });

  it('should not save cash and show error when cash is less than total price with discount', () => {
    wrapper.setData({ cash: 300 });
    Vue.nextTick(() => {
      const elem = wrapper.find('.pay-by-cash__primary-cta');
      elem.trigger('click');
      expect(wrapper.vm.$data.error).toBe('Not Enough Cash');
    });
  });

  it('should save cash and show error when cash is less than total price with discount', () => {
    wrapper.setData({ cash: 1000 });
    Vue.nextTick(() => {
      const elem = wrapper.findAll('.pay-by-cash__primary-cta').at(0);
      elem.trigger('click');
      expect(store.dispatch).toHaveBeenNthCalledWith(1, 'savePayByCash', wrapper.vm.$data.cash);
      expect(wrapper.vm.$data.error).toBe('');
    });
  });
});
