import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import PaymentDetail from '@/components/payment/PaymentDetail.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('PaymentDetail', () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      getPayment: () => ({
        payment_type: 'pay_by_cash',
        cash: 1000,
        change: 100,
      }),
    };
    store = new Vuex.Store({ getters });
    store.dispatch = jest.fn();
    wrapper = shallowMount(PaymentDetail, { store, localVue });
  });

  it('should show Pay By Cash payment detail', () => {
    const paymentType = wrapper.findAll('.payment-detail__item-value').at(0);
    const cash = wrapper.findAll('.payment-detail__item-value').at(1);
    const change = wrapper.findAll('.payment-detail__item-value').at(2);
    expect(paymentType.text()).toBe('pay by cash');
    expect(cash.text()).toBe('1,000฿');
    expect(change.text()).toBe('100฿');
  });

  it('should not show payment detail if there is no payment data', () => {
    getters = { getPayment: () => null };
    store = new Vuex.Store({ getters });
    store.dispatch = jest.fn();
    wrapper = shallowMount(PaymentDetail, { store, localVue });
    const elem = wrapper.find('.payment-detail__container');
    expect(elem.exists()).toBeFalsy();
  });
});
