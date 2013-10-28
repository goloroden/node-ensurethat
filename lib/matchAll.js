'use strict';

var _ = require('underscore');

var match = require('./match');

var matchAll = function (args, schema) {
  var matchedArgs = {},
      keys = _.keys(schema),
      i = 0;

  keys.forEach(function (key) {
    var value = schema[key],
        matched;

    matched = match({
      key: key,
      value: args[i],
      expectedType: _.flatten([value])[0],
      isOptional: _.isArray(value),
      defaultValue: _.flatten([value], 1)[1]
    });

    if (matched.typeMatch === true) {
      i++;
    }
    matchedArgs[key] = matched.value;
  });

  return matchedArgs;
};

module.exports = matchAll;
