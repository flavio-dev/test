import React from 'react';
import { shallow, mount } from 'enzyme';
import { Matches, getDefaultFilters } from './Matches';
import Sidebar from '../../components/Sidebar/Sidebar';
import Main from '../../components/Main/Main';

const props = () => ({
  isFetching: false,
  filters: getDefaultFilters(),
  matches: [],
  dispatch: jest.fn()
});

describe('Matches', () => {
  it('renders a <Sidebar/> component and a <Main/> component', () => {
    const wrapper = shallow(<Matches {...props()}/>);

    expect(wrapper.find(Sidebar)).toHaveLength(1);
    expect(wrapper.find(Main)).toHaveLength(1);
  });
});