'use strict';

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test(_ref) {
  var input = _ref.input,
      output = _ref.output,
      message = _ref.message;

  it(message || output, function () {
    var outputCss = (0, _postcss2.default)((0, _index2.default)()).process(input).css;
    expect(outputCss).toBe(output);
  });
}

describe('postcss-normalize-casing', function () {
  test({
    input: 'a { color: RED; }',
    output: 'a { color: red; }'
  });

  test({
    input: 'a { transform: TRANSLATEY(10); }',
    output: 'a { transform: translateY(10); }'
  });

  test({
    input: 'a { font-family: Roboto; }',
    output: 'a { font-family: Roboto; }'
  });

  test({
    input: 'a { font-family: Roboto; }',
    output: 'a { font-family: Roboto; }'
  });

  test({
    input: 'a { animation-name: myFancyAnimationName; }',
    output: 'a { animation-name: myFancyAnimationName; }'
  });
});