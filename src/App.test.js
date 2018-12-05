import React from 'react';
import App from './App';
import {shallow} from 'enzyme';

describe('<App />', () => {  
	it('renders without creashing', () => {
		shallow(<App/>);
	});  
});
