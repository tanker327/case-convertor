import React from 'react';

const App: React.FC = () => {
  const handleClick = () => {
    alert('Hello World');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Electron React TypeScript App</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Click me!
      </button>
    </div>
  );
};

export default App;