/**
 * ApiError class
 * @class ApiError
 * @extends {Error}
 *
 * @param {string} message - Error message
 *
 * @param {string | number} status - Error status code
 */
export default class ApiError extends Error {
  public status?: string | number;

  constructor(message?: string, status?: string | number) {
    super(message);
    this.status = status;
  }
}
