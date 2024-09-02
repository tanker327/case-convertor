export const toCamelCase = (str: string): string => 
  str.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const toSnakeCase = (str: string): string => {
  const snakeCase = str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  return snakeCase.charAt(0) === '_' ? snakeCase.slice(1) : snakeCase;
};

export const toConstantCase = (str: string): string => 
  str.split(/(?=[A-Z])|_/).join('_').toUpperCase();

export const toPascalCase = (str: string): string => 
  str.toLowerCase().replace(/(^|_)([a-z])/g, (_, __, letter) => letter.toUpperCase());

export const toUpperCase = (str: string): string => str.toUpperCase();

export const toLowerCase = (str: string): string => str.toLowerCase();