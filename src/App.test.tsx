import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App component', () => {
  it('Starts with Loading...', () => {
    const wrapper = shallow(<App />);
    const text = wrapper.find('p').text();
    expect(text).toEqual('Loading...');
  });
});
