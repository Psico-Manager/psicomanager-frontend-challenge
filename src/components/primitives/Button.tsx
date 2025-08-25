import styled from "styled-components";

export const Button = styled.button<{
  variant?: "primary" | "secondary" | "tertiary";
}>`
  padding: ${({ theme }) => theme.space(2)} ${({ theme }) => theme.space(8)};
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ variant = "primary", theme }) =>
    variant === "primary"
      ? "none"
      : variant === "secondary"
      ? `1px solid ${theme.colors.primary}`
      : "none"};
  background: ${({ variant = "primary", theme }) =>
    variant === "primary"
      ? theme.colors.primary
      : variant === "secondary"
      ? "#F3F4F6"
      : "transparent"};
  color: ${({ variant = "primary", theme }) =>
    variant === "primary"
      ? "#fff"
      : variant === "secondary"
      ? theme.colors.primary
      : theme.colors.primary};
  cursor: pointer;
  transition: 0.12s;

  &:hover {
    filter: brightness(0.95);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
