/**
 * initialize mock axios
 * @param {object} data arbitrary data to return
 * @param {boolean=} err reject data on error
 * @returns {Promise} mock axios
 */
function initMockAxios(data, err) {
  /**
   * moch axios promise
   * @returns {Promise} axios mock promise
   */
  function mockAxios() {
    return new Promise((resolve, reject) => {
      if (err) reject(data);
      else resolve({ data: data });
    });
  }

  function constructor() {
    this.axios = mockAxios;
    this.axios.get = mockAxios;
    this.axios.post = mockAxios;
    this.axios.put = mockAxios;
    this.axios.patch = mockAxios;
    this.axios.delete = mockAxios;
  }
  return new constructor();
}

module.exports = { initMockAxios };
