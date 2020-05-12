import { shallowMount } from '@vue/test-utils';
import CartEmpty from '@/components/cart/CartEmpty.vue';

describe('CartEmpty', () => {
  it('should show cart empty', () => {
    const wrapper = shallowMount(CartEmpty);
    const elem = wrapper.find('.cart__empty-text');
    expect(elem.text()).toBe('Cart is empty');
  });
});
