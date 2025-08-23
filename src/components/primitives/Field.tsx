import styled from 'styled-components'

export const FieldWrap = styled.div`display:flex;flex-direction:column;gap:6px;`
export const Label = styled.label`font-size:12px;color:${({theme})=> theme.colors.muted};`
export const InputBase = styled.input<{error?:boolean}>`
  width:100%; padding:10px 12px; border-radius:${({theme})=> theme.radii.md};
  border:1px solid ${({theme, error})=> error ? theme.colors.danger : theme.colors.border}; background:#fff;
  &:focus{ outline:none; box-shadow:0 0 0 4px rgba(79,70,229,.06); border-color:${({theme})=> theme.colors.primary}; }
  &:disabled{ background:#F3F4F6; color:#6B7280; }
`
export const Select = styled.select<{error?:boolean}>`${''}`
export const Helper = styled.div`font-size:12px;color:${({theme})=> theme.colors.danger};`
