import { getters } from '@/store/index';

describe('getters', () => {
  it('should return total products', () => {
    const state = {
      cart: {
        products: [
          {
            id: 1234,
            title: 'Title',
            cover: 'cover',
            price: '200',
            quantity: 3,
          },
        ],
        total: {
          discount: 0,
          totalPrice: 600,
          totalWithDiscount: 600,
        },
      },
    };
    const res = getters.getTotalProducts(state);
    expect(res).toBe(3);
  });

  it('should return total price', () => {
    const state = {
      cart: {
        products: [
          {
            id: 1234,
            title: 'Title',
            cover: 'cover',
            price: '200',
            quantity: 3,
          },
        ],
        total: {
          discount: 0,
          totalPrice: 600,
          totalWithDiscount: 600,
        },
      },
    };
    const res = getters.getTotalPrice(state);
    expect(res).toBe(600);
  });

  it('should return total price with discount', () => {
    const state = {
      cart: {
        products: [
          {
            id: 1234,
            title: 'Title',
            cover: 'cover',
            price: '200',
            quantity: 3,
          },
        ],
        total: {
          discount: 100,
          totalPrice: 600,
          totalWithDiscount: 500,
        },
      },
    };
    const res = getters.getTotalPriceWithDiscount(state);
    expect(res).toBe(500);
  });

  it('should return discount price', () => {
    const state = {
      cart: {
        products: [
          {
            id: 1234,
            title: 'Title',
            cover: 'cover',
            price: '200',
            quantity: 3,
          },
        ],
        total: {
          discount: 100,
          totalPrice: 600,
          totalWithDiscount: 500,
        },
      },
    };
    const res = getters.getDiscount(state);
    expect(res).toBe(100);
  });

  it('should return discount price', () => {
    const state = {
      cart: {
        products: [
          {
            id: 1234,
            title: 'Title',
            cover: 'cover',
            price: '200',
            quantity: 3,
          },
        ],
        total: {
          discount: 100,
          totalPrice: 600,
          totalWithDiscount: 500,
        },
      },
      payment: {
        payment_type: 'pay_by_cash',
        cash: 800,
        change: 200,
      },
    };
    const res = getters.getPayment(state);
    expect(res).toStrictEqual(state.payment);
  });
});
