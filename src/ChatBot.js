import React from 'react';
import styled from 'styled-components';
import LeftContent from './components/LeftContent';
import RightContent from './components/RightContent';

const PageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
  margin: 0 100px;
`;

const ChatBot = ({inputValue, setInputValue, data, setData}) => {
  return (
    <PageWrapper>
      <LeftContent />
      <RightContent inputValue={inputValue} setInputValue={setInputValue} data={data} setData={setData}/>
    </PageWrapper>
  );
};

export default ChatBot;
