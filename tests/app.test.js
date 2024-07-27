import { nameIsValid, fullTrim, getTotal } from '../src/app'
describe('nameIsValid function', () => {
  it('nameIsValid function imports properly', () => {
    expect(nameIsValid).toBeDefined();
    expect(typeof nameIsValid).toBe('function');
  });
  it(`checks when name includes 2 chars, e.g "ab", passes`, () => {
    expect(nameIsValid("ab")).toBe(true);
  });
  it(`checks when name includes 3 chars, e.g "abc", passes`, () => {
    expect(nameIsValid("abc")).toBe(true);
  });
  it(`checks when name contains 26 different chars, passes`, () => {
    const inputValue = "abcdefghijklmnopqrstuvwxyz";
    expect(nameIsValid(inputValue)).toBe(true);
  });
  it(`checks when name contains dublicate chars, e.g "abcabcabc", passes`, () => {
    expect(nameIsValid("abcabcabc")).toBe(true);
  });
  const str = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
  const strLength = str.length;
  it(`checks when valid name includes only chars and its length is ${strLength}, passes`, () => {
    const inputValue = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
    expect(nameIsValid(inputValue)).toBe(true);
  });
  it(`checks when name is "true", passes`, () => {
    expect(nameIsValid("true")).toBe(true);
  });
  it('checks when name is undefined, fails', () => {
    expect(nameIsValid()).toBe(false);
  });
  it('checks when name is an empty string, fails', () => {
    expect(nameIsValid('')).toBe(false);
  });
  it(`checks when name includes 1 char, fails`, () => {
    expect(nameIsValid("a")).toBe(false);
  });
  it(`checks when name includes chars and digit (e.g. "ab1"), fails`, () => {
    expect(nameIsValid("ab1")).toBe(false);
  });
  it(`checks when name is Number, fails`, () => {
    expect(nameIsValid(111)).toBe(false);
  });
  it(`checks when name is Boolean, fails`, () => {
    expect(nameIsValid(false)).toBe(false);
  });
  it(`checks when name includes chars with a special symbol (e.g "qw@"), fails`, () => {
    expect(nameIsValid("qw@")).toBe(false);
  });
  it(`checks when name includes only special symbols (e.g "!@#"), fails`, () => {
    expect(nameIsValid("!@#")).toBe(false);
  });
  it(`checks when name includes russian chars (e.g "сумма"), fails`, () => {
    expect(nameIsValid("сумма")).toBe(false);
  });
  it(`checks when name includes a combination of English and Russian chars (e.g "sosмч"), fails`, () => {
    expect(nameIsValid("sosмч")).toBe(false);
  });
  it(`checks when name includes whitespace (e.g "sos sos"), fails`, () => {
    expect(nameIsValid("sos sos")).toBe(false);
  });
  it(`checks when name includes underscores (e.g "a_b"), fails`, () => {
    expect(nameIsValid("a_b")).toBe(false);
  });
  it(`checks when name includes lower and upper case chars (e.g "aBc"), fails`, () => {
    expect(nameIsValid("aBc")).toBe(false);
  });
});

describe('nameIsValid() : parameterized test', () => {
  const testCasesPositive = [
    ["ab", true],
    ["abc", true],
    ["abcdefghijklmnopqrstuvwxyz", true],
    ["abcabcabc", true],
    ["abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz", true],
    ["false", true]
  ];
  test.each(testCasesPositive)('%s %s', (value, res) => {
    expect(nameIsValid(value)).toBe(res);
  });
  const testCasesNegative = [
    ["", false],
    [undefined, false],
    ["a", false],
    ["ab1", false],
    ["111", false],
    [111, false],
    ["qw@", false],
    ["сумма", false],
    ["sosмч", false],
    ["sos sos", false],
    ["a_b", false],
    ["aBc", false],
    [" mkl", false],
    ["frg ", false]
  ];
  test.each(testCasesNegative)('%s %s', (value, res) => {
    expect(nameIsValid(value)).toBe(res);
  });
});

