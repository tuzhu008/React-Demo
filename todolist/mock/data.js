var Mock = require('mockjs');

module.exports = function () {
  return Mock.mock({
      'todoes|20': [{
        'completed': '@boolean()',
        'id': '@id()',
        'topic': '@ctitle()',
        'create': '@date("yyyy-MM-dd")'
      }]
    });
};