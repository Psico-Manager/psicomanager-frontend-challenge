import styled from "styled-components";
import { AlertVariant } from "../../@types/forms";

interface AlertBoxProps {
  variant?: AlertVariant;
  children: React.ReactNode;
}

const getAlertStyles = (variant: AlertVariant, theme: any) => {
  switch (variant) {
    case "yellow":
      return {
        backgroundColor: theme.colors.alertYellowBg,
        color: theme.colors.alertYellowText,
        fontSize: "0.75rem",
      };
    case "blue":
      return {
        backgroundColor: theme.colors.alertBlueBg,
        color: theme.colors.alertBlueText,
        fontSize: "0.875rem",
      };
    case "success":
      return {
        backgroundColor: theme.colors.successBg,
        color: theme.colors.successText,
        fontSize: "0.875rem",
      };
    case "error":
      return {
        backgroundColor: "#FEF2F2",
        color: "#991B1B",
        fontSize: "0.875rem",
      };
    default:
      return {
        backgroundColor: theme.colors.alertYellowBg,
        color: theme.colors.alertYellowText,
        fontSize: "0.75rem",
      };
  }
};

export const AlertBox = styled.div<AlertBoxProps>`
  font-family: inherit;
  padding: ${({ theme }) => theme.space(3)} ${({ theme }) => theme.space(4)};
  border-radius: ${({ theme }) => theme.radii.md};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.space(4)};
  border-left: 4px solid currentColor;
  
  ${({ variant = "yellow", theme }) => {
    const styles = getAlertStyles(variant, theme);
    return `
      background-color: ${styles.backgroundColor};
      color: ${styles.color};
      font-size: ${styles.fontSize};
    `;
  }}

  strong {
    font-weight: 600;
    display: block;
    margin-bottom: ${({ theme }) => theme.space(1)};
  }

  ul {
    margin: ${({ theme }) => theme.space(2)} 0 0 ${({ theme }) => theme.space(4)};
    padding: 0;
  }

  li {
    margin-bottom: ${({ theme }) => theme.space(1)};
  }
`;