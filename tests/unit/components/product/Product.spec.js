import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Product from '@/components/product/Product.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const product = {
  id: '123',
  cover: 'cover.jpg',
  title: 'Title',
  price: '200',
};

describe('Product', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store();
    store.dispatch = jest.fn();
    wrapper = shallowMount(Product, {
      store,
      localVue,
      propsData: { product },
    });
  });

  it('should set the correct default quantity as 1', () => {
    const defaultData = Product.data();
    expect(typeof Product.data).toBe('function');
    expect(defaultData.quantity).toBe(1);
  });

  it('should increase quantity by 1 when click on plus icon', () => {
    const plusIcon = wrapper.findAll('.product-action__btn').at(1);
    plusIcon.trigger('click');
    expect(wrapper.vm.$data.quantity).toBe(2);
  });

  it('should decrease quantity by 1 when click on minus icon', () => {
    wrapper.setData({ quantity: 3 });
    const minusIcon = wrapper.findAll('.product-action__btn').at(0);
    minusIcon.trigger('click');
    expect(wrapper.vm.$data.quantity).toBe(2);
  });

  it('should not decrease quantity if quantity is 1 when click on minus icon', () => {
    wrapper.setData({ quantity: 1 });
    const minusIcon = wrapper.findAll('.product-action__btn').at(0);
    minusIcon.trigger('click');
    expect(wrapper.vm.$data.quantity).toBe(1);
  });

  it('should add a product to cart when click on Add to Bag CTA', () => {
    const data = { ...product, quantity: 1 };
    const cta = wrapper.find('.product-action__cta');
    cta.trigger('click');
    expect(store.dispatch).toHaveBeenNthCalledWith(1, 'addToCart', data);
  });
});
