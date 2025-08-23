import React, { useState } from 'react'
import { Backdrop, ModalBox, ModalHeader, ModalBody } from './primitives/Modal'
import { Stepper } from './Stepper'
import { Step1View } from './steps/Step1View'
import { Step2View } from './steps/Step2View'
import { Step3View } from './steps/Step3View'
import { Step1, Step2, Step3 } from '../schema'
import { Button } from './primitives/Button'

export function ActivatePsicoBankModal({ onClose }:{ onClose: ()=>void }){
  const [current, setCurrent] = useState(1)
  const [step1, setStep1] = useState<Step1 | null>(null)
  const [step2, setStep2] = useState<Step2 | null>(null)
  const [step3, setStep3] = useState<Step3 | null>(null)
  const [flag, setFlag] = useState<{type:'success'|'error', text:string} | null>(null)

  function next(){ setCurrent(c=> Math.min(3, c+1)) }
  function prev(){ setCurrent(c=> Math.max(1, c-1)) }

  function finish(payload: Step3){
    setStep3(payload)
    const all = { step1, step2, step3: payload }
    console.log('[PsicoBank] payload final:', all)
    setFlag({type:'success', text:'PsicoBank ativado com sucesso!'})
    setTimeout(()=> { setFlag(null); onClose() }, 3000)
  }

  return (
    <Backdrop>
      <ModalBox>
        <ModalHeader>
          <div>
            <h3 style={{margin:'4px 0'}}>Ativar o PsicoBank</h3>
            <Stepper index={current} />
          </div>
          <Button variant="secondary" onClick={onClose}>×</Button>
        </ModalHeader>
        <ModalBody>
          {current === 1 && <Step1View defaultValues={step1 || undefined} onCancel={onClose} onSubmit={(d)=> { setStep1(d); next(); }} />}
          {current === 2 && <Step2View profissional={step1?.profissional || 'João Silva'} defaultValues={step2 || undefined} onCancel={()=> prev()} onSubmit={(d)=> { setStep2(d); next(); }} />}
          {current === 3 && <Step3View profissional={step1?.profissional || 'João Silva'} defaultValues={step3 || undefined} onCancel={onClose} onSubmit={finish} />}
          {flag && <div style={{marginTop:12, padding:12, background: flag.type === 'success' ? '#ECFDF5' : '#FEF2F2', color: flag.type === 'success' ? '#065F46' : '#991B1B', borderRadius:8}}>{flag.text}</div>}
        </ModalBody>
      </ModalBox>
    </Backdrop>
  )
}
