import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './Sidebar';
import InputRange from 'react-input-range';

const setup = () => (
  <Sidebar
    filters={{}}
    handleCheckboxChange={() => {}}
    handleInputRangeChange={() => {}}
    handleInputRangeChangeComplete={() => {}}
    handleInputRangeWithOpenBoundsChangeComplete={() => {}}
    handleResetButtonClick={() => {}}
  />
);

describe('Sidebar', () => {
  it('renders 3 checkbox inputs, 4 <InputRange/> components and a button', () => {
    const wrapper = shallow(setup());

    expect(wrapper.find('input')).toHaveLength(3);
    expect(wrapper.find(InputRange)).toHaveLength(4);
    expect(wrapper.find('button')).toHaveLength(1);
  });
});