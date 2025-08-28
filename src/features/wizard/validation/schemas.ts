import { z } from "zod";
import { validateCPF, validateCNPJ, validateCEP, validatePhone, validateMonetary } from "../../../utils/validators";

const commonValidators = {
  required: (message: string) => z.string().min(1, message),
  
  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .refine(validateCPF, "CPF inválido"),
  
  cnpj: z
    .string()
    .min(1, "CNPJ é obrigatório")
    .refine(validateCNPJ, "CNPJ inválido"),
  
  telefone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .refine(validatePhone, "Telefone inválido"),
  
  cep: z
    .string()
    .min(1, "CEP é obrigatório")
    .refine(validateCEP, "CEP inválido"),
  
  text: (fieldName: string, minLength: number = 1) =>
    z.string().min(minLength, `${fieldName} é obrigatório`),
  
  monetary: (fieldName: string) =>
    z.string().refine(validateMonetary, `${fieldName} deve ser um valor válido`),
};

const dadosBancariosSchema = z.object({
  banco: commonValidators.required("Selecione um banco"),
  tipoConta: commonValidators.required("Selecione o tipo de conta"),
  agencia: commonValidators.text("Agência").regex(/^\d{1,5}$/, "Agência deve conter apenas números (máximo 5 dígitos)"),
  conta: commonValidators.text("Conta").regex(/^\d{1,12}-?\d{0,2}$/, "Formato de conta inválido"),
});

const enderecoSchema = z.object({
  cep: commonValidators.cep,
  estado: commonValidators.required("Selecione o estado"),
  cidade: commonValidators.text("Cidade", 2),
  endereco: commonValidators.text("Endereço", 5),
  numero: commonValidators.text("Número"),
});

export const pessoaFisicaSchema = z.object({
  tipoPessoa: z.literal("PF"),
  profissional: commonValidators.required("Selecione um profissional"),
  nomeCompleto: commonValidators.text("Nome completo", 2).optional(),
  cpf: commonValidators.cpf,
  telefone: commonValidators.telefone,
  
  ...dadosBancariosSchema.shape,
  
  ...enderecoSchema.shape,
});

export const pessoaJuridicaExtra = z.object({
  razaoSocial: commonValidators.text("Razão social", 2),
  cnpj: commonValidators.cnpj,
  responsavelNome: commonValidators.text("Nome do responsável", 2),
  responsavelCpf: commonValidators.cpf,
});

export const pessoaJuridicaSchema = pessoaFisicaSchema
  .omit({ cpf: true })
  .extend({ tipoPessoa: z.literal("PJ") })
  .merge(pessoaJuridicaExtra);

export const step1Schema = z.discriminatedUnion("tipoPessoa", [
  pessoaFisicaSchema,
  pessoaJuridicaSchema,
]);

export const step2Schema = z.object({
  profissional: commonValidators.required("Selecione um profissional"),
  marcacaoDinamica: commonValidators.required("Selecione uma marcação dinâmica"),
  mensagem: commonValidators.text("Mensagem", 10).max(500, "Mensagem muito longa (máximo 500 caracteres)"),
});

export const step3Schema = z
  .object({
    profissional: commonValidators.required("Selecione um profissional"),
    metodoPagamento: z.enum(["PIX", "Cartão de crédito", "Boleto Bancário"], {
      errorMap: () => ({ message: "Selecione um método de pagamento" })
    }),
    cobrarMulta: z.boolean().default(false),
    valorMulta: z.string().optional(),
    cobrarJuros: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.cobrarMulta && (!data.valorMulta || data.valorMulta.trim() === "")) {
        return false;
      }
      return true;
    },
    {
      message: "Valor da multa é obrigatório quando multa está habilitada",
      path: ["valorMulta"],
    }
  )
  .refine(
    (data) => {
      if (data.cobrarMulta && data.valorMulta) {
        return validateMonetary(data.valorMulta);
      }
      return true;
    },
    {
      message: "Informe um valor de multa válido",
      path: ["valorMulta"],
    }
  );

export type Step1 = z.infer<typeof step1Schema>;
export type Step2 = z.infer<typeof step2Schema>;
export type Step3 = z.infer<typeof step3Schema>;

export type PessoaFisica = z.infer<typeof pessoaFisicaSchema>;
export type PessoaJuridica = z.infer<typeof pessoaJuridicaSchema>;
export type DadosBancarios = z.infer<typeof dadosBancariosSchema>;
export type Endereco = z.infer<typeof enderecoSchema>;