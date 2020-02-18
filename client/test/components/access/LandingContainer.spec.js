/* global jest expect test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { LandingContainer } from '../../../components/access/LandingContainer';

configure({ adapter: new Adapter() });

global.$ = () => ({
  carousel: () => null
});

describe('Landing Container', () => {
  const spy = jest.fn();
  afterEach(() => {
    spy.mockReset();
  });
  const props = {
    match: {
      path: ''
    },
    access: {
      isAuthenticated: true
    },
    history: {
      push: spy
    }
  };
  const component = shallow(<LandingContainer {...props} />);
  describe('LandingContainer Component', () => {
    it('should match the LandingContainer snapshot', () => {
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
    it('should redirect to dashboard if user is signed in', () => {
      component.instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
    });
  });
});

