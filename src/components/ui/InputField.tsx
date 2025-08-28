import styled from 'styled-components';

export const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1.5)};
`;

export const Label = styled.label`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

export const InputBase = styled.input<{
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
}>`
  width: 100%;
  padding: ${({ size = 'md', theme }) => {
    const sizes = {
      sm: `${theme.space(1.5)} ${theme.space(2)}`,
      md: `${theme.space(2.5)} ${theme.space(3)}`,
      lg: `${theme.space(3)} ${theme.space(4)}`,
    };
    return sizes[size];
  }};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.border)};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  transition: all 0.15s ease-in-out;

  &:hover:not(:disabled) {
    border-color: ${({ theme, error }) =>
      error ? theme.colors.danger : theme.colors.primary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px
      ${({ theme, error }) =>
        error ? 'rgba(220, 38, 38, 0.1)' : 'rgba(51, 64, 148, 0.1)'};
    border-color: ${({ theme, error }) =>
      error ? theme.colors.danger : theme.colors.primary};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.muted};
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
    opacity: 1;
  }
`;

export const Select = styled.select<{
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
  hasValue?: boolean;
}>`
  width: 100%;
  padding: ${({ size = 'md', theme }) => {
    const sizes = {
      sm: `${theme.space(1.5)} ${theme.space(2)}`,
      md: `${theme.space(2.5)} ${theme.space(3)}`,
      lg: `${theme.space(3)} ${theme.space(4)}`,
    };
    return sizes[size];
  }};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.border)};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme, hasValue }) =>
    hasValue ? theme.colors.text : theme.colors.muted};
  font-size: 0.875rem;
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${({ theme, error }) =>
      error ? theme.colors.danger : theme.colors.primary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px
      ${({ theme, error }) =>
        error ? 'rgba(220, 38, 38, 0.1)' : 'rgba(51, 64, 148, 0.1)'};
    border-color: ${({ theme, error }) =>
      error ? theme.colors.danger : theme.colors.primary};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.muted};
    opacity: 0.6;
    cursor: not-allowed;
  }

  option:first-child {
    color: ${({ theme }) => theme.colors.muted};
  }

  option:not(:first-child) {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Helper = styled.div<{ role?: string }>`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.danger};
  margin-top: ${({ theme }) => theme.space(1)};
`;
