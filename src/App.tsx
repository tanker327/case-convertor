import React, { useState } from 'react';
import { FaCode, FaFont, FaArrowUp, FaArrowDown, FaCopy } from 'react-icons/fa';
import { BiText } from 'react-icons/bi';
import { MdTextFields } from 'react-icons/md';
import * as caseConversion from './services/case-conversion';

type ConversionFunction = (input: string) => string;

interface ConversionOption {
  name: string;
  icon: React.ElementType;
  function: ConversionFunction;
  className: string;
}

const App: React.FC = () => {
  const [input, setInput] = useState('hello_world_test');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const conversionOptions: ConversionOption[] = [
    {
      name: 'To Camel Case',
      icon: FaCode,
      function: caseConversion.toCamelCase,
      className: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'To Snake Case',
      icon: BiText,
      function: caseConversion.toSnakeCase,
      className: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'To Constant Case',
      icon: FaFont,
      function: caseConversion.toConstantCase,
      className: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      name: 'To Pascal Case',
      icon: MdTextFields,
      function: caseConversion.toPascalCase,
      className: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      name: 'To Uppercase',
      icon: FaArrowUp,
      function: caseConversion.toUpperCase,
      className: 'bg-red-500 hover:bg-red-600'
    },
    {
      name: 'To Lowercase',
      icon: FaArrowDown,
      function: caseConversion.toLowerCase,
      className: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ];

  const convertCase = (conversionFunc: ConversionFunction) => {
    setOutput(conversionFunc(input));
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
          {conversionOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => convertCase(option.function)}
              className={`${option.className} text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors flex items-center justify-center`}
            >
              <option.icon className="mr-2" /> {option.name}
            </button>
          ))}
        </div>
        {output && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Result:</h2>
            <div
              className="bg-gray-100 p-3 rounded-md cursor-pointer hover:bg-gray-200 transition-colors relative group"
              onClick={copyToClipboard}
            >
              <p className="font-mono text-gray-800 pr-8">{output}</p>
              <div className="absolute top-2 right-2 text-gray-400 group-hover:text-gray-600">
                <FaCopy size={18} />
              </div>
              {copied && (
                <span className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-md rounded-tr-md">
                  Copied!
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2 flex items-center">
              <FaCopy size={14} className="mr-1" /> Click to copy
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;