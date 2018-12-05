import React from 'react';
import { shallow, mount } from 'enzyme';
import SwLocaleSelect from '../SwLocaleSelect';
import { fetchMock } from 'fetch-mock';

describe('<SwLocaleSelect />', () => {
  /*afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    }); */
  it('renders without creashing', async () => {
    const tableRow = shallow(<SwLocaleSelect />);
    expect(tableRow.find('select').length).toEqual(1);
  });

  it('renders list of options', async () => {
    const tableRow = shallow(<SwLocaleSelect />);
    tableRow.setState({ locales: [{ "code": "en" }, { "code": "sv" }] })
    expect(tableRow.find('option').length).toEqual(3);
  });

  it('handles on locale change', () => {
    const localeChangeMock = jest.fn();
    const tableRow = shallow(<SwLocaleSelect onLocaleChange={localeChangeMock} />);
    tableRow.instance().onLocaleChange({ target: { value: "en" } });
    expect(localeChangeMock).toHaveBeenCalled();
  });

  it('renders without creashing', async () => {
    const payload = {
      locales: [{ "code": "en" }, { "code": "sv" }]
    };
    fetchMock.mock('https://' + window.location.hostname + ':5002/api/Locale', payload.locales);
    const tableRow = shallow(<SwLocaleSelect />);

    setImmediate(() => {
      expect(tableRow.state('locales').length).toEqual(2);
    });
  });

});
