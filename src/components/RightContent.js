import React, {useState, useEffect} from 'react'; 
import styled from 'styled-components';
import { Input , Button} from 'antd';
const axios = require('axios').default;

const RightContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 50%;
`;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 700px;
  width: 500px;
  border-radius: 20px 20px 0 0;
  border: 30px solid #6681d6;
  border-bottom: 0;
  input {
  width: 426px !important;
  padding: 10px;
  border: 1px solid lightgrey;
  }
`;

const DefaultComandsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-height: 150px;
  /* background: pink; */
  padding: 5px;
  overflow-y: auto;
`;

const DefaultComandWrap = styled.div`
  font-family: 'Roboto';
  color: white;
  border-radius: 5px;
  background: #6681d6;
  margin: 5px;
  padding: 4px 15px;
  cursor: pointer;
  background: ${props=> props.isActive? "#302d44": "#6681d6"}
`;

const InputWrapper = styled.div`
display: flex;

button {
  background: #302d44;
    border: 0;
    color:white;
    border-radius: 2px;
}
`;
const BotResponse = styled.div`
background: #6681d6;
border-radius: 20px;
color: white;
padding: 10px;
width: 50%;
`;
const UserResponse = styled.div`
background: #f0f0f0;
border-radius: 20px;
color: black;
padding: 10px;
width: 40%;
align-self: flex-end;
`;
const ChatWrap = styled.div`
overflow-y: auto;
max-height: 550px;
display: flex;
flex-direction: column;
// justify-content: flex-end;
//align-items: flex-end;
`;

const RightContent = ({inputValue, setInputValue, data, setData}) => {
  const [detaliiComanda, setDetaliiComanda] = useState(false);
  const [infoTranspComanda, setInfoTranspComanda] = useState(false);
  const [statusComanda, setStatusComanda] = useState(false);
  const [returnareComanda, setReturnareComanda] = useState(false);
  const [ghidMarimi, setGhidMarimi] = useState(false);
  const [alteIntrebari, setAlteIntrebari] = useState(false);
  const [botResponse, setBotResponse] = useState([]);
  const onSearch = (value) => console.log(value) 
  console.log(inputValue, "ssss")
  console.log(data)
  console.log(botResponse)
  useEffect(() => {
    if(infoTranspComanda===true) {
      setData([]);
      setBotResponse([ "Ați apăsat butonul 'Detalii transport'. Vă rugăm să ne scrieți cu ce vă putem ajuta în această secțiune."])
    }
    if(detaliiComanda===true) {
      setData([]);
      setBotResponse(["Ați apăsat butonul 'Detalii comandă'. Vă rugăm să ne scrieți cu ce vă putem ajuta în această secțiune."])
    }
    if(statusComanda===true) {
      setData([]);
      setBotResponse(["Ați apăsat butonul 'Status comandă'. Vă rugăm să ne scrieți cu ce vă putem ajuta în această secțiune."])
    }
    if(returnareComanda===true) {
      setData([]);
      setBotResponse(["Ați apăsat butonul 'Returnare comandă'. Vă rugăm să ne scrieți cu ce vă putem ajuta în această secțiune."])
    }
    if(ghidMarimi===true) {
      setData([]);
      setBotResponse(["Ați apăsat butonul 'Ghid de mărimi'. Vă rugăm să ne scrieți mărimile dumneavoastră pentru piept, solduri si talie sub forma: 10, 10, 10"])
    }
    if(alteIntrebari===true) {
      setData([]);
      setBotResponse(["Ați apăsat butonul 'Alte întrebări'. Vă rugăm să ne scrieți cu ce vă putem ajuta în această secțiune."])
    }
    }, [infoTranspComanda, detaliiComanda, statusComanda, returnareComanda, ghidMarimi, alteIntrebari]);
  const activeRequest=() => {
    if(infoTranspComanda===true) {
      axios.post('/infoTranspComanda', {
        body: inputValue
      })
      .then(function (response) {
        console.log(response);
        setBotResponse([...botResponse, response.data])
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    if(statusComanda===true) {
      axios.post('/statusComanda', {
        body: inputValue
      })
      .then(function (response) {
        console.log(response);
        setBotResponse([...botResponse, response.data])
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    if(detaliiComanda===true) {
      axios.post('/detaliiComanda', {
        body: inputValue
      })
      .then(function (response) {
        console.log(response);
        setBotResponse([...botResponse, response.data])
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    if(returnareComanda===true) {
      axios.post('/returnareComanda', {
        body: inputValue
      })
      .then(function (response) {
        console.log(response);
        setBotResponse([...botResponse, response.data])
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    if(ghidMarimi===true) {
      axios.post('/ghidMarimi', {
        body: inputValue
      })
      .then(function (response) {
        console.log(response);
        setBotResponse([...botResponse, response.data])
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    if(alteIntrebari===true) {
      axios.post('/alteIntrebari', {
        body: inputValue
      })
      .then(function (response) {
        console.log(response);
        setBotResponse([...botResponse, response.data])
      })
      .catch(function (error) {
        console.log(error);
      });
    }
}
let result = botResponse.map(
  (element, index) => [element, data[index]]
).flat();

  return (
    <RightContentWrapper>
      <ChatWrapper>
        <div>
          <DefaultComandsWrapper>
            <DefaultComandWrap isActive={statusComanda} onClick={()=>{setStatusComanda(true); setDetaliiComanda(false); setInfoTranspComanda(false); setReturnareComanda(false); setGhidMarimi(false); setAlteIntrebari(false)}}>Status comandă</DefaultComandWrap>
            <DefaultComandWrap isActive={detaliiComanda} onClick={()=>{setDetaliiComanda(true); setStatusComanda(false); setInfoTranspComanda(false); setReturnareComanda(false); setGhidMarimi(false); setAlteIntrebari(false)}}>Detalii comandă</DefaultComandWrap>
            <DefaultComandWrap isActive={infoTranspComanda} onClick={()=>{setInfoTranspComanda(true); setDetaliiComanda(false); setStatusComanda(false); setReturnareComanda(false); setGhidMarimi(false); setAlteIntrebari(false)}}>Detalii transport</DefaultComandWrap>
            <DefaultComandWrap isActive={returnareComanda} onClick={()=>{setReturnareComanda(true); setStatusComanda(false); setDetaliiComanda(false); setInfoTranspComanda(false); setGhidMarimi(false); setAlteIntrebari(false)}}>Returnare comandă</DefaultComandWrap>
            <DefaultComandWrap isActive={ghidMarimi} onClick={()=>{setGhidMarimi(true); setStatusComanda(false); setDetaliiComanda(false); setReturnareComanda(false); setInfoTranspComanda(false); setAlteIntrebari(false)}}>Ghid de mărimi</DefaultComandWrap>
            <DefaultComandWrap isActive={alteIntrebari} onClick={()=>{setAlteIntrebari(true); setGhidMarimi(false); setStatusComanda(false); setDetaliiComanda(false); setReturnareComanda(false); setInfoTranspComanda(false)}}>Alte intrebări</DefaultComandWrap>
          </DefaultComandsWrapper>
          <ChatWrap>
            {
            result.map((response, index)=>{
              if (response !== undefined) {
              return index%2===0 ? <BotResponse>Bot: {response}</BotResponse> : <UserResponse>{response}</UserResponse>
              }
            })
            }
          </ChatWrap>
        </div>
        <InputWrapper>
        <Input placeholder="Introduceți mesajul dumneavoastră..." onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
        <Button onClick={()=>{activeRequest(); setData([...data, inputValue]); setInputValue(null)}}>Trimite</Button>
        </InputWrapper>
      </ChatWrapper>
    </RightContentWrapper>
  );
};

export default RightContent;
