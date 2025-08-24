import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankFormSchema } from "../schemas/bankFormSchema";
//import FinanceiroWizard from "./FinanceiroWizard";
import './FormStyle.css';
import StepMensagemCobranca from "./StepMensagemCobranca";

type BankFormData = {
  profissional: string;
  banco: string;
  tipoConta: string;
  agencia: string;
  contaComDigito: string;
  tipoPessoa: string;
  cpf: string;
  telefone: string;
  cep: string;
  estado: string;
  cidade: string;
  endereco: string;
  numero: string;
  conta?: string;
  nomeCompleto?: string;
  razaoSocial?: string;
  cnpj?: string;
  nomeResponsavel?: string;
  cpfResponsavel?: string;
};

const onSubmit = (data: BankFormData) => {
  console.log("Dados válidos:", data);
};

const ModalWizard = ({ onClose }: { onClose: () => void }) => {
  const methods = useForm<BankFormData>({
  resolver: zodResolver(bankFormSchema),
  mode: "onChange",
});
  const [step, setStep] = useState(0); // Corrigido: antes estava só setStep
  const [personType, setPersonType] = useState("Pessoa Física");
  const bankOptions = ["Itaú", "Bradesco", "Santander", "Caixa", "Banco do Brasil"];
  const accountTypes = ["Corrente", "Poupança", "Salário"];
  const personTypes = ["Pessoa Física", "Pessoa Jurídica"];
  const states = ["MG", "SP", "RJ", "RS", "BA", "PR", "SC", "PE", "DF"];

const {
  register,
  trigger,
  watch,
  formState: { errors },
} = useForm({
  resolver: zodResolver(bankFormSchema),
  shouldUnregister: true,
});

  const selectedPersonType = watch("tipoPessoa");

  useEffect(() => {
    if (selectedPersonType) setPersonType(selectedPersonType);
  }, [selectedPersonType]);

  interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}

  const FormField: React.FC<FormFieldProps> = ({ label, required, children, error }) => (
  <div className="form-group">
    <label className="form-label">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="form-error">{error}</p>}
  </div>
);

  return (
    <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div>
{step === 0 &&  (
  <>
  <FormField label="Profissional" required error={errors.profissional?.message}>
  <input
    {...register("profissional")}
    value="Dr. Danilo"
    disabled
    className="form-input"
  />
</FormField>

<FormField label="Banco" required error={errors.banco?.message}>
  <select {...register("banco")} className="form-input">
    <option value="">Selecione</option>
    {bankOptions.map((bank) => (
      <option key={bank} value={bank}>{bank}</option>
    ))}
  </select>
</FormField>

<FormField label="Tipo de Conta" required error={errors.tipoConta?.message}>
  <select {...register("tipoConta")} className="form-input">
    <option value="">Selecione</option>
    {accountTypes.map((type) => (
      <option key={type} value={type}>{type}</option>
    ))}
  </select>
</FormField>

<FormField label="Agência" required error={errors.agencia?.message}>
  <input {...register("agencia")} className="form-input" />
</FormField>

<FormField label="Conta com Dígito" required error={errors.contaComDigito?.message}>
  <input {...register("contaComDigito")} className="form-input" />
</FormField>

<FormField label="Tipo de Pessoa" required error={errors.tipoPessoa?.message}>
  <select {...register("tipoPessoa")} className="form-input">
    <option value="">Selecione</option>
    {personTypes.map((type) => (
      <option key={type} value={type}>{type}</option>
    ))}
  </select>
</FormField>
{personType === "Pessoa Física" ? (
  <>
    <FormField label="CPF" required error={errors.cpf?.message}>
      <input {...register("cpf")} className="form-input" />
    </FormField>

    <FormField label="Nome Completo" error={errors.nomeCompleto?.message}>
      <input {...register("nomeCompleto")} className="form-input" />
    </FormField>
  </>
) : (
  <>
    <FormField label="Razão Social" required error={errors.razaoSocial?.message}>
      <input {...register("razaoSocial")} className="form-input" />
    </FormField>

    <FormField label="CNPJ" required error={errors.cnpj?.message}>
      <input {...register("cnpj")} className="form-input" />
    </FormField>

    <FormField label="Nome do Responsável" error={errors.nomeResponsavel?.message}>
      <input {...register("nomeResponsavel")} className="form-input" />
    </FormField>

    <FormField label="CPF do Responsável" error={errors.cpfResponsavel?.message}>
      <input {...register("cpfResponsavel")} className="form-input" />
    </FormField>
  </>
)}

<FormField label="Telefone" required error={errors.telefone?.message}>
  <input {...register("telefone")} className="form-input" />
</FormField>

<FormField label="CEP" required error={errors.cep?.message}>
  <input {...register("cep")} className="form-input" />
</FormField>

<FormField label="Estado" required error={errors.estado?.message}>
  <select {...register("estado")} className="form-select">
    <option value="">Selecione</option>
    {states.map((uf) => (
      <option key={uf} value={uf}>{uf}</option>
    ))}
  </select>
</FormField>

<FormField label="Cidade" required error={errors.cidade?.message}>
  <input {...register("cidade")} className="form-input" />
</FormField>

<FormField label="Endereço" required error={errors.endereco?.message}>
  <input {...register("endereco")} className="form-input" />
</FormField>

<FormField label="Número" required error={errors.numero?.message}>
  <input {...register("numero")} className="form-input" />
</FormField>
<div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
  <button type="button" onClick={onClose}>Cancelar</button>
<button
  type="button"
onClick={ async () => {
  const isValid = await trigger(); // valida todos os campos visíveis
  if (isValid) {
    onNext(); // avança para o passo 2
  }
}}
  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
>
  Próximo
</button>
</div>
</>

)}
{step === 1 && (
  <StepMensagemCobranca
    onNext={() => {
      methods.handleSubmit(onSubmit)(); // chama validação + console.log
    }}
    onCancel={onClose}
  />
)}
      </div>
    </form>
    </FormProvider>
  );

function onNext() {
  // por exemplo, avançar para o próximo passo do wizard
  setStep((prev) => prev + 1);
}

};



export default ModalWizard;



