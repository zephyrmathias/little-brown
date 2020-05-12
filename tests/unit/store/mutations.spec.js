import { mutations } from '@/store/index';

describe('mutations', () => {
  it('should add a product to cart', () => {
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
    const expectedRes = {
      cart: {
        products: [product],
        total: {
          discount: 0,
          totalPrice: 200,
          totalWithDiscount: 200,
        },
      },
    };
    mutations.addToCart(state, product);
    expect(state).toStrictEqual(expectedRes);
  });

  it('should add more quantity to the same product in cart', () => {
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
          {
            id: 999,
            title: 'Title',
            cover: 'cover',
            price: '200',
            quantity: 1,
          },
        ],
        total: {
          discount: 0,
          totalPrice: 400,
          totalWithDiscount: 400,
        },
      },
    };
    const product = {
      id: 1234,
      title: 'Title',
      cover: 'cover',
      price: '200',
      quantity: 10,
    };
    const expectedRes = {
      cart: {
        products: [
          {
            id: 1234,
            title: 'Title',
            cover: 'cover',
            price: '200',
            quantity: 11,
          },
          {
            id: 999,
            title: 'Title',
            cover: 'cover',
            price: '200',
            quantity: 1,
          },
        ],
        total: {
          discount: 0,
          totalPrice: 2400,
          totalWithDiscount: 2400,
        },
      },
      payment: null,
    };
    mutations.increaseQty(state, product);
    expect(state).toStrictEqual(expectedRes);
  });

  it('should have 0 discount if there is no any book in cart matched with promotion conditions', () => {
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
          totalPrice: 200,
          totalWithDiscount: 200,
        },
      },
    };
    const expectedRes = {
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
          totalPrice: 200,
          totalWithDiscount: 200,
        },
      },
    };
    mutations.calculatePromotion(state);
    expect(state).toStrictEqual(expectedRes);
  });

  it('should have 0% discount if cart is empty', () => {
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
    const expectedRes = {
      cart: {
        products: [],
        total: {
          discount: 0,
          totalPrice: 0,
          totalWithDiscount: 0,
        },
      },
    };
    mutations.calculatePromotion(state);
    expect(state).toStrictEqual(expectedRes);
  });

  it('should have 0% discount if it contains 1 unique Harry Potter book', () => {
    const products = [
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '350',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        quantity: 1,
      },
    ];

    const state = {
      cart: {
        products,
        total: {
          discount: 0,
          totalPrice: 350,
          totalWithDiscount: 350,
        },
      },
    };
    const expectedRes = {
      cart: {
        products,
        total: {
          discount: 0,
          totalPrice: 350,
          totalWithDiscount: 350,
        },
      },
    };
    mutations.calculatePromotion(state);
    expect(state).toStrictEqual(expectedRes);
  });

  it('should have 10% discount of total price of Harry Potter books if it contains 2 unique Harry Potter books', () => {
    const products = [
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '350',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        quantity: 2,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '350',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        quantity: 3,
      },
    ];

    const state = {
      cart: {
        products,
        total: {
          discount: 0,
          totalPrice: 1750,
          totalWithDiscount: 1750,
        },
      },
    };
    const expectedRes = {
      cart: {
        products,
        total: {
          discount: 70,
          totalPrice: 1750,
          totalWithDiscount: 1680,
        },
      },
    };
    mutations.calculatePromotion(state);
    expect(state).toStrictEqual(expectedRes);
  });

  it('should have 11% discount of total price of Harry Potter books if it contains 3 unique Harry Potter books', () => {
    const products = [
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '350',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        quantity: 2,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '350',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        quantity: 3,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855676.jpg',
        price: '340',
        title: 'Harry Potter and the Prisoner of Azkaban (III)',
        id: '9781408855676',
        quantity: 1,
      },
    ];

    const state = {
      cart: {
        products,
        total: {
          discount: 0,
          totalPrice: 2090,
          totalWithDiscount: 2090,
        },
      },
    };
    const expectedRes = {
      cart: {
        products,
        total: {
          discount: 114.4,
          totalPrice: 2090,
          totalWithDiscount: 1975.6,
        },
      },
    };
    mutations.calculatePromotion(state);
    expect(state).toStrictEqual(expectedRes);
  });

  it('should have 12% discount of total price of Harry Potter books if it contains 4 unique Harry Potter books', () => {
    const products = [
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '350',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        quantity: 2,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '350',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        quantity: 3,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855676.jpg',
        price: '340',
        title: 'Harry Potter and the Prisoner of Azkaban (III)',
        id: '9781408855676',
        quantity: 1,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855683.jpg',
        price: '360',
        title: 'Harry Potter and the Goblet of Fire (IV)',
        id: '9781408855683',
        quantity: 3,
      },
    ];

    const state = {
      cart: {
        products,
        total: {
          discount: 0,
          totalPrice: 3170,
          totalWithDiscount: 3170,
        },
      },
    };
    const expectedRes = {
      cart: {
        products,
        total: {
          discount: 168,
          totalPrice: 3170,
          totalWithDiscount: 3002,
        },
      },
    };
    mutations.calculatePromotion(state);
    expect(state).toStrictEqual(expectedRes);
  });

  it('should have 13% discount of total price of Harry Potter books if it contains 5 unique Harry Potter books', () => {
    const products = [
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '350',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        quantity: 2,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '350',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        quantity: 3,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855676.jpg',
        price: '340',
        title: 'Harry Potter and the Prisoner of Azkaban (III)',
        id: '9781408855676',
        quantity: 1,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855683.jpg',
        price: '360',
        title: 'Harry Potter and the Goblet of Fire (IV)',
        id: '9781408855683',
        quantity: 3,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
        price: '380',
        title: 'Harry Potter and the Order of the Phoenix (V)',
        id: '9781408855690',
        quantity: 1,
      },
    ];

    const state = {
      cart: {
        products,
        total: {
          discount: 0,
          totalPrice: 3550,
          totalWithDiscount: 3550,
        },
      },
    };
    const expectedRes = {
      cart: {
        products,
        total: {
          discount: 231.4,
          totalPrice: 3550,
          totalWithDiscount: 3318.6,
        },
      },
    };
    mutations.calculatePromotion(state);
    expect(state).toStrictEqual(expectedRes);
  });

  it('should have 14% discount of total price of Harry Potter books if it contains 6 unique Harry Potter books', () => {
    const products = [
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '350',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        quantity: 2,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '350',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        quantity: 3,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855676.jpg',
        price: '340',
        title: 'Harry Potter and the Prisoner of Azkaban (III)',
        id: '9781408855676',
        quantity: 1,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855683.jpg',
        price: '360',
        title: 'Harry Potter and the Goblet of Fire (IV)',
        id: '9781408855683',
        quantity: 3,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
        price: '380',
        title: 'Harry Potter and the Order of the Phoenix (V)',
        id: '9781408855690',
        quantity: 1,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855706.jpg',
        price: '380',
        title: 'Harry Potter and the Half-Blood Prince (VI)',
        id: '9781408855706',
        quantity: 2,
      },
    ];

    const state = {
      cart: {
        products,
        total: {
          discount: 0,
          totalPrice: 4310,
          totalWithDiscount: 4310,
        },
      },
    };
    const expectedRes = {
      cart: {
        products,
        total: {
          discount: 302.4,
          totalPrice: 4310,
          totalWithDiscount: 4007.6,
        },
      },
    };
    mutations.calculatePromotion(state);
    expect(state).toStrictEqual(expectedRes);
  });

  it('should have 15% discount of total price of Harry Potter books if it contains 7 unique Harry Potter books', () => {
    const products = [
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '350',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        quantity: 2,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '350',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        quantity: 3,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855676.jpg',
        price: '340',
        title: 'Harry Potter and the Prisoner of Azkaban (III)',
        id: '9781408855676',
        quantity: 1,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855683.jpg',
        price: '360',
        title: 'Harry Potter and the Goblet of Fire (IV)',
        id: '9781408855683',
        quantity: 3,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
        price: '380',
        title: 'Harry Potter and the Order of the Phoenix (V)',
        id: '9781408855690',
        quantity: 1,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855706.jpg',
        price: '380',
        title: 'Harry Potter and the Half-Blood Prince (VI)',
        id: '9781408855706',
        quantity: 2,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855713.jpg',
        price: '400',
        title: 'Harry Potter and the Deathly Hallows (VII)',
        id: '9781408855713',
        quantity: 1,
      },
    ];

    const state = {
      cart: {
        products,
        total: {
          discount: 0,
          totalPrice: 4710,
          totalWithDiscount: 4710,
        },
      },
    };
    const expectedRes = {
      cart: {
        products,
        total: {
          discount: 384,
          totalPrice: 4710,
          totalWithDiscount: 4326,
        },
      },
    };
    mutations.calculatePromotion(state);
    expect(state).toStrictEqual(expectedRes);
  });

  it('should calculate discount promotion only Harry Potter books', () => {
    const products = [
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '350',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        quantity: 2,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '350',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        quantity: 3,
      },
      {
        cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4736/9781473667815.jpg',
        price: '290',
        title: 'A Shout in the Ruins',
        id: '9781473667815',
        quantity: 1,
      },
    ];

    const state = {
      cart: {
        products,
        total: {
          discount: 0,
          totalPrice: 2040,
          totalWithDiscount: 2040,
        },
      },
    };
    const expectedRes = {
      cart: {
        products,
        total: {
          discount: 70,
          totalPrice: 2040,
          totalWithDiscount: 1970,
        },
      },
    };
    mutations.calculatePromotion(state);
    expect(state).toStrictEqual(expectedRes);
  });

  it('should decrease quantity to the same product in cart', () => {
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
          {
            id: 2222,
            title: 'Title',
            cover: 'cover',
            price: '200',
            quantity: 1,
          },
        ],
        total: {
          discount: 0,
          totalPrice: 800,
          totalWithDiscount: 800,
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
    const expectedRes = {
      cart: {
        products: [
          {
            id: 1234,
            title: 'Title',
            cover: 'cover',
            price: '200',
            quantity: 2,
          },
          {
            id: 2222,
            title: 'Title',
            cover: 'cover',
            price: '200',
            quantity: 1,
          },
        ],
        total: {
          discount: 0,
          totalPrice: 600,
          totalWithDiscount: 600,
        },
      },
      payment: null,
    };
    mutations.decreaseQty(state, product);
    expect(state).toStrictEqual(expectedRes);
  });

  it('should remove a product from the cart', () => {
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
          {
            id: 2222,
            title: 'Title',
            cover: 'cover',
            price: '200',
            quantity: 3,
          },
        ],
        total: {
          discount: 0,
          totalPrice: 1200,
          totalWithDiscount: 1200,
        },
      },
    };
    const product = {
      id: 1234,
      title: 'Title',
      cover: 'cover',
      price: '200',
      quantity: 3,
    };
    const expectedRes = {
      cart: {
        products: [
          {
            id: 2222,
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
    mutations.removeProduct(state, product);
    expect(state).toStrictEqual(expectedRes);
  });

  it('should update payment type to pay_by_cash with cash and change values', () => {
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
    const cash = 800;
    const expectedRes = {
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
      payment: {
        payment_type: 'pay_by_cash',
        cash: 800,
        change: 200,
      },
    };
    mutations.payByCash(state, cash);
    expect(state).toStrictEqual(expectedRes);
  });

  it('should clear all payment data', () => {
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
      payment: {
        payment_type: 'pay_by_cash',
        cash: 800,
        change: 200,
      },
    };
    const expectedRes = {
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
      payment: null,
    };
    mutations.resetPayment(state);
    expect(state).toStrictEqual(expectedRes);
  });

  it('should clear all data', () => {
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
      payment: {
        payment_type: 'pay_by_cash',
        cash: 800,
        change: 200,
      },
    };
    const expectedRes = {
      cart: {
        products: [],
        total: {
          discount: 0,
          totalPrice: 0,
          totalWithDiscount: 0,
        },
      },
      payment: null,
    };
    mutations.clearData(state);
    expect(state).toStrictEqual(expectedRes);
  });
});
