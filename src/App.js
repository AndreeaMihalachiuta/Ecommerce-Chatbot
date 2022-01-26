import React, {useState, useEffect} from 'react'
import ChatBot from './ChatBot'
const axios = require('axios').default;
function App() {
  const [inputValue, setInputValue] = useState(null);
  const [data, setData]=useState([]);

// useEffect(() => {
//   axios.post('/infoTranspComanda', {
//     body: inputValue
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// }, [inputValue])

  return (
  <div className="App">
   {/* {console.log('WSS', data)} */}
   <ChatBot inputValue={inputValue} setInputValue={setInputValue} data={data} setData={setData}/> 
    </div>
  );
}

export default App; 



