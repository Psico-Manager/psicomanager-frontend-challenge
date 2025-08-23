import styled from 'styled-components'

export const Button = styled.button<{variant?:'primary'|'secondary'}>`
  padding: ${({theme})=> theme.space(3)} ${({theme})=> theme.space(5)};
  border-radius: ${({theme})=> theme.radii.md};
  border: none;
  background: ${({variant='primary', theme})=> variant==='primary' ? theme.colors.primary : '#F3F4F6'};
  color: ${({variant='primary'})=> variant==='primary' ? '#fff' : '#111827'};
  cursor: pointer;
  transition: .12s;
  &:hover{ filter: brightness(.95); }
  &:disabled{ opacity:.6; cursor:not-allowed; }
`
