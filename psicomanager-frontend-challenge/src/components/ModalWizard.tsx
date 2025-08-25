import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankFormSchema } from "../schemas/bankFormSchema";
//import FinanceiroWizard from "./FinanceiroWizard";
import './FormStyle.css';
import StepMensagemCobranca from "./StepMensagemCobranca";
import Step3Form from "./Step3Form";
import InputMask from "react-input-mask";
import StepIndicator from "./Stepper.tsx";

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
  mensagem: string;
  metodoPagamento: string[];
  cobrarMulta: boolean;
  valorMulta: number;
  cobrarJuros: boolean;
  valorJuros: number;
};

const onSubmit = (data: BankFormData) => {
  console.log("Dados válidos:", data);
};


const ModalWizard = ({ onClose }: { onClose: () => void }) => {
const methods = useForm<BankFormData>({
  resolver: zodResolver(bankFormSchema),
  mode: "onChange",
  defaultValues: {
    profissional: "Dr. Danilo",
    metodoPagamento: [],
    cobrarMulta: false,
    valorMulta: undefined,
    cobrarJuros: false,
    valorJuros: undefined,
    banco: "",
    tipoConta: "",
    agencia: "",
    contaComDigito: "",
    tipoPessoa: "Pessoa Física",
    cpf: "",
    telefone: "",
    cep: "",
    estado: "",
    cidade: "",
    endereco: "",
    numero: "",
    mensagem: "",
  },
});


  const [step, setStep] = useState(0); // Corrigido: antes estava só setStep
  const [personType, setPersonType] = useState("Pessoa Física");
  const bankOptions = ["Itaú", "Bradesco", "Santander", "Caixa", "Banco do Brasil"];
  const accountTypes = ["Corrente", "Poupança", "Salário"];
  const personTypes = ["Pessoa Física", "Pessoa Jurídica"];
  const states = ["MG", "SP", "RJ", "RS", "BA", "PR", "SC", "PE", "DF"];

  function onNext() {
  // por exemplo, avançar para o próximo passo do wizard
  setStep((prev) => prev + 1);
}
const {
  register,
  trigger,
  watch,
  formState: { errors },
} = methods

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

   const [ , setShowCongrats] = useState(false);
   const [validationError] = useState(false);
   const [successMessage, setSuccessMessage] = useState("");
  return (
    <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit)}>
        {successMessage && (
  <div style={{
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "12px 20px",
    borderRadius: "8px",
    marginBottom: "1rem",
    border: "1px solid #c3e6cb"
  }}>
    {successMessage}
  </div>
)}
{validationError && (
  <div
    style={{
      backgroundColor: "#fdecea",
      color: "#a94442",
      padding: "12px 20px",
      borderRadius: "8px",
      marginBottom: "1rem",
      border: "1px solid #f5c6cb"
    }}
  >
    ⚠️ <strong>Atenção:</strong> Existem campos obrigatórios não preenchidos. Verifique os dados antes de continuar.
  </div>
)}
       {step === 0 &&  (
      <>
      <h3>Ativar o PsychoBank</h3>
      <StepIndicator step={0} />
      <h4>Preencha os itens a seguir para configurar o PsichoBank</h4>
      <div className="texto0"><p>⚠️ <b>Atenção:</b> Preenchimento Obrigatório!</p>
Preencha todos os campos com atenção e precisão. As informações bancárias e pessoais inseridas nesta etapa são essenciais para o correto processamento dos dados e envio das cobranças.<br></br>
✅ Certifique-se de que os dados como CPF, CNPJ, agência e conta estejam corretos e atualizados.<br></br>
✅ Escolha o tipo de pessoa (Física ou Jurídica) conforme o perfil do cliente.<br></br>
✅ Campos obrigatórios estão sinalizados com *.<br></br>
Erros ou omissões podem impedir o avanço para as próximas etapas. Se tiver dúvidas, revise antes de continuar.<br></br>
</div>
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
    <input {...register("agencia")} className="form-input" placeholder="Digite aqui" />
  </FormField>

  <FormField label="Conta com Dígito" required error={errors.contaComDigito?.message}>
      <InputMask
        mask="999999-9"
        {...register("contaComDigito")}
        className="form-input"
        placeholder="Digite aqui"
  />
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
              <InputMask
              mask="999.999.999-99"
              {...register("cpf")}
              className="form-input"
              placeholder="___.___.___-__"
              />
          </FormField>

   <FormField label="Nome Completo" required error={errors.nomeCompleto?.message}>
     <input {...register("nomeCompleto")} className="form-input" placeholder="Digite aqui" />
   </FormField>
    </>
) : (
  <>
    <FormField label="Razão Social" required error={errors.razaoSocial?.message}>
      <input {...register("razaoSocial")} className="form-input" />
    </FormField>

    <FormField label="CNPJ" required error={errors.cnpj?.message}>
        <InputMask
          mask="99.999.999/9999-99"
          {...register("cnpj")}
          className="form-input"
          placeholder="__.___.___/____-__"
        />
    </FormField>

    <FormField label="Nome do Responsável" required error={errors.nomeResponsavel?.message}>
      <input {...register("nomeResponsavel")} className="form-input" type="text" />
    </FormField>

    <FormField label="CPF do Responsável" required error={errors.cpfResponsavel?.message}>
        <InputMask
          mask="999.999.999-99"
          {...register("cpfResponsavel")}
          className="form-input"
          placeholder="___.___.___-__"
        />
    </FormField>
  </>
)}

  <FormField label="Telefone" required error={errors.telefone?.message}>
    <InputMask
      mask="(99)99999.9999"
      {...register("telefone")}
      className="form-input"
      placeholder="(__)_____.____"
    />
  </FormField>

  <FormField label="CEP" required error={errors.cep?.message}>
      <InputMask
      mask="99999-999"
      {...register("cep")}
      className="form-input"
      placeholder="_____-___"
     />
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
  <input {...register("cidade")} className="form-input" type="text" placeholder="Digite aqui"/>
