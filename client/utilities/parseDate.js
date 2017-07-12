/**
 * @param {any} datestring -
 * @returns {Date} - date
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
