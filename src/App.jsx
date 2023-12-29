import React from 'react';
import TextEditor from '../src/components/TextEditor';

const App = () => {
  return (
    <div className='lg:flex items-center'>
      <h1 className="text-4xl font-bold text-center my-4 lg:w-1/2">Text Editor App</h1>
      <TextEditor />
    </div>
  );
};

export default App;
