import React, { useMemo, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Step2, step2Schema } from '../../schema'
import { FieldWrap, Label, InputBase, Helper } from '../primitives/Field'
import { Button } from '../primitives/Button'

const Toolbar = () => (
  <div id="quill-toolbar" style={{marginBottom:8}}>
    <span className="ql-formats"><button className="ql-undo">↶</button><button className="ql-redo">↷</button></span>
    <span className="ql-formats"><select className="ql-header" defaultValue=""><option value="1"></option><option value="2"></option><option value=""></option></select></span>
    <span className="ql-formats"><button className="ql-bold"></button><button className="ql-italic"></button></span>
    <span className="ql-formats"><button className="ql-align" value=""></button><button className="ql-align" value="center"></button><button className="ql-align" value="right"></button><button className="ql-align" value="justify"></button></span>
    <span className="ql-formats"><button className="ql-list" value="bullet"></button><button className="ql-list" value="ordered"></button></span>
    <span className="ql-formats"><button className="ql-link"></button></span>
  </div>
)

const tokens = [
  {key:'NOME_CLIENTE', label:'Nome do cliente'},
  {key:'LINK_PAGAMENTO', label:'Link de pagamento'},
  {key:'DATA_SESSAO', label:'Data da sessão'}
]

export function Step2View({ profissional, defaultValues, onCancel, onSubmit }:{ profissional:string, defaultValues?:Step2, onCancel: ()=>void, onSubmit: (d:Step2)=>void }){
  const quillRef = useRef<ReactQuill | null>(null)
  const { register, setValue, handleSubmit, formState:{errors} } = useForm<Step2>({
    resolver: zodResolver(step2Schema), mode:'onChange',
    defaultValues: defaultValues ?? { profissional, marcacaoDinamica:'', mensagem: 'Olá {{NOME_CLIENTE}}, estamos enviando...' }
  })

  const modules = useMemo(()=> ({
    toolbar: { container: '#quill-toolbar', handlers: {
      undo: function(this:any){ this.quill.history.undo() },
      redo: function(this:any){ this.quill.history.redo() }
    } },
    history: { delay: 500, maxStack: 100, userOnly: true }
  }), [])

  function insertToken(){
    const select = document.getElementById('token-select') as HTMLSelectElement | null
    if(!select || !select.value) return
    const quill = quillRef.current?.getEditor()
    if(!quill) return
    const token = `{{${select.value}}}`
    const range = quill.getSelection(true)
    quill.insertText(range ? range.index : 0, token)
    quill.setSelection((range ? range.index : 0) + token.length, 0)
    setValue('mensagem', quill.root.innerHTML, { shouldValidate: true })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldWrap>
        <Label>Profissional</Label>
        <InputBase {...register('profissional')} disabled value={profissional} />
      </FieldWrap>

      <div style={{display:'flex', gap:8, alignItems:'flex-end', marginBottom:8}}>
        <div style={{flex:1}}>
          <FieldWrap>
            <Label>Marcação dinâmica *</Label>
            <select id="token-select" {...register('marcacaoDinamica')} defaultValue="" style={{padding:10, borderRadius:8, border:'1px solid #E5E7EB'}}>
              <option value="">Selecione</option>
              {tokens.map(t=> <option key={t.key} value={t.key}>{t.label}</option>)}
            </select>
            {errors.marcacaoDinamica && <Helper>{errors.marcacaoDinamica.message}</Helper>}
          </FieldWrap>
        </div>
        <Button variant="secondary" type="button" onClick={insertToken}>+ Inserir</Button>
      </div>

      <Toolbar />
      <ReactQuill ref={quillRef} theme="snow" defaultValue={defaultValues?.mensagem} onChange={(html)=> setValue('mensagem', html, { shouldValidate:true })} modules={modules} />

      {errors.mensagem && <Helper>{errors.mensagem.message}</Helper>}

      <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:16}}>
        <Button variant="secondary" type="button" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Próximo</Button>
      </div>
    </form>
  )
}
