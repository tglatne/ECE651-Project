import React from 'react';
import { shallow, configure } from 'enzyme';
import Footer from '../../components/Footer';
import Adapter from 'enzyme-adapter-react-16';

function setup() {
  const wrapper = shallow(<Footer />);

  return { wrapper };
}

configure({ adapter: new Adapter() });
describe('components/Footer', () => {
  it('should render Footer', () => {
    const { wrapper } = setup();

    expect(wrapper.find('Col').hasClass('text-center')).toBe(true);
    expect(wrapper.find('Col').hasClass('py-3')).toBe(true);
    expect(wrapper.find('Col').hasClass('footer-copyright')).toBe(true);
  });
});
