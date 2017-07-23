/* global jest expect test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { LandingContainer } from '../../../components/access/LandingContainer';

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

