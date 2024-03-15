import React from "react";
import { styled } from "styled-components";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <StyledCard className="card">{children}</StyledCard>;
};

export default Card;

const StyledCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0px 5px 5px 0px #0000001a;
  min-height: 300px;
`;
