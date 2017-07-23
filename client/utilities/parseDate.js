/**
* Converts a datestring to a human-readable localized date or time
* Returns time instead of date if it is still the same day
* @param {String} datestring The datestring to be parsed
* @returns {String} The localized time or date
*/
const parseDate = (datestring) => {
  const date = new Date(datestring);
  const currentDate = new Date();
  if (date.toLocaleDateString() === currentDate.toLocaleDateString()) {
    return date.toLocaleTimeString();
  }
  return date.toLocaleDateString();
};

export default parseDate;
