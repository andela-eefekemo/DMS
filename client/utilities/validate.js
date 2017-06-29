// import validator from 'validator';
import _ from 'lodash';

const validate = (state) => {
  _.mapValues(state, (value) => {
    if (value === '') {
      return false;
    }
  });
  return true;
};

export default validate;
