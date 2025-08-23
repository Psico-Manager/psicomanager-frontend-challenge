import styled from 'styled-components'

export const Backdrop = styled.div`
  position: fixed; inset: 0; background: ${({theme})=> theme.colors.overlay};
  display: grid; place-items: center; padding: 16px; z-index: 40;
`
export const ModalBox = styled.div`
  width:100%; max-width: 880px; background: ${({theme})=> theme.colors.surface};
  border: 1px solid ${({theme})=> theme.colors.border}; border-radius: ${({theme})=> theme.radii.lg};
  overflow: hidden;
`
export const ModalHeader = styled.div`
  padding: 16px 20px; border-bottom: 1px solid ${({theme})=> theme.colors.border};
  display:flex; justify-content:space-between; align-items:center;
`
export const ModalBody = styled.div` padding: 16px; `
