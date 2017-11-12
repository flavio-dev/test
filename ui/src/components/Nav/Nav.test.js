import React from 'react';
import { Link } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Nav from './Nav';

describe('Nav', () => {
  it('renders a Home <Link/> component and a Matches <Link/> component', () => {
    const wrapper = shallow(
      <Nav/>
    );

    expect(wrapper.contains(<Link to="/">Home</Link>)).toBe(true);
    expect(wrapper.contains(<Link to="/matches">Matches</Link>)).toBe(true);
  });
});