</FormField>

<FormField label="Endereço" required error={errors.endereco?.message}>
  <input {...register("endereco")} className="form-input" type="text" placeholder="Digite aqui"/>
</FormField>

<FormField label="Número" required error={errors.numero?.message}>
  <input {...register("numero")} className="form-input" placeholder="Ex: 987" />
</FormField>

<div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
  <button type="button" onClick={onClose}>Cancelar</button>

<button
  type="button"
onClick={async () => {
  const tipoPessoa = methods.getValues("tipoPessoa");
  let isValid = false;
  if (tipoPessoa === "Pessoa Física") {
    isValid = await trigger([
      "profissional", "banco", "tipoConta", "agencia", "contaComDigito",
      "tipoPessoa", "cpf", "telefone", "cep", "estado", "cidade", "endereco", "numero"
    ]as const);
  } else {
    isValid = await trigger([
      "profissional", "banco", "tipoConta", "agencia", "contaComDigito",
      "tipoPessoa", "razaoSocial", "cnpj", "nomeResponsavel", "cpfResponsavel",
      "telefone", "cep", "estado", "cidade", "endereco", "numero"
    ]as const);
  }
  if (isValid) {
    onNext();
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
  <div>
    <h3>Ativar o PsychoBank</h3>
    <StepIndicator step={1} />
    <h4>Preencha os itens a seguir para configurar o PsicoBank</h4>
    <StepMensagemCobranca
      onNext={() => setStep((prev) => prev + 1)} // ✅ só avança se o componente permitir
      onCancel={onClose}
    />
  </div>
)}

{step === 2 && (
  <div>
    <h3 className="nameMenu">Ativar o PsychoBank</h3>
    <StepIndicator step={2} />
    <h4>Preencha os itens a seguir para configurar o PsicoBank</h4>
    <Step3Form
      onClose={onClose}
      onClick={() => setShowCongrats(true)}
      onSuccess={() => {
        setSuccessMessage("Finalizado com sucesso ✅");
        setShowCongrats(true); // ativa o fundo

        setTimeout(() => {
          setSuccessMessage(""); // limpa a mensagem
          setShowCongrats(false); // opcional: volta ao fundo normal
          onClose(); // fecha o modal
        }, 3000);
      }}
    />
  </div>
)}
    </form>
    </FormProvider>
  );
};

export default ModalWizard;
