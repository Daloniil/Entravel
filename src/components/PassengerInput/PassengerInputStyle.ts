import styled from "styled-components";
import { colors, typography } from "../../styles/theme";

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

export const PassengerInputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.label`
  ${typography.body.medium};
  color: ${colors.textPrimary};
  margin-bottom: 4px;
`;
