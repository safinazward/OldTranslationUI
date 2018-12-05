import React from 'react';
import {shallow, mount} from 'enzyme';
import {Button} from 'reactstrap';
import SwTableRow from '../SwTableRow';
import SwEditCustomTranslationField from '../SwEditCustomTranslationField';


describe('<SwTableRow />', () => {  
  it('renders without creashing', () => {
    const tableRow = shallow(<SwTableRow />);
    expect(tableRow.find('tr').length).toEqual(1);
  }); 

  it('renders row with data', () => {
    const tableRow = shallow(<SwTableRow translationKey='key1' text='trans1'/>);
    expect(tableRow.find('th').length).toEqual(1);
    expect(tableRow.find('th').text()).toEqual('key1');
    expect(tableRow.find('td').length).toEqual(3);
    expect(tableRow.find('td').first().text()).toEqual('trans1');    
    expect(tableRow.find(Button).length).toEqual(3);
  });

  it('set the row to edit mode when we click on edit button', () => {
    const tableRow = shallow(<SwTableRow id='key1' text='trans1'/>);  
    expect(tableRow.state('editing')).toEqual(false); 
    const editBtn = tableRow.findWhere(e => e.text()==="Edit").parent();
    editBtn.simulate('click');
    expect(tableRow.state('editing')).toEqual(true); 
  });

  it('cancel edit mode when we click on save button', () => {
    const tableRow = shallow(<SwTableRow id='key1' text='trans1'/>);
    tableRow.setState({editing:true});
    const cancelBtn = tableRow.findWhere(e => e.text()==="Cancel").parent();
    cancelBtn.simulate('click');
    expect(tableRow.state('editing')).toEqual(false); 
  });

  it('calls remove when we click on remove button', () => {
    const mockRemove = jest.fn();
    const tableRow = shallow(<SwTableRow id='key1' text='trans1' remove={mockRemove}/>);
    const removeBtn = tableRow.findWhere(e => e.text()==="Remove").parent();
    removeBtn.simulate('click');
    expect(mockRemove).toHaveBeenCalled();
  });

  it('saves and sets editing state to false when we save', () => {
    const tableRow = shallow(<SwTableRow id='key1' text='trans1'/>);
    tableRow.setState({editing:true});
    const form=tableRow.find(SwEditCustomTranslationField);
    form.simulate('save',{text:'newTrans'});
    expect(tableRow.state('editing')).toEqual(false);
    expect(tableRow.state('text')).toEqual('newTrans');
  });

  it('resets the text value to its default when we reset', () => {
    const mockReset = jest.fn();
    const tableRow = shallow(<SwTableRow id='key1' text='trans1' standardText='trans' reset={mockReset}/>);    
    const resetBtn = tableRow.findWhere(e => e.text()==="Reset").parent();
    resetBtn.simulate('click');
    expect(mockReset).toHaveBeenCalled();
  });

});
