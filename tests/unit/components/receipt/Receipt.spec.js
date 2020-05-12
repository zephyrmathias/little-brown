import { shallowMount } from '@vue/test-utils';
import Receipt from '@/components/receipt/Receipt.vue';
import ReceiptProduct from '@/components/receipt/ReceiptProduct.vue';
import TotalPrice from '@/components/receipt/TotalPrice.vue';
import ReceiptPayment from '@/components/receipt/Payment.vue';

describe('Receipt', () => {
  let wrapper;

  beforeEach(() => {
    const propsData = {
      cart: {
        products: [
          {
            id: '123',
            cover: 'cover.jpg',
            title: 'Title',
            price: '200',
          },
        ],
        total: {
          discount: 100,
          totalPrice: 200,
          totalWithDiscount: 100,
        },
      },
      payment: {
        payment_type: 'pay_by_cash',
        cash: 1000,
        change: 900,
      },
    };
    wrapper = shallowMount(Receipt, { propsData });
  });

  it('should show receipt detail', () => {
    const receiptProduct = wrapper.find(ReceiptProduct);
    const totalPrice = wrapper.find(TotalPrice);
    const receiptPayment = wrapper.find(ReceiptPayment);
    expect(receiptProduct.exists()).toBeTruthy();
    expect(totalPrice.exists()).toBeTruthy();
    expect(receiptPayment.exists()).toBeTruthy();
  });
});
