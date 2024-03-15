import { styled } from "styled-components";

const RateDisclaimer = () => {
  return (
    <StyledCard>
      <StyledText>
        We use the mid-market rate for our Converter. This is for informational
        purposes only. You won’t receive this rate when sending money.
      </StyledText>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  background-color: #e8f3ff;
  padding: 16px 24px;
  border-radius: 8px;
  max-width: 520px;
  margin-bottom: 22px;
  @media (max-width: 600px) {
    display: none;
  }
`;
const StyledText = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  color: #000;
  padding: 0;
`;

export default RateDisclaimer;
