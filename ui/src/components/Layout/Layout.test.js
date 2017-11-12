import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Layout from './Layout';

describe('Layout', () => {
  it('renders children when passed in', () => {
    const wrapper = shallow(
      <Layout><p className="someClass">someText</p></Layout>
    );

    expect(wrapper.contains(<p className="someClass">someText</p>)).toBe(true);
  });
});