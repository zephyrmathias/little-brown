import { shallowMount } from '@vue/test-utils';
import ProductList from '@/components/product/ProductList.vue';

const productList = [
  {
    id: '123',
    cover: 'cover.jpg',
    title: 'Title',
    price: '200',
  },
  {
    id: '234',
    cover: 'cover2.jpg',
    title: 'Title 2',
    price: '400',
  },
];

describe('ProductList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ProductList, { propsData: { productList } });
  });

  it('should set the correct default searchTerm as empty string', () => {
    const defaultData = ProductList.data();
    expect(typeof ProductList.data).toBe('function');
    expect(defaultData.searchTerm).toBe('');
  });

  it('should set productList as empty array', () => {
    wrapper = shallowMount(ProductList);
    expect(wrapper.props().productList).toStrictEqual([]);
  });

  it('should filter book title based on search term', () => {
    wrapper.setData({ searchTerm: 'title 2' });
    expect(wrapper.vm.filteredProducts).toStrictEqual([productList[1]]);
  });
});
