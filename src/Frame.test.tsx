import React from 'react';
import { shallow } from 'enzyme';
import Frame from './Frame';

const mockTree = {
  name: 'Japanese red pine',
  species_name: 'Pinus densiflora',
  image:
    'https://upload.wikimedia.org/wikipedia/commons/f/f0/Pinus_syluestriformis_%28Takenouchi%29T.Wang_ex_Cheng.JPG'
};

describe('Frame component', () => {
  const wrapper = shallow(<Frame tree={mockTree} showAllPhotos={false} />);
  it('Shows tree name', () => {
    const heading = wrapper.find('h1').text();
    expect(heading).toEqual(mockTree.name);
  });

  it('Shows species name', () => {
    const subHeading = wrapper.find('h2').text();
    expect(subHeading).toEqual(mockTree.species_name);
  });

  it('Defaults button text correctly', () => {
    const buttonText = wrapper.find('Button').text();
    console.log(wrapper);
    expect(buttonText).toEqual('Show Photo');
  });

  it('Changes show image button text', () => {
    const button = wrapper.find('Button');
    button.simulate('click');
    const buttonText = wrapper.find('Button').text();
    expect(buttonText).toEqual('Hide Photo');
  });
});
