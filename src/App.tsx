import React, { useState } from 'react'
import styled from 'styled-components'
import { Sidebar } from './components/Sidebar'
import { ActivatePsicoBankModal } from './components/ActivatePsicoBankModal'
import { Card } from './components/primitives/Card'
import { Button } from './components/primitives/Button'

const Grid = styled.div`
  display:grid;
  grid-template-columns: 260px 1fr;
  min-height:100vh;
  @media(max-width:900px){ grid-template-columns: 1fr; }
`
const Main = styled.main`
  padding: ${({theme})=> theme.space(6)};
`

export default function App(){
  const [open, setOpen] = useState(false)
  return (
    <Grid>
      <Sidebar />
      <Main>
        <h1 style={{marginTop:0}}>Financeiro</h1>
        <Card>
          <p>Ative o PsicoBank para começar a cobrar seus clientes de forma prática.</p>
          <div style={{display:'flex', justifyContent:'center', marginTop:16}}>
            <Button onClick={()=> setOpen(true)}>Ativar PsicoBank</Button>
          </div>
        </Card>
      </Main>
      {open && <ActivatePsicoBankModal onClose={()=> setOpen(false)} />}
    </Grid>
  )
}
