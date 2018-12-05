import React from 'react';
import SwAddLocaleButton from '../SwAddLocaleButton';
import {shallow} from 'enzyme';
import {Modal} from 'reactstrap';

describe('<SwAddLocaleButton />', () => {  
  it('renders without creashing', () => {
    const modal = shallow(<SwAddLocaleButton/>);
    expect(modal.find(Modal).length).toEqual(1);
  });  
});
