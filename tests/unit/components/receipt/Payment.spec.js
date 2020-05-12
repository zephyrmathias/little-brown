import { shallowMount } from '@vue/test-utils';
import ReceiptPayment from '@/components/receipt/Payment.vue';

describe('ReceiptPayment', () => {
  it('should show payment detail', () => {
    const payment = {
      payment_type: 'pay_by_cash',
      cash: 1000,
      change: 100,
    };
    const wrapper = shallowMount(ReceiptPayment, { propsData: { payment } });
    const type = wrapper.findAll('.receipt-payment__item > span:nth-child(2)').at(0);
    const cash = wrapper.findAll('.receipt-payment__item > span:nth-child(2)').at(1);
    const change = wrapper.findAll('.receipt-payment__item > span:nth-child(2)').at(2);
    expect(type.text()).toBe('pay by cash');
    expect(cash.text()).toBe('1,000฿');
    expect(change.text()).toBe('100฿');
  });
});
