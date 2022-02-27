import React from 'react';
import { shallow, configure } from 'enzyme';
import * as redux from 'react-redux';
import Header from '../../components/Header';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('components/Header', () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;

  beforeEach(() => {
    var mockState = {
      categoryList: {
        categories: [
          {
            id: 1,
            category_name: 'category1',
          },
          {
            id: 2,
            category_name: 'category2',
          },
        ],
      },
      userLogin: {
        userInfo: [
          {
            id: 1,
            namee: 'testName',
            isAdminn: true,
            email: 'testName@email.com',
          },
        ],
      },
    };
    // Mock useSelector hook
    spyOnUseSelector = jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((state) => state(mockState));

    // Mock useDispatch hook
    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
    // Mock dispatch function returned from useDispatch
    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render Header', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toBe(true);
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('test logout click', () => {
    const wrapper = shallow(<Header />);
    wrapper.find('.logout').simulate('click');
    expect(mockDispatch.mock.calls.length).toEqual(1);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
