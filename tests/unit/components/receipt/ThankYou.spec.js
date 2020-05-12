import { shallowMount } from '@vue/test-utils';
import ThankYou from '@/components/receipt/ThankYou.vue';

describe('ThankYou', () => {
  it('should show thank you text', () => {
    const wrapper = shallowMount(ThankYou);
    const elem = wrapper.find('.thank-you__title');
    expect(elem.text()).toBe('Thank you for purchasing. We hope you enjoy our products.');
  });
});
