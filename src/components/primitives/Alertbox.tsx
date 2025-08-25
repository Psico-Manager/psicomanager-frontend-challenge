import styled from "styled-components";

interface AlertBoxProps {
  variant?: "yellow" | "blue";
}
export const AlertBox = styled.div<AlertBoxProps>`
  font-family: "Roboto", sans-serif;
  background-color: ${({ variant, theme }) =>
    variant === "blue" ? theme.colors.alertBlueBg : theme.colors.alertYellowBg};
  color: ${({ variant, theme }) =>
    variant === "blue"
      ? theme.colors.alertBlueText
      : theme.colors.alertYellowText};
  padding: 12px 16px;
  border-radius: 8px;
  font-size: ${({ variant }) => (variant === "blue" ? "14px" : "12px")};
  line-height: 1.4;
  margin-bottom: 16px;
`;
