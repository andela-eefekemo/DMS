/* global expect jest test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { SignInForm } from '../../../components/access/SignInForm';

describe('SignInForm Component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });
  const props = {
    match: {
      path: ''
    },
    access: {
      isAuthenticated: false
    },
    history: {
      push: spy
    },
    signInUser: jest.fn(() => {
      return Promise.resolve();
    })
  };
  const component = shallow(
    <SignInForm {...props} />);
  test('should match the SignInForm snapshot', () => {
    const tree = toJson(component);
    expect(component.find('input').length).toEqual(2);
    expect(tree).toMatchSnapshot();
  });
  test('it should set state when onChange function is called', () => {
    component.instance().onChange(
      { target: { value: 'efe@gmail.com', name: 'email' } });
    component.instance().onChange(
      { target: { value: 'eguono', name: 'password' } });
    expect(component.state('email')).toEqual('efe@gmail.com');
    expect(component.state('password')).toEqual('eguono');
  });
  test(
    'it should submit fields in state when onSubmit function is called', () => {
      jest.spyOn(component.instance(), 'onSubmit');
      component.instance().onChange(
        { target: { value: 'efe@gmail.com', name: 'email' } });
      component.instance().onChange(
        { target: { value: 'eguono', name: 'password' } });
      component.find('#submit-signin').simulate('click');
      expect(component.find('#submit-signin').length).toEqual(1);
      expect(component.instance().onSubmit.mock.calls.length).toEqual(1);
    });
  test('onSubmit function should run', () => {
    component.instance().onChange(
      { target: { value: 'eguono@gmail.com', name: 'email' } });
    component.instance().onChange(
      { target: { value: 'efe', name: 'password' } });
    expect(component.state('email')).toEqual('eguono@gmail.com');
    expect(component.state('password')).toEqual('efe');
    const newspy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit();
    expect(newspy).toHaveBeenCalled();
  });
});
