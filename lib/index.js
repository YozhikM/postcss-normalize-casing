import postcss from 'postcss';
import valueParser from 'postcss-value-parser';

// stylelint helpers
import keywordSets from 'stylelint/lib/reference/keywordSets';
import getUnitFromValueNode from 'stylelint/lib/utils/getUnitFromValueNode';
import isStandardSyntaxValue from 'stylelint/lib/utils/isStandardSyntaxValue';
import isCounterResetCustomIdentValue from 'stylelint/lib/utils/isCounterResetCustomIdentValue';
import isCounterIncrementCustomIdentValue from 'stylelint/lib/utils/isCounterIncrementCustomIdentValue';

const ignoredCharacters = new Set(['+', '-', '/', '*', '%']);

const mapLowercaseKeywordsToCamelCase = new Map();
keywordSets.camelCaseKeywords.forEach(func => {
  mapLowercaseKeywordsToCamelCase.set(func.toLowerCase(), func);
});
keywordSets.camelCaseFunctionNames.forEach(func => {
  mapLowercaseKeywordsToCamelCase.set(func.toLowerCase(), func);
});

export default postcss.plugin('postcss-normalize-casing', () => {
  return css => {
    return css.walkDecls(decl => {
      const prop = decl.prop;
      const value = decl.value;

      const parsed = valueParser(value).walk(node => {
        const valueLowerCase = node.value.toLowerCase();

        if (keywordSets.systemColors.has(valueLowerCase)) {
          return;
        }

        if (
          node.type === 'function' &&
          (valueLowerCase === 'url' ||
            valueLowerCase === 'var' ||
            valueLowerCase === 'counter' ||
            valueLowerCase === 'counters' ||
            valueLowerCase === 'attr')
        ) {
          return false;
        }

        const keyword = node.value;

        if (
          !isStandardSyntaxValue(node.value) ||
          value.indexOf('#') !== -1 ||
          ignoredCharacters.has(keyword) ||
          getUnitFromValueNode(node)
        ) {
          return;
        }

        if (
          prop === 'animation' &&
          !keywordSets.animationShorthandKeywords.has(valueLowerCase) &&
          !keywordSets.animationNameKeywords.has(valueLowerCase)
        ) {
          return;
        }
        if (prop === 'animation-name' && !keywordSets.animationNameKeywords.has(valueLowerCase)) {
          return;
        }
        if (
          prop === 'font' &&
          !keywordSets.fontShorthandKeywords.has(valueLowerCase) &&
          !keywordSets.fontFamilyKeywords.has(valueLowerCase)
        ) {
          return;
        }
        if (prop === 'font-family' && !keywordSets.fontFamilyKeywords.has(valueLowerCase)) {
          return;
        }
        if (prop === 'counter-increment' && isCounterIncrementCustomIdentValue(valueLowerCase)) {
          return;
        }
        if (prop === 'counter-reset' && isCounterResetCustomIdentValue(valueLowerCase)) {
          return;
        }
        if (prop === 'grid-row' && !keywordSets.gridRowKeywords.has(valueLowerCase)) {
          return;
        }
        if (prop === 'grid-column' && !keywordSets.gridColumnKeywords.has(valueLowerCase)) {
          return;
        }
        if (prop === 'grid-area' && !keywordSets.gridAreaKeywords.has(valueLowerCase)) {
          return;
        }
        if (
          prop === 'list-style' &&
          !keywordSets.listStyleShorthandKeywords.has(valueLowerCase) &&
          !keywordSets.listStyleTypeKeywords.has(valueLowerCase)
        ) {
          return;
        }
        if (prop === 'list-style-type' && !keywordSets.listStyleTypeKeywords.has(valueLowerCase)) {
          return;
        }

        const keywordLowerCase = keyword.toLocaleLowerCase();
        let expectedKeyword = null;

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
