import React from 'react';
import { shallow, configure } from 'enzyme';
import Loader from '../../components/Loader';
import Adapter from 'enzyme-adapter-react-16';

function setup() {
  const wrapper = shallow(<Loader />);

  return { wrapper };
}

configure({ adapter: new Adapter() });
describe('components/Loader', () => {
  it('should render Loader', () => {
    const { wrapper } = setup();

    expect(wrapper.find('span').hasClass('sr-only')).toBe(true);
    expect(wrapper.find('span').text()).toEqual('Loading...');
  });
});
