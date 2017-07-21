/* global expect jest test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { SignUpForm } from '../../../components/access/SignUpForm';

describe('SignUpForm Component', () => {
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
    signUpUser: jest.fn(() => {
      return Promise.resolve();
    })
  };
  const component = shallow(
    <SignUpForm {...props} />);
  test('should match the SignUpForm snapshot', () => {
    const tree = toJson(component);
    expect(component.find('input').length).toEqual(5);
    expect(tree).toMatchSnapshot();
  });
  test('it should set state when onChange function is called', () => {
    component.instance().onChange(
      { target: { value: 'efe@gmail.com', name: 'email' } });
    component.instance().onChange(
      { target: { value: 'eguono', name: 'password' } });
    component.instance().onChange(
      { target: { value: 'eguono', name: 'firstName' } });
    component.instance().onChange(
      { target: { value: 'eguono', name: 'lastName' } });
    component.instance().onChange(
      { target: { value: 'eguono', name: 'confirmPassword' } });
    expect(component.state('email')).toEqual('efe@gmail.com');
    expect(component.state('password')).toEqual('eguono');
    expect(component.state('firstName')).toEqual('eguono');
    expect(component.state('lastName')).toEqual('eguono');
    expect(component.state('confirmPassword')).toEqual('eguono');
    const newspy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit();
    expect(newspy).toHaveBeenCalled();
  });
  test(
    'it should submit fields in state when onSubmit function is called', () => {
      jest.spyOn(component.instance(), 'onSubmit');
      component.instance().onChange(
        { target: { value: 'efe@gmail.com', name: 'email' } });
      component.instance().onChange(
        { target: { value: 'eguono', name: 'password' } });
      component.find('#signup-button').simulate('click');
      expect(component.find('#signup-button').length).toEqual(1);
      expect(component.instance().onSubmit.mock.calls.length).toEqual(2);
    });
});
