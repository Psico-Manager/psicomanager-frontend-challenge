import styled from 'styled-components'
export const Card = styled.div`
  background: ${({theme})=> theme.colors.surface};
  border: 1px solid ${({theme})=> theme.colors.border};
  border-radius: ${({theme})=> theme.radii.lg};
  padding: ${({theme})=> theme.space(6)};
  box-shadow: 0 1px 2px rgba(0,0,0,.04);
`
