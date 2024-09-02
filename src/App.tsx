import React, { useState } from 'react';
import { FaCopy, FaChevronDown } from 'react-icons/fa';
import * as caseConversion from './services/case-conversion';

type ConversionOption = {
  name: string;
  function: (input: string) => string;
};

const App: React.FC = () => {
  const [input, setInput] = useState('hello_world_test');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ConversionOption | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const conversionOptions: ConversionOption[] = [
    { name: 'Camel Case', function: caseConversion.toCamelCase },
    { name: 'Snake Case', function: caseConversion.toSnakeCase },
    { name: 'Constant Case', function: caseConversion.toConstantCase },
    { name: 'Pascal Case', function: caseConversion.toPascalCase },
    { name: 'Uppercase', function: caseConversion.toUpperCase },
    { name: 'Lowercase', function: caseConversion.toLowerCase },
  ];

  const convertCase = () => {
    if (selectedOption) {
      setOutput(selectedOption.function(input));
      setCopied(false);
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
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
        <div className="mb-4 relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex items-center justify-between"
          >
            {selectedOption ? selectedOption.name : 'Select Case Conversion'}
            <FaChevronDown />
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
              {conversionOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedOption(option);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                >
                  {option.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={convertCase}
          disabled={!selectedOption}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          Convert
        </button>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Result:</h2>
          <div
            className={`bg-gray-100 p-3 rounded-md ${output ? 'cursor-pointer hover:bg-gray-200' : ''} transition-colors relative group min-h-[40px]`}
            onClick={copyToClipboard}
          >
            {output ? (
              <>
                <p className="font-mono text-gray-800 pr-8">{output}</p>
                <div className="absolute top-2 right-2 text-gray-400 group-hover:text-gray-600">
                  <FaCopy size={18} />
                </div>
                {copied && (
                  <span className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-md rounded-tr-md">
                    Copied!
                  </span>
                )}
              </>
            ) : (
              <p className="text-gray-500 italic">Converted text will appear here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;