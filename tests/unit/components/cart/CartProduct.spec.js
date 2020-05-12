import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import CartProduct from '@/components/cart/CartProduct.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const product = {
  id: '123',
  cover: 'cover.jpg',
  title: 'Title',
  price: '1200',
  quantity: 1,
};

describe('CartProduct', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store();
    store.dispatch = jest.fn();
    wrapper = shallowMount(CartProduct, {
      store,
      localVue,
      propsData: { product },
    });
  });

  it('should show product detail', () => {
    const img = wrapper.find('.cart-product__img');
    const title = wrapper.find('.cart-product__name');
    const price = wrapper.find('.cart-product__price');
    expect(img.element.src).toContain('cover.jpg');
    expect(title.text()).toBe('Title');
    expect(price.text()).toBe('1,200฿');
  });

  it('should remove a product from cart when click on DELETE', () => {
    const elem = wrapper.find('.cart-delete');
    elem.trigger('click');
    expect(store.dispatch).toHaveBeenNthCalledWith(1, 'removeFromCart', product);
  });

  it('should increase a product quantity when click plus icon', () => {
    const elem = wrapper.findAll('.cart-product__qty-cta').at(1);
    elem.trigger('click');
    expect(store.dispatch).toHaveBeenNthCalledWith(1, 'increaseQty', product);
  });

  it('should decrease a product quantity when click minus icon', () => {
    wrapper = shallowMount(CartProduct, {
      store,
      localVue,
      propsData: { product: { ...product, quantity: 2 } },
    });
    const elem = wrapper.findAll('.cart-product__qty-cta').at(0);
    elem.trigger('click');
    expect(store.dispatch).toHaveBeenNthCalledWith(1, 'decreaseQty', product);
  });

  it('should not decrease a product quantity when product quantity is 1', () => {
    const elem = wrapper.findAll('.cart-product__qty-cta').at(0);
    elem.trigger('click');
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });
});
