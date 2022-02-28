import React from 'react';
import { shallow, configure } from 'enzyme';
import Category from '../../components/Category';
import Adapter from 'enzyme-adapter-react-16';

function setup() {
  const props = {
    category: {
      id: 1,
      category_name: 'categoryName',
    },
  };

  const wrapper = shallow(<Category {...props} />);
  return { wrapper, props };
}

configure({ adapter: new Adapter() });

describe('components/Category', () => {
  const { wrapper } = setup();

  it('should pass category id', () => {
    expect(wrapper.find('Link').first().props().to).toEqual(
      '/products/categories/1'
    );
  });

  it('should pass category name', () => {
    expect(wrapper.find('strong').text()).toEqual('categoryName');
  });
});
