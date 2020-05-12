import { actions } from '@/store/index';

describe('actions', () => {
  it('should commit with addToCart and calculatePromotion if it adds a new product', () => {
    const state = {
      cart: {
        products: [],
        total: {
          discount: 0,
          totalPrice: 0,
          totalWithDiscount: 0,
        },
      },
    };
    const product = {
      id: 1234,
      title: 'Title',
      cover: 'cover',
      price: '200',
      quantity: 1,
    };
    const commit = jest.fn();
    actions.addToCart({ state, commit }, product);
    expect(commit).toHaveBeenCalledWith('addToCart', product);
    expect(commit).toHaveBeenCalledWith('calculatePromotion');
  });

  it('should commit with increaseQty when it adds the same product', () => {
    const state = {
      cart: {
        products: [
          {
            id: 1234,
            title: 'Title',
            cover: 'cover',
            price: '200',
            quantity: 1,
          },
        ],
        total: {
          discount: 0,
          totalPrice: 0,
          totalWithDiscount: 0,
        },
      },
    };
    const product = {
      id: 1234,
      title: 'Title',
      cover: 'cover',
      price: '200',
      quantity: 1,
    };
    const commit = jest.fn();
    actions.addToCart({ state, commit }, product);
    expect(commit).toHaveBeenCalledWith('increaseQty', product);
  });

  it('should commit with increaseQty', () => {
    const state = {
      cart: {
        products: [],
        total: {
          discount: 0,
          totalPrice: 0,
          totalWithDiscount: 0,
        },
      },
    };
    const product = {
      id: 1234,
      title: 'Title',
      cover: 'cover',
      price: '200',
      quantity: 1,
    };
    const commit = jest.fn();
    actions.increaseQty({ state, commit }, product);
    expect(commit).toHaveBeenCalledWith('increaseQty', product);
  });

  it('should commit with decreaseQty', () => {
    const state = {
      cart: {
        products: [],
        total: {
          discount: 0,
          totalPrice: 0,
          totalWithDiscount: 0,
        },
      },
    };
    const product = {
      id: 1234,
      title: 'Title',
      cover: 'cover',
      price: '200',
      quantity: 1,
    };
    const commit = jest.fn();
    actions.decreaseQty({ state, commit }, product);
    expect(commit).toHaveBeenCalledWith('decreaseQty', product);
  });

  it('should commit with removeFromCart and calculatePromotion when it removes a product from cart', () => {
    const state = {
      cart: {
        products: [
          {
            id: 1234,
            title: 'Title',
            cover: 'cover',
            price: '200',
            quantity: 1,
          },
        ],
        total: {
          discount: 0,
          totalPrice: 0,
          totalWithDiscount: 0,
        },
      },
    };
    const product = {
      id: 1234,
      title: 'Title',
      cover: 'cover',
      price: '200',
      quantity: 1,
    };
    const commit = jest.fn();
    actions.removeFromCart({ state, commit }, product);
    expect(commit).toHaveBeenCalledWith('removeProduct', product);
    expect(commit).toHaveBeenCalledWith('calculatePromotion');
  });

  it('should should commit with removeFromCart and calculatePromotion when it removes a product that does not in the cart', () => {
    const state = {
      cart: {
        products: [
          {
            id: 1234,
            title: 'Title',
            cover: 'cover',
            price: '200',
            quantity: 1,
          },
        ],
        total: {
          discount: 0,
          totalPrice: 0,
          totalWithDiscount: 0,
        },
      },
    };
    const product = {
      id: 9999,
      title: 'Title',
      cover: 'cover',
      price: '200',
      quantity: 1,
    };
    const commit = jest.fn();
    actions.removeFromCart({ state, commit }, product);
    expect(commit).toHaveBeenCalledTimes(0);
  });

  it('should commit with savePayByCash', () => {
    const cash = 100;
    const commit = jest.fn();
    actions.savePayByCash({ commit }, cash);
    expect(commit).toHaveBeenCalledWith('payByCash', cash);
  });

  it('should commit with resetPayment', () => {
    const commit = jest.fn();
    actions.resetPayment({ commit });
    expect(commit).toHaveBeenCalledWith('resetPayment');
  });

  it('should commit with clearData', () => {
    const commit = jest.fn();
    actions.clearData({ commit });
    expect(commit).toHaveBeenCalledWith('clearData');
  });
});
