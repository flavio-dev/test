import React from 'react';
import { shallow, mount } from 'enzyme';
import Home from './Home';
import Main from '../../components/Main/Main';

describe('Home', () => {
  it('renders a <Main/> component', () => {
    const wrapper = shallow(
      <Home/>
    );

    expect(wrapper.find(Main).length).toBe(1);
  });
});