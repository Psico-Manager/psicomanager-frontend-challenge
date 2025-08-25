import { z } from "zod";

export const pessoaFisicaSchema = z.object({
  profissional: z.string().min(1),
  banco: z.string().min(1, "Selecione um banco"),
  tipoConta: z.string().min(1, "Selecione o tipo de conta"),
  agencia: z.string().min(1, "Informe a agência"),
  conta: z.string().min(1, "Informe a conta com dígito"),
  tipoPessoa: z.literal("PF"),
  cpf: z.string().min(14, "CPF inválido"),
  telefone: z.string().min(14, "Telefone inválido"),
  nomeCompleto: z.string().optional(),
  cep: z.string().min(8, "CEP inválido"),
  estado: z.string().min(1, "Selecione o estado"),
  cidade: z.string().min(1, "Informe a cidade"),
  endereco: z.string().min(1, "Informe o endereço"),
  numero: z.string().min(1, "Informe o número"),
});

export const pessoaJuridicaExtra = z.object({
  razaoSocial: z.string().min(1, "Informe a razão social"),
  cnpj: z.string().min(18, "CNPJ inválido"),
  responsavelNome: z.string().min(1, "Informe o responsável"),
  responsavelCpf: z.string().min(14, "CPF inválido do responsável"),
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
  profissional: z.string().min(1),
  marcacaoDinamica: z.string().min(1, "Selecione uma marcação"),
  mensagem: z.string().min(1, "Digite a mensagem"),
});

export const step3Schema = z
  .object({
    profissional: z.string().min(1),
    metodoPagamento: z.enum(["PIX", "Cartão de crédito", "Boleto Bancário"]),
    cobrarMulta: z.boolean().default(false),
    valorMulta: z.string().optional(),
    cobrarJuros: z.boolean().default(false),
    jurosDia: z.boolean().optional(),
  })
  .refine((d) => !d.cobrarMulta || (!!d.valorMulta && d.valorMulta !== ""), {
    message: "Informe o valor da multa",
    path: ["valorMulta"],
  });

export type Step1 = z.infer<typeof step1Schema>;
export type Step2 = z.infer<typeof step2Schema>;
export type Step3 = z.infer<typeof step3Schema>;
