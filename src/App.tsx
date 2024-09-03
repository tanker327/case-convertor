import React from 'react';
import CaseConverter from './components/case-converter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-200 flex">
      <CaseConverter />
    </div>
  );
};

export default App;