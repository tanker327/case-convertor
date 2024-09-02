import React, { useState } from 'react';
import { FaCode, FaFont, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { BiText } from 'react-icons/bi';
import { MdTextFields } from 'react-icons/md';

const App: React.FC = () => {
  const [input, setInput] = useState('hello_world_test');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const convertToCamelCase = () => {
    const camelCase = input.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    setOutput(camelCase);
    setCopied(false);
  };

  const convertToSnakeCase = () => {
    const snakeCase = input.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    setOutput(snakeCase.charAt(0) === '_' ? snakeCase.slice(1) : snakeCase);
    setCopied(false);
  };

  const convertToConstantCase = () => {
    const constantCase = input
      .split(/(?=[A-Z])|_/)
      .join('_')
      .toUpperCase();
    setOutput(constantCase);
    setCopied(false);
  };

  const convertToPascalCase = () => {
    const pascalCase = input
      .toLowerCase()
      .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
      .replace(/^[a-z]/, letter => letter.toUpperCase());
    setOutput(pascalCase);
    setCopied(false);
  };

  const convertToUpperCase = () => {
    setOutput(input.toUpperCase());
    setCopied(false);
  };

  const convertToLowerCase = () => {
    setOutput(input.toLowerCase());
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Case Converter</h1>
        <div className="mb-4">
          <label htmlFor="inputCase" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Text:
          </label>
          <input
            type="text"
            id="inputCase"
            value={input}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. hello_world, helloWorld, or HelloWorld"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={convertToCamelCase}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex items-center justify-center"
          >
            <FaCode className="mr-2" /> To Camel Case
          </button>
          <button
            onClick={convertToSnakeCase}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors flex items-center justify-center"
          >
            <BiText className="mr-2" /> To Snake Case
          </button>
          <button
            onClick={convertToConstantCase}
            className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors flex items-center justify-center"
          >
            <FaFont className="mr-2" /> To Constant Case
          </button>
          <button
            onClick={convertToPascalCase}
            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors flex items-center justify-center"
          >
            <MdTextFields className="mr-2" /> To Pascal Case
          </button>
          <button
            onClick={convertToUpperCase}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors flex items-center justify-center"
          >
            <FaArrowUp className="mr-2" /> To Uppercase
          </button>
          <button
            onClick={convertToLowerCase}
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors flex items-center justify-center"
          >
            <FaArrowDown className="mr-2" /> To Lowercase
          </button>
        </div>
        {output && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Result:</h2>
            <div
              className="bg-gray-100 p-3 rounded-md cursor-pointer hover:bg-gray-200 transition-colors relative"
              onClick={copyToClipboard}
            >
              <p className="font-mono text-gray-800">{output}</p>
              {copied && (
                <span className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-md rounded-tr-md">
                  Copied!
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">Click to copy</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;