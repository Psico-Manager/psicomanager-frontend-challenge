import styled from 'styled-components'

const Aside = styled.aside`
  background: ${({theme})=> theme.colors.sidebarBg};
  color: ${({theme})=> theme.colors.sidebarText};
  padding: 16px;
  @media(max-width:900px){ position:sticky; top:0; z-index:20; }
`
const Item = styled.button<{active?:boolean}>`
  width:100%; background:transparent; color:${({theme, active})=> active ? '#fff' : theme.colors.sidebarMuted};
  border:none; text-align:left; padding:12px; border-radius:10px; margin-bottom:6px;
  ${({active})=> active && 'background: rgba(79,70,229,0.25);'}
  &:disabled{ opacity:.7; }
`
const items = ['Painel','Clientes','Agenda','Financeiro','Relatórios','Marketing','Configuração','Minha clínica']

export function Sidebar(){
  return (
    <Aside>
      <h3 style={{margin:'6px 8px 16px'}}>PsicoManager</h3>
      {items.map(i=> <Item key={i} active={i==='Financeiro'} disabled={i!=='Financeiro'}>{i}</Item>)}
    </Aside>
  )
}
