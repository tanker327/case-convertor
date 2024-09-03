import { useState, useEffect } from 'react';
import * as caseConversionService from '../services/caseConversionService';

const useCaseConversion = () => {
  const [input, setInput] = useState('hello_world_test');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [autoCopy, setAutoCopy] = useState(false);
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

  const convertCase = (text: string = input) => {
    if (selectedOption >= 0 && selectedOption < caseConversionService.conversionOptions.length) {
      const convertFunction = caseConversionService.conversionOptions[selectedOption].function;
      const newOutput = convertFunction(text, removeIllegalChars);
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
    convertCase(input);
  }, [selectedOption, removeIllegalChars, input]);

  return {
    input,
    output,
    copied,
    selectedOption,
    autoCopy,
    removeIllegalChars,
    conversionOptions: caseConversionService.conversionOptions,
    handleInputChange,
    handleKeyDown,
    clearInput,
    copyToClipboard,
    setAutoCopy,
    setRemoveIllegalChars,
    setSelectedOption,
  };
};

export default useCaseConversion;