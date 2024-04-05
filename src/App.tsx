import React ,{useState}from 'react';
import './App.css';
import Main from './components/Main';
import Side from './components/Side';
import { json } from 'stream/consumers';

import jsondata2 from './components/jsondata2.json';

function App() {
  const data:any = JSON.stringify(jsondata2)
  const [jsonData,setjsonData] = useState<string>(data);
  return (
    <div className="App flex p-5">
      <Main {...{jsonData}}/>
      <Side {...{jsonData,setjsonData}}/>
    </div>
  );
}

export default App;
