import postcss from 'postcss';
import plugin from '../index';

function test({ input, output, message }) {
  it(message || output, () => {
    const outputCss = postcss(plugin()).process(input).css;
    expect(outputCss).toBe(output);
  });
}

describe('postcss-normalize-casing', () => {
  test({
    input: 'a { color: RED; }',
    output: 'a { color: red; }',
  });

  test({
    input: 'a { transform: TRANSLATEY(10); }',
    output: 'a { transform: translateY(10); }',
  });

  test({
    input: 'a { font-family: Roboto; }',
    output: 'a { font-family: Roboto; }',
  });

  test({
    input: 'a { animation-name: myFancyAnimationName; }',
    output: 'a { animation-name: myFancyAnimationName; }',
  });

  test({
    input: 'a { CURSOR: PoInTeR; }',
    output: 'a { cursor: pointer; }',
  });
});
