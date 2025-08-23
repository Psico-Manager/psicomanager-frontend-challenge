import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Step3, step3Schema } from '../../schema'
import { FieldWrap, Label, InputBase, Helper } from '../primitives/Field'
import { Button } from '../primitives/Button'
import styled from 'styled-components'

const Methods = styled.div`margin-bottom:12px;`

export function Step3View({ profissional, defaultValues, onCancel, onSubmit }:{ profissional:string, defaultValues?:Step3, onCancel: ()=>void, onSubmit: (d:Step3)=>void }){
  const [unique, setUnique] = useState<Step3['metodoPagamento']>(defaultValues?.metodoPagamento ?? 'PIX')
  const { register, setValue, handleSubmit, formState:{errors} } = useForm<Step3>({
    resolver: zodResolver(step3Schema), mode:'onChange',
    defaultValues: defaultValues ?? { profissional, metodoPagamento: unique, cobrarMulta:false, valorMulta:'', cobrarJuros:false, jurosDia:'' }
  })

  function selectMetodo(v: Step3['metodoPagamento']){
    setUnique(v); setValue('metodoPagamento', v, { shouldValidate:true })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldWrap>
        <Label>Profissional</Label>
        <InputBase value={profissional} disabled />
      </FieldWrap>

      <Methods>
        <div style={{fontSize:12, color:'#6B7280', marginBottom:6}}>Disponibilizar meios de pagamento *</div>
        {(['PIX','Cartão de crédito','Boleto Bancário'] as const).map(m=> (
          <label key={m} style={{display:'flex', gap:8, alignItems:'center', marginBottom:6}}>
            <input type="checkbox" checked={unique === m} onChange={()=> selectMetodo(m)} />
            <span>{m}</span>
          </label>
        ))}
        {errors.metodoPagamento && <Helper>{errors.metodoPagamento.message}</Helper>}
      </Methods>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
        <label style={{display:'flex', gap:8, alignItems:'center'}}><input type="checkbox" {...register('cobrarMulta')} /> Cobrar multa (%)</label>
        <FieldWrap><InputBase placeholder="0,00" {...register('valorMulta')} error={!!errors.valorMulta} />{errors.valorMulta && <Helper>{errors.valorMulta.message}</Helper>}</FieldWrap>

        <label style={{display:'flex', gap:8, alignItems:'center'}}><input type="checkbox" {...register('cobrarJuros')} /> Cobrar juros ao dia (%)</label>
        <FieldWrap><InputBase placeholder="0,00" {...register('jurosDia')} error={!!errors.jurosDia} />{errors.jurosDia && <Helper>{errors.jurosDia.message}</Helper>}</FieldWrap>
      </div>

      <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:16}}>
        <Button variant="secondary" type="button" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Concluir</Button>
      </div>
    </form>
  )
}
