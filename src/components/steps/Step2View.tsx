// Step2View.tsx
import React, { useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step2, step2Schema } from "../../schema";
import { FieldWrap, Label, InputBase, Helper } from "../primitives/Field";
import { Button } from "../primitives/Button";
import { AlertBox } from "../primitives/Alertbox";
import { BoldSpan, MediumSpan } from "../primitives/span";
import { FormField } from "../primitives/FormField";

const tokens = [
  { key: "NOME_CLIENTE", label: "Nome do cliente" },
  { key: "LINK_PAGAMENTO", label: "Link de pagamento" },
  { key: "DATA_SESSAO", label: "Data da sessão" },
];

export function Step2View({
  profissional,
  defaultValues,
  onCancel,
  onSubmit,
  onProgress,
}: {
  profissional: string;
  defaultValues?: Step2;
  onCancel: () => void;
  onSubmit: (d: Step2) => void;
  onProgress?: (progress: number) => void;
}) {
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
      profissional,
      marcacaoDinamica: "",
      mensagem:
        "Olá {{NOME_CLIENTE}}, Estou te mandando um link no qual você consegue ver a melhor forma de pagamento das nossas sessões. Obrigado!",
    },
  });

  const values = watch();

  // Atualiza progresso
  useEffect(() => {
    if (onProgress) {
      const total = Object.keys(values).length;
      const filled = Object.values(values).filter(
        (v) => v !== "" && v != null
      ).length;
      onProgress(Math.round((filled / total) * 100));
    }
  }, [values, onProgress]);

  // Insere token no Quill
  function insertToken() {
    const select = document.getElementById(
      "token-select"
    ) as HTMLSelectElement | null;
    if (!select || !select.value) return;

    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const token = `{{${select.value}}}`;
    const range = quill.getSelection(true);
    quill.insertText(range ? range.index : 0, token);
    quill.setSelection((range ? range.index : 0) + token.length, 0);
    setValue("mensagem", quill.root.innerHTML, { shouldValidate: true });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      <BoldSpan>
        Preencha os itens a seguir para configurar o PsicoBank
      </BoldSpan>

      <FieldWrap>
        <Label>Profissional</Label>
        <InputBase
          {...register("profissional")}
          disabled
          value={profissional}
          style={{ padding: "6px 12px" }}
        />
      </FieldWrap>

      <AlertBox variant="blue">
        Esse é a mensagem por e-mail que seus clientes irão receber. Clique no
        campo de texto para editar o conteúdo da mensagem e depois siga para o
        próximo passo.
      </AlertBox>

      <MediumSpan>Enviar cobrança por e-mail:</MediumSpan>

      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "flex-end",
          marginBottom: 8,
          paddingTop: 4,
        }}
      >
        <FieldWrap style={{ flex: 1, paddingTop: 4 }}>
          <FormField
            name="marcacaoDinamica"
            label="Marcação dinâmica *"
            type="select"
            options={tokens.map((t) => ({ label: t.label, value: t.key }))}
            register={register}
            watch={watch}
            setValue={setValue}
            trigger={trigger}
            errors={errors}
          />
        </FieldWrap>

        <Button variant="secondary" type="button" onClick={insertToken}>
          + Inserir
        </Button>
      </div>

      <ReactQuill
        ref={quillRef}
        theme="snow"
        defaultValue={defaultValues?.mensagem}
        onChange={(html) =>
          setValue("mensagem", html, { shouldValidate: true })
        }
      />
      {errors.mensagem && <Helper>{errors.mensagem.message}</Helper>}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginTop: 16,
        }}
      >
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Próximo</Button>
      </div>
    </form>
  );
}