describe('fullTrim function', () => {
  it('fullTrim function imports properly', () => {
    expect(fullTrim).toBeDefined();
    expect(typeof fullTrim).toBe('function');
  });
  it('checks when there is no param, passes', () => {
    expect(fullTrim()).toBe("");
  });
  it('checks when a param is an empty string, passes', () => {
    expect(fullTrim("")).toBe("");
  });
  it('checks when a param is a string with a space, passes', () => {
    expect(fullTrim(" ")).toBe("");
  });
  it('checks when there is a char in a param, passes', () => {
    expect(fullTrim('a')).toBe("a");
  });
  it('checks when there is a word in a param, passes', () => {
    expect(fullTrim("Hello")).toBe("Hello");
  });
  it('checks when a param includes a space before a word, passes', () => {
    expect(fullTrim(" Hello!")).toBe("Hello!");
  });
  it('checks when a param includes a space after a word, passes', () => {
    expect(fullTrim("Hello ")).toBe("Hello");
  });
  it('checks when a param includes 2 words separated by 1 space, passes', () => {
    expect(fullTrim("Hello World!")).toBe("HelloWorld!");
  });
  it('checks when a param includes 3 words separated by 2 spaces , passes', () => {
    expect(fullTrim("Hello World Again!")).toBe("HelloWorldAgain!");
  });
  it('checks when a param includes only N spaces, passes', () => {
    expect(fullTrim("       ")).toBe("");
  });
  it('checks when a param includes special chars separated by spaces, passes', () => {
    expect(fullTrim("~ ! @ # $ % ^ & * ( ) - _ = + } { [ ] : ; ' / ? > < , .")).toBe("~!@#$%^&*()-_=+}{[]:;'/?><,.");
  });
  it('checks when a param includes only a horizontal tab character, passes', () => {
    expect(fullTrim("ParamIncludes\tAHorizontalTabCharacter")).toBe("ParamIncludesAHorizontalTabCharacter");
  });
  it('checks when a param includes only a vertical tab character, passes', () => {
    expect(fullTrim("ParamIncludes\vAVerticalTabCharacter")).toBe("ParamIncludesAVerticalTabCharacter");
  });
  it('checks when a param includes only a carriage return character, passes', () => {
    expect(fullTrim("ParamIncludes\rACarriageReturnCharacter")).toBe("ParamIncludesACarriageReturnCharacter");
  });
  it('checks when a param includes only a new line character, passes', () => {
    expect(fullTrim("ParamIncludes\nANewLineCharacter")).toBe("ParamIncludesANewLineCharacter");
  });
  it('checks when a param includes only a form feed character, passes', () => {
    expect(fullTrim("ParamIncludes\fAFormFeedCharacter")).toBe("ParamIncludesAFormFeedCharacter");
  });
  it('checks when param == null, passes', () => {
    expect(fullTrim(null)).toBe("");
  });
  it('checks when param == undefined, passes', () => {
    expect(fullTrim(undefined)).toBe("");
  });
  it('checks when param == NaN, passes', () => {
    expect(fullTrim(NaN)).toBe("");
  });
  it('checks when typeof(param) is Number, fails', () => {
    expect(() => fullTrim(1111)).toThrow();
  });
  it('checks when typeof(param) is Boolean, fails', () => {
    expect(() => fullTrim(true)).toThrow();
  });
});

describe('getTotal function', () => {
  it('getTotal function imports properly', () => {
    expect(getTotal).toBeDefined();
    expect(typeof getTotal).toBe('function');
  });
  it('checks based on example #1, passes', () => {
    const param1 = [
      {
        price: 10,
        quantity: 10
      }
    ];
    const discount = 0;
    expect(getTotal(param1, discount)).toBe(100);
  });
  it('checks based on example #2, passes', () => {
    const param1 = [
      {
        price: 10,
        quantity: 1
      }
    ];
    const discount = 0;
    expect(getTotal(param1, discount)).toBe(10);
  });
  it('checks based on example #3, passes', () => {
    const param1 = [
      {
        price: 10,
        quantity: 1
      },
      {
        price: 10,
        quantity: 9
      }
    ];
    const discount = 0;
    expect(getTotal(param1, discount)).toBe(100);
  });
  it('checks based on example #4, passes', () => {
    const param1 = [
      {
        price: 10,
        quantity: 0
      },
      {
        price: 10,
        quantity: 9
      }
    ];
    const discount = 0;
    expect(getTotal(param1, discount)).toBe(90);
  });
  it('checks based on example #5, passes', () => {
    const param1 = [
      {
        price: 10,
        quantity: 10
      }
    ];
    const discount = 10;
    expect(getTotal(param1, discount)).toBe(90);
  });
  it('checks based on example #6, passes', () => {
    const param1 = [
      {
        price: 10,
        quantity: 10
      }
    ];
    const discount = 100;
    expect(getTotal(param1, discount)).toBe(0);
  });
  it('checks when discount == 1.25, passes', () => {
    const param1 = [
      {
        price: 10,
        quantity: 10
      }
    ];
    const discount = 1.25;
    expect(getTotal(param1, discount)).toBe(98.75);
  });
  it('checks when discount == 1 and items includes 3 keys, passes', () => {
    const param1 = [
      {
        price: 10,
        quantity: 10,
        name: "item1"
      }
    ];
    const discount = 5;
    expect(getTotal(param1, discount)).toBe(95);
  });
  it('checks when typeOf(discount) is String, fails', () => {
    const param1 = [
      {
        price: 10,
        quantity: 10
      }
    ];
    const discount = "5";
    expect(() => getTotal(param1, discount)).toThrow("Скидка должна быть числом");
  });
  it('checks when typeOf(discount) is Boolean, fails', () => {
    const param1 = [
      {
        price: 10,
        quantity: 10
      }
    ];
    const discount = true;
    expect(() => getTotal(param1, discount)).toThrow("Скидка должна быть числом");
  });
  it('checks when discount < 0, e.g "-5", fails', () => {
    const param1 = [
      {
        price: 10,
        quantity: 10
      }
    ];
    const discount = -1;
    expect(() => getTotal(param1, discount)).toThrow("Процент скидки не может быть отрицательным");
  });
  it('checks when discount > 100, e.g "101", fails', () => {
    const param1 = [
      {
        price: 10,
        quantity: 10
      }
    ];
    const discount = 101;
    expect(() => getTotal(param1, discount)).toThrow("Процент скидки не может быть больше 100");
  }); 
});
