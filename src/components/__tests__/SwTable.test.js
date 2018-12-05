import React from 'react';
import SwTable from '../SwTable';
import {shallow} from 'enzyme';
import {Table} from 'reactstrap';
import SwTableRow from '../SwTableRow';


describe('<SwTable />', () => {  
  it('renders without creashing', () => {
    const table = shallow(<SwTable data={[]}/>);
    expect(table.find(Table).length).toEqual(1);
  }); 
  it('renders SwTableRow', () => {
    const data = [
      {key1:'trans1'},
      {key2:'trans2'}
    ]
    const table = shallow(<SwTable data={data}/>);
    expect(table.find(SwTableRow).length).toEqual(2);
  }); 
});
