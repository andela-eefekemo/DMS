/**
 * Handle promise errors
 *
 * @param {Object} status status code
 * @param {Function} message error message
 * @param {Function} res server response function
 * @param {Object} err err object
 * @returns {Function} function that displays an error message
 */
export default function handleError(status, message, res, err = null) {
  if (err) {
    status = err.status ? err.status : 500;
    message = err.message ? err.message : "we're sorry, there was an error, please try again";
    return res.status(status).send(message);
  }
  res.status(status).send({ message });
}
