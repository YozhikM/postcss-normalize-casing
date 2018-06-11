'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _keywordSets = require('stylelint/lib/reference/keywordSets');

var _keywordSets2 = _interopRequireDefault(_keywordSets);

var _getUnitFromValueNode = require('stylelint/lib/utils/getUnitFromValueNode');

var _getUnitFromValueNode2 = _interopRequireDefault(_getUnitFromValueNode);

var _isStandardSyntaxValue = require('stylelint/lib/utils/isStandardSyntaxValue');

var _isStandardSyntaxValue2 = _interopRequireDefault(_isStandardSyntaxValue);

var _isCounterResetCustomIdentValue = require('stylelint/lib/utils/isCounterResetCustomIdentValue');

var _isCounterResetCustomIdentValue2 = _interopRequireDefault(_isCounterResetCustomIdentValue);

var _isCounterIncrementCustomIdentValue = require('stylelint/lib/utils/isCounterIncrementCustomIdentValue');

var _isCounterIncrementCustomIdentValue2 = _interopRequireDefault(_isCounterIncrementCustomIdentValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ignoredCharacters = new Set(['+', '-', '/', '*', '%']);

// stylelint helpers


var mapLowercaseKeywordsToCamelCase = new Map();
_keywordSets2.default.camelCaseKeywords.forEach(function (func) {
  mapLowercaseKeywordsToCamelCase.set(func.toLowerCase(), func);
});
_keywordSets2.default.camelCaseFunctionNames.forEach(function (func) {
  mapLowercaseKeywordsToCamelCase.set(func.toLowerCase(), func);
});

exports.default = _postcss2.default.plugin('postcss-normalize-casing', function () {
  return function (css) {
    return css.walkDecls(function (decl) {
      var prop = decl.prop;
      var value = decl.value;

      var parsed = (0, _postcssValueParser2.default)(value).walk(function (node) {
        var valueLowerCase = node.value.toLowerCase();

        if (_keywordSets2.default.systemColors.has(valueLowerCase)) {
          return;
        }

        if (node.type === 'function' && (valueLowerCase === 'url' || valueLowerCase === 'var' || valueLowerCase === 'counter' || valueLowerCase === 'counters' || valueLowerCase === 'attr')) {
          return false;
        }

        var keyword = node.value;

        if (!(0, _isStandardSyntaxValue2.default)(node.value) || value.indexOf('#') !== -1 || ignoredCharacters.has(keyword) || (0, _getUnitFromValueNode2.default)(node)) {
          return;
        }

        if (prop === 'animation' && !_keywordSets2.default.animationShorthandKeywords.has(valueLowerCase) && !_keywordSets2.default.animationNameKeywords.has(valueLowerCase)) {
          return;
        }
        if (prop === 'animation-name' && !_keywordSets2.default.animationNameKeywords.has(valueLowerCase)) {
          return;
        }
        if (prop === 'font' && !_keywordSets2.default.fontShorthandKeywords.has(valueLowerCase) && !_keywordSets2.default.fontFamilyKeywords.has(valueLowerCase)) {
          return;
        }
        if (prop === 'font-family' && !_keywordSets2.default.fontFamilyKeywords.has(valueLowerCase)) {
          return;
        }
        if (prop === 'counter-increment' && (0, _isCounterIncrementCustomIdentValue2.default)(valueLowerCase)) {
          return;
        }
        if (prop === 'counter-reset' && (0, _isCounterResetCustomIdentValue2.default)(valueLowerCase)) {
          return;
        }
        if (prop === 'grid-row' && !_keywordSets2.default.gridRowKeywords.has(valueLowerCase)) {
          return;
        }
        if (prop === 'grid-column' && !_keywordSets2.default.gridColumnKeywords.has(valueLowerCase)) {
          return;
        }
        if (prop === 'grid-area' && !_keywordSets2.default.gridAreaKeywords.has(valueLowerCase)) {
          return;
        }
        if (prop === 'list-style' && !_keywordSets2.default.listStyleShorthandKeywords.has(valueLowerCase) && !_keywordSets2.default.listStyleTypeKeywords.has(valueLowerCase)) {
          return;
        }
        if (prop === 'list-style-type' && !_keywordSets2.default.listStyleTypeKeywords.has(valueLowerCase)) {
          return;
        }

        var keywordLowerCase = keyword.toLocaleLowerCase();
        var expectedKeyword = null;

        if (mapLowercaseKeywordsToCamelCase.has(keywordLowerCase)) {
          expectedKeyword = mapLowercaseKeywordsToCamelCase.get(keywordLowerCase);
        }

        node.value = expectedKeyword || keywordLowerCase;
      });

      decl.prop = decl.prop.toLowerCase();
      decl.value = parsed.toString();
    });
  };
});