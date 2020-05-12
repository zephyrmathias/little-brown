import { shallowMount } from '@vue/test-utils';
import ReceiptProduct from '@/components/receipt/ReceiptProduct.vue';

const product = {
  id: '123',
  cover: 'cover.jpg',
  title: 'Title',
  price: '200',
  quantity: 1,
};

describe('ReceiptProduct', () => {
  it('should show a product detail', () => {
    const wrapper = shallowMount(ReceiptProduct, {
      propsData: { product },
    });
    const img = wrapper.find('.receipt-product__img');
    const title = wrapper.find('.receipt-product__name');
    const price = wrapper.find('.receipt-product__price-value');
    const qty = wrapper.find('.receipt-product__qty-value');
    expect(img.element.src).toContain('cover.jpg');
    expect(title.text()).toBe('Title');
    expect(price.text()).toBe('200฿');
    expect(qty.text()).toBe('1');
  });
});
