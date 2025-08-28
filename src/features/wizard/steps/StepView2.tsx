import React, { useRef, useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Step2, step2Schema } from "../validation/schemas";
import { FieldWrap, Label, InputBase, Helper } from "../../../components/ui/InputField";
import { Button } from "../../../components/ui/Button";
import { AlertBox } from "../../../components/ui/Alertbox";
import { BoldSpan, MediumSpan } from "../../../components/ui/Span";
import { FormField } from "../../../components/ui/FormField";

// Constantes
const TOKENS = [
  { key: "NOME_CLIENTE", label: "Nome do cliente" },
  { key: "CPF_CLIENTE", label: "CPF do cliente" },
  { key: "TELEFONE_CLIENTE", label: "Telefone do cliente" },
] as const;

const DEFAULT_MESSAGE = "Olá {{NOME_CLIENTE}}. Estou te mandando um link no qual você consegue ver a melhor forma de pagamento das nossas sessões. Obrigado! {{CPF_CLIENTE}}";

const FORM_STYLES = {
  container: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "12px",
  },
  tokenSection: {
    display: "flex" as const,
    gap: 8,
    alignItems: "flex-end" as const,
    marginBottom: 8,
    paddingTop: 4,
  },
  tokenField: {
    flex: 1,
    paddingTop: 4,
  },
  buttonContainer: {
    display: "flex" as const,
    justifyContent: "flex-end" as const,
    gap: 8,
    marginTop: 16,
  },
  inputField: {
    padding: "6px 12px",
  },
};

// Tipos
interface Step2ViewProps {
  profissional: string;
  defaultValues?: Step2;
  onCancel: () => void;
  onSubmit: (data: Step2) => void;
  onProgress?: (progress: number) => void;
}

export const Step2View = memo(function Step2View({
  profissional,
  defaultValues,
  onCancel,
  onSubmit,
  onProgress,
}: Step2ViewProps) {
  const quillRef = useRef<ReactQuill | null>(null);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<Step2>({
    resolver: zodResolver(step2Schema),
    mode: "onChange",
    defaultValues: defaultValues ?? {
      profissional: "Murillo Nunes",
      marcacaoDinamica: "",
      mensagem: DEFAULT_MESSAGE,
    },
  });

  // Garantir que a mensagem padrão seja exibida quando não há valores prévios
  useEffect(() => {
    if (!defaultValues?.mensagem) {
      setValue("mensagem", DEFAULT_MESSAGE);
    }
  }, [defaultValues?.mensagem, setValue]);

  // Inicializar o editor com a mensagem padrão se não houver valor
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!watch("mensagem") && quillRef.current) {
        const quill = quillRef.current.getEditor();
        if (quill) {
          quill.root.innerHTML = DEFAULT_MESSAGE;
        }
      }
    }, 100); // Pequeno delay para garantir que o ReactQuill esteja montado
    
    return () => clearTimeout(timer);
  }, []);

  const values = watch();

  // Handlers
  const handleInsertToken = () => {
    const select = document.getElementById(
      "token-select"
    ) as HTMLSelectElement | null;
    
    if (!select?.value) return;

    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const token = `{{${select.value}}}`;
    const range = quill.getSelection(true);
    const insertIndex = range?.index ?? 0;
    
    quill.insertText(insertIndex, token);
    quill.setSelection(insertIndex + token.length, 0);
    setValue("mensagem", quill.root.innerHTML, { shouldValidate: true });
  };

  const handleMessageChange = (html: string) => {
    setValue("mensagem", html, { shouldValidate: true });
  };

  // Effects
  useEffect(() => {
    if (!onProgress) return;
    
    const total = Object.keys(values).length;
    const filled = Object.values(values).filter(
      (value) => value !== "" && value != null
    ).length;
    
    onProgress(Math.round((filled / total) * 100));
  }, [values, onProgress]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={FORM_STYLES.container}>
      <BoldSpan>
        Preencha os itens a seguir para configurar o PsicoBank
      </BoldSpan>

      <FieldWrap>
        <Label>Profissional</Label>
        <InputBase
          {...register("profissional")}
          disabled
          value="Murillo Nunes"
          style={FORM_STYLES.inputField}
        />
      </FieldWrap>
      
      <MediumSpan>Enviar cobrança por e-mail:</MediumSpan>
      
      <AlertBox variant="blue">
        Esta é a mensagem por e-mail que seus clientes irão receber. Clique no
        campo de texto para editar o conteúdo da mensagem e depois siga para o
        próximo passo.
      </AlertBox>

      <div style={FORM_STYLES.tokenSection}>
        <FieldWrap style={FORM_STYLES.tokenField}>
          <FormField
            name="marcacaoDinamica"
            label="Marcação dinâmica *"
            type="select"
            options={TOKENS.map((token) => ({ 
              label: token.label, 
              value: token.key 
            }))}
            register={register}
            watch={watch}
            setValue={setValue}
            trigger={trigger}
            errors={errors}
          />
        </FieldWrap>

        <Button variant="secondary" type="button" onClick={handleInsertToken}>
          + Inserir
        </Button>
      </div>

      <FieldWrap>
        <Label>Mensagem *</Label>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={watch("mensagem") || ""}
          onChange={handleMessageChange}
          modules={{
            toolbar: {
              container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic'],
                [{ 'align': ['', 'center', 'right', 'justify'] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link'],
                ['undo', 'redo']
              ]
            }
          }}
          placeholder="Digite sua mensagem aqui..."
        />
        {errors.mensagem && <Helper>{errors.mensagem.message}</Helper>}
      </FieldWrap>

      <div style={FORM_STYLES.buttonContainer}>
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Próximo</Button>
      </div>
    </form>
  );
});
