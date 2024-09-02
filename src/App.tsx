import React, { useState, useEffect } from 'react';
import { FaCopy, FaTimes, FaCog } from 'react-icons/fa';
import * as caseConversion from './services/case-conversion';

type ConversionOption = {
  name: string;
  function: (input: string, removeIllegalChars: boolean) => string;
  example: string;
};

const App: React.FC = () => {
  const [input, setInput] = useState('hello_world_test');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [autoCopy, setAutoCopy] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [removeIllegalChars, setRemoveIllegalChars] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    convertCase(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      copyToClipboard();
    }
  };

  const clearInput = () => {
    setInput('');
    setOutput('');
  };

  const conversionOptions: ConversionOption[] = [
    { name: 'camelCase', function: caseConversion.toCamelCase, example: 'myVariableName' },
    { name: 'snake_case', function: caseConversion.toSnakeCase, example: 'my_variable_name' },
    { name: 'CONSTANT_CASE', function: caseConversion.toConstantCase, example: 'MY_CONSTANT_NAME' },
    { name: 'PascalCase', function: caseConversion.toPascalCase, example: 'MyClassName' },
    { name: 'UPPERCASE', function: caseConversion.toUpperCase, example: 'MY UPPERCASE TEXT' },
    { name: 'lowercase', function: caseConversion.toLowerCase, example: 'my lowercase text' },
    { name: 'kebab-case', function: caseConversion.toKebabCase, example: 'my-kebab-case' },
    { name: 'Title Case', function: caseConversion.toTitleCase, example: 'My Title Case' },
    { name: 'COBOL-CASE', function: caseConversion.toCobolCase, example: 'MY-COBOL-CASE' },
    { name: 'Train-Case', function: caseConversion.toTrainCase, example: 'My-Train-Case' },
  ];

  const convertCase = (text: string = input) => {
    if (selectedOption !== -1) {
      const lines = text.split('\n');
      const convertedLines = lines.map(line =>
        conversionOptions[selectedOption].function(line, removeIllegalChars)
      );
      const newOutput = convertedLines.join('\n');
      setOutput(newOutput);
      setCopied(false);
      if (autoCopy) {
        copyToClipboard(newOutput);
      }
    }
  };

  const copyToClipboard = (text: string = output) => {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  useEffect(() => {
    convertCase();
  }, [selectedOption, removeIllegalChars]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="flex">
        <div className="card bg-base-100 shadow-xl w-full max-w-md">
          <div className="card-body">
            <div className="flex justify-between items-center mb-2">
              <h1 className="card-title text-2xl font-bold">Case Converter</h1>
              <div className="badge badge-neutral">{conversionOptions[selectedOption].name}</div>
              <button
                className="btn btn-circle btn-ghost"
                onClick={() => setShowSettings(!showSettings)}
              >
                <FaCog />
              </button>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Enter Text:</span>
              </label>
              <div className="relative">
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="textarea textarea-bordered w-full h-32 pr-10"
                  placeholder="e.g. hello_world, helloWorld, or HelloWorld"
                />
                {input && (
                  <button
                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                    onClick={clearInput}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Result:</h2>
              <div
                className={`bg-base-200 p-3 rounded-box relative h-32 overflow-auto ${output ? 'cursor-pointer hover:bg-base-300' : ''}`}
                onClick={() => !autoCopy && copyToClipboard()}
              >
                {output ? (
                  <>
                    <pre className="font-mono whitespace-pre-wrap break-words pr-8 h-full">{output}</pre>
                    {!autoCopy && (
                      <div className="absolute top-2 right-2 text-base-content opacity-50 hover:opacity-100">
                        <FaCopy size={18} />
                      </div>
                    )}
                    {copied && (
                      <div className="toast toast-top toast-end">
                        <div className="alert alert-success">
                          <span>Copied to clipboard!</span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-base-content opacity-50 italic">Converted text will appear here</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {showSettings && (
          <div className="card bg-base-100 shadow-xl w-96 ml-4">
            <div className="card-body">
              <h2 className="card-title text-xl font-bold mb-4">Settings</h2>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Auto-copy result</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary toggle"
                    checked={autoCopy}
                    onChange={(e) => setAutoCopy(e.target.checked)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Remove illegal characters</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary toggle"
                    checked={removeIllegalChars}
                    onChange={(e) => setRemoveIllegalChars(e.target.checked)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Case Conversion:</span>
                </label>
                <div className="flex flex-col space-y-2">
                  {conversionOptions.map((option, index) => (
                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        className="radio radio-primary"
                        name="caseConversion"
                        checked={selectedOption === index}
                        onChange={() => setSelectedOption(index)}
                      />
                      <span className="tooltip" data-tip={`Example: ${option.example}`}>
                        {option.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;