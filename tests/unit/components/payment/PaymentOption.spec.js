import { shallowMount } from '@vue/test-utils';
import PaymentOption from '@/components/payment/PaymentOption.vue';

describe('PaymentOption', () => {
  it('should show pay by cash as selected option', () => {
    const wrapper = shallowMount(PaymentOption);
    const payByCash = wrapper.find('.payment-option__selected');
    const payByCC = wrapper.find('.payment-option__deselected');
    expect(payByCash.text()).toBe('Pay By Cash');
    expect(payByCC.text()).toBe('Pay By Credit Card');
  });
});
