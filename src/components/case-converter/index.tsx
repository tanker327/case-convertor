import React, { useState } from 'react';
import { FaCopy, FaTimes, FaCog } from 'react-icons/fa';
import useCaseConversion from '../../hooks/useCaseConversion';
import { ConversionOption } from '../../services/caseConversionService';

const CaseConverter: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const {
    input,
    output,
    copied,
    selectedOption,
    autoCopy,
    removeIllegalChars,
    conversionOptions,
    handleInputChange,
    handleKeyDown,
    clearInput,
    copyToClipboard,
    setAutoCopy,
    setRemoveIllegalChars,
    setSelectedOption,
  } = useCaseConversion();

  return (
    <div className="flex-grow flex h-screen">
      <div className="flex-grow flex items-center justify-center p-4 overflow-auto">
        <div className="card bg-base-100 shadow-xl w-full max-w-3xl">
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
            {/* Input area */}
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
            {/* Output area */}
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
      </div>
      {showSettings && (
        <div className="w-64 bg-base-100 shadow-xl h-screen overflow-y-auto">
          <div className="p-6 sticky top-0 bg-base-100 z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Settings</h2>
              <button
                className="btn btn-circle btn-ghost"
                onClick={() => setShowSettings(false)}
              >
                <FaTimes />
              </button>
            </div>
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
      <button
        className={`btn btn-circle btn-primary fixed bottom-4 right-4 ${showSettings ? 'hidden' : ''}`}
        onClick={() => setShowSettings(true)}
      >
        <FaCog />
      </button>
    </div>
  );
};

export default CaseConverter;