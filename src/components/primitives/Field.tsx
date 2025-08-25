import styled from "styled-components";

export const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

export const InputBase = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.border)};
  background: #fff;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.06);
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    background: #f3f4f6;
    color: #6b7280;
  }

  &::placeholder {
    color: #7d8c94;
    opacity: 1; // garante que a cor seja aplicada em todos navegadores
  }
`;

export const Select = styled.select<{ error?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.border)};
  background: #fff;
  color: #111; // cor do texto normal

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.06);
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    background: #f3f4f6;
    color: #6b7280;
  }

  /* Placeholder simulado */
  option:first-child {
    color: #7d8c94;
  }

  /* quando o usuário seleciona algo diferente da primeira opção */
  &:not(:has(option[value=""]:checked)) {
    color: #111;
  }
`;

export const Helper = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger};
`;
