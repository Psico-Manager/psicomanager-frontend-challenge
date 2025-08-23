import styled from 'styled-components'

const Row = styled.ol`display:flex; gap:10px; list-style:none; padding:0; margin:0; flex-wrap:wrap;`
const Dot = styled.div<{state:'past'|'now'|'future'}>`
  width:26px; height:26px; border-radius:999px; display:grid; place-items:center;
  border:1px solid ${({theme})=> theme.colors.border};
  background: ${({theme, state})=> state==='past' ? theme.colors.primary : state==='now' ? theme.colors.stepBg : '#fff'};
  color: ${({state})=> state==='past' ? '#fff' : '#111827'}; font-size:12px;
`
const Label = styled.span<{state:'past'|'now'|'future'}>`font-size:14px; color:${({theme, state})=> state==='now' ? theme.colors.text : theme.colors.muted};`

export function Stepper({index}:{index:number}){
  const items = ['Cadastrar uma conta','Canais de envio e mensagem','Forma de pagamento']
  return (
    <Row>
      {items.map((t,i)=> {
        const step = i+1
        const state: 'past'|'now'|'future' = step < index ? 'past' : step === index ? 'now' : 'future'
        return (
          <li key={t} style={{display:'flex', alignItems:'center', gap:8}}>
            <Dot state={state}>{state==='past' ? '✓' : step}</Dot>
            <Label state={state}>{t}</Label>
          </li>
        )
      })}
    </Row>
  )
}
