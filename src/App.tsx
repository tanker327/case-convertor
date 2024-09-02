import React, { useState, useEffect } from 'react';
import { FaCopy, FaTimes, FaCog } from 'react-icons/fa';
import * as caseConversion from './services/case-conversion';

type ConversionOption = {
  name: string;
  function: (input: string) => string;
};

const App: React.FC = () => {
  const [input, setInput] = useState('hello_world_test');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [autoCopy, setAutoCopy] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const clearInput = () => {
    setInput('');
    setOutput('');
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
    if (selectedOption !== -1) {
      const newOutput = conversionOptions[selectedOption].function(input);
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
  }, [selectedOption]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="flex">
        <div className="card bg-base-100 shadow-xl w-full max-w-md">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h1 className="card-title text-2xl font-bold">Case Converter</h1>
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
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  className="input input-bordered w-full pr-10"
                  placeholder="e.g. hello_world, helloWorld, or HelloWorld"
                />
                {input && (
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={clearInput}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>
            <button
              onClick={convertCase}
              className="btn btn-primary w-full mt-4"
            >
              Convert
            </button>
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Result:</h2>
              <div
                className={`bg-base-200 p-3 rounded-box relative min-h-[40px] ${output ? 'cursor-pointer hover:bg-base-300' : ''}`}
                onClick={() => !autoCopy && copyToClipboard()}
              >
                {output ? (
                  <>
                    <p className="font-mono pr-8">{output}</p>
                    {!autoCopy && (
                      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-base-content opacity-50 hover:opacity-100">
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
                    className="toggle toggle-primary"
                    checked={autoCopy}
                    onChange={(e) => setAutoCopy(e.target.checked)}
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
                      <span>{option.name}</span>
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