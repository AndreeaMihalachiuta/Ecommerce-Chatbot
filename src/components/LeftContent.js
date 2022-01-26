import React from 'react';
import styled from 'styled-components';

const LeftContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
`;

const Title = styled.span`
  font-family: 'Roboto';
  font-size: 40px;
  color: #6681d6;
  margin-bottom: 40px;
  font-weight: 600;
`;

const Description = styled.span`
  font-family: 'Roboto';
  font-size: 14px;
  margin-bottom: 40px;
`;

const Image = styled.img`
  height: 470px;
`;

const LeftContent = () => {
  return (
    <LeftContentWrapper>
      <Title>H&M Chatbot</Title>
      <Description>
        Buna ziua! Suntem la dispoziția dumneavoastră.
        Vă rugăm să ne spuneți cu ce vă putem ajuta.
      </Description>
      <div>
        <Image src="mainImage.svg" alt="haha" />
      </div>
    </LeftContentWrapper>
  );
};

export default LeftContent;
