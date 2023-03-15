/**
 * initialize mock window
 * @returns {Object} mock window
 */
function initMockWindow() {
  global.window = {
    crypto: {
      getRandomValues: () => {
        var result = new Uint8Array(1);
        result[0] = Math.floor(Math.random() * 256);
        return result;
      },
    },
  };
}

module.exports = { initMockWindow };
