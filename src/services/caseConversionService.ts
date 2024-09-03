export type ConversionOption = {
  name: string;
  function: (input: string, removeIllegalChars: boolean) => string;
  example: string;
};

const removeIllegalCharacters = (input: string): string => {
  // Remove characters that are not allowed in JS/TS identifiers
  return input.replace(/[^a-zA-Z0-9_$]/g, '');
};

export const toCamelCase = (input: string, removeIllegalChars: boolean): string => {
  let processedInput = removeIllegalChars ? removeIllegalCharacters(input) : input;
  return processedInput.replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
};

export const toSnakeCase = (input: string, removeIllegalChars: boolean): string => {
  let processedInput = removeIllegalChars ? removeIllegalCharacters(input) : input;
  return processedInput.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).replace(/\s+/g, '_').replace(/^_/, '');
};

export const toConstantCase = (input: string, removeIllegalChars: boolean): string => {
  let processedInput = removeIllegalChars ? removeIllegalCharacters(input) : input;
  return processedInput.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase().replace(/\s+/g, '_').replace(/^_/, '');
};

export const toPascalCase = (input: string, removeIllegalChars: boolean): string => {
  let processedInput = removeIllegalChars ? removeIllegalCharacters(input) : input;
  return processedInput.replace(/\w+/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
};

export const toUpperCase = (input: string, removeIllegalChars: boolean): string => {
  let processedInput = removeIllegalChars ? removeIllegalCharacters(input) : input;
  return processedInput.toUpperCase();
};

export const toLowerCase = (input: string, removeIllegalChars: boolean): string => {
  let processedInput = removeIllegalChars ? removeIllegalCharacters(input) : input;
  return processedInput.toLowerCase();
};

export const toKebabCase = (input: string, removeIllegalChars: boolean): string => {
  let processedInput = removeIllegalChars ? removeIllegalCharacters(input) : input;
  return processedInput.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
    return index === 0 ? letter.toLowerCase() : '-' + letter.toLowerCase();
  }).replace(/\s+/g, '-');
};

export const toTitleCase = (input: string, removeIllegalChars: boolean): string => {
  let processedInput = removeIllegalChars ? removeIllegalCharacters(input) : input;
  return processedInput.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const toCobolCase = (input: string, removeIllegalChars: boolean): string => {
  let processedInput = removeIllegalChars ? removeIllegalCharacters(input) : input;
  return processedInput.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
    return index === 0 ? letter.toUpperCase() : '-' + letter.toUpperCase();
  }).replace(/\s+/g, '-');
};

export const toTrainCase = (input: string, removeIllegalChars: boolean): string => {
  let processedInput = removeIllegalChars ? removeIllegalCharacters(input) : input;
  return processedInput.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
    return index === 0 ? letter.toUpperCase() : '-' + letter.toUpperCase();
  }).replace(/\s+/g, '-');
};

export const conversionOptions: ConversionOption[] = [
  { name: 'camelCase', function: toCamelCase, example: 'myVariableName' },
  { name: 'snake_case', function: toSnakeCase, example: 'my_variable_name' },
  { name: 'CONSTANT_CASE', function: toConstantCase, example: 'MY_CONSTANT_NAME' },
  { name: 'PascalCase', function: toPascalCase, example: 'MyClassName' },
  { name: 'UPPERCASE', function: toUpperCase, example: 'MY UPPERCASE TEXT' },
  { name: 'lowercase', function: toLowerCase, example: 'my lowercase text' },
  { name: 'kebab-case', function: toKebabCase, example: 'my-kebab-case' },
  { name: 'Title Case', function: toTitleCase, example: 'My Title Case' },
  { name: 'COBOL-CASE', function: toCobolCase, example: 'MY-COBOL-CASE' },
  { name: 'Train-Case', function: toTrainCase, example: 'My-Train-Case' },
];