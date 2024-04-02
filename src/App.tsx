import React from 'react';
import './App.css';
import Main from './components/Main';
import Side from './components/Side';

function App() {
  return (
    <div className="App flex p-5">
      <Main/>
      <Side/>
    </div>
  );
}

export default App;
