// Helper function to normalize a single line
const normalizeLine = (str: string, removeIllegalChars: boolean): string => {
  let normalized = str
    .replace(/([a-z])([A-Z])/g, '$1 $2')  // Split camelCase
    .replace(/[\s_-]+/g, ' ')             // Replace separators with spaces
    .trim()                               // Trim leading/trailing spaces
    .toLowerCase();                       // Convert to lowercase

  if (removeIllegalChars) {
    normalized = normalized.replace(/[^a-z0-9\s]/g, '');
  }

  return normalized;
};

const applyCase = (str: string, removeIllegalChars: boolean, caseFunction: (s: string) => string): string => {
  return str.split('\n').map(line => {
    const normalizedLine = normalizeLine(line, removeIllegalChars);
    return normalizedLine ? caseFunction(normalizedLine) : '';
  }).join('\n');
};

export const toCamelCase = (str: string, removeIllegalChars: boolean = true): string => 
  applyCase(str, removeIllegalChars, s => s.replace(/\s(.)/g, (_, char) => char.toUpperCase()));

export const toSnakeCase = (str: string, removeIllegalChars: boolean = true): string =>
  applyCase(str, removeIllegalChars, s => s.replace(/\s/g, '_'));

export const toConstantCase = (str: string, removeIllegalChars: boolean = true): string => 
  applyCase(str, removeIllegalChars, s => s.replace(/\s/g, '_').toUpperCase());

export const toPascalCase = (str: string, removeIllegalChars: boolean = true): string => 
  applyCase(str, removeIllegalChars, s => s.replace(/(?:^|\s)(.)/g, (_, char) => char.toUpperCase()).replace(/\s/g, ''));

export const toUpperCase = (str: string, removeIllegalChars: boolean = true): string => 
  applyCase(str, removeIllegalChars, s => s.toUpperCase());

export const toLowerCase = (str: string, removeIllegalChars: boolean = true): string => 
  applyCase(str, removeIllegalChars, s => s.toLowerCase());

export const toKebabCase = (str: string, removeIllegalChars: boolean = true): string =>
  applyCase(str, removeIllegalChars, s => s.replace(/\s/g, '-'));

export const toTitleCase = (str: string, removeIllegalChars: boolean = true): string =>
  applyCase(str, removeIllegalChars, s => s.replace(/(?:^|\s)(.)/g, (_, char) => char.toUpperCase()));

export const toCobolCase = (str: string, removeIllegalChars: boolean = true): string =>
  applyCase(str, removeIllegalChars, s => s.replace(/\s/g, '-').toUpperCase());

export const toTrainCase = (str: string, removeIllegalChars: boolean = true): string =>
  applyCase(str, removeIllegalChars, s => s.replace(/(?:^|\s)(.)/g, (_, char) => char.toUpperCase()).replace(/\s/g, '-'));