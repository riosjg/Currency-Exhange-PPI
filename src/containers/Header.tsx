import React from "react";
import { styled } from "styled-components";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <StyledHeader>
      <StyledTitle>{title}</StyledTitle>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  background-color: #0e1342;
  width: 100vw;
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px -6px #000;
`;

const StyledTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  font-family: "Inter", sans-serif;
  padding-left: 55px;
  @media (max-width: 600px) {
    padding-left: 16px;
  }
`;

export default Header;
