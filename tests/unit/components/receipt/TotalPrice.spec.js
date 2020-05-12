import { shallowMount } from '@vue/test-utils';
import ReceiptTotal from '@/components/receipt/TotalPrice.vue';

const total = {
  discount: 100,
  totalPrice: 200,
  totalWithDiscount: 100,
};

describe('TotalPrice', () => {
  it('should show total price detail', () => {
    const wrapper = shallowMount(ReceiptTotal, {
      propsData: { total },
    });
    const totalPrice = wrapper.findAll('.total-price__item > span:nth-child(2)').at(0);
    const discount = wrapper.findAll('.total-price__item > span:nth-child(2)').at(1);
    const totalWithDiscount = wrapper.findAll('.total-price__item > span:nth-child(2)').at(2);
    expect(totalPrice.text()).toBe('200฿');
    expect(discount.text()).toBe('-100฿');
    expect(totalWithDiscount.text()).toBe('100฿');
  });
});
