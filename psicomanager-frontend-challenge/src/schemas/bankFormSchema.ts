import { z } from "zod";

export const bankFormSchema = z

  .object({
    profissional: z.string(),
    banco: z.string().min(1, "Banco é obrigatório"),
    tipoConta: z.string().min(1, "Tipo de conta é obrigatório"),
    agencia: z.string().min(1, "Agência é obrigatória"),
    contaComDigito: z.string().min(1, "Conta com dígito é obrigatória"),
    conta: z.string().optional(),
tipoPessoa: z.string().refine(
  (val) => ["Pessoa Física", "Pessoa Jurídica"].includes(val),
  { message: "Tipo de pessoa é obrigatório" }
),
    cpf: z.string().min(1, "CPF é obrigatório"),
    telefone: z.string().min(1, "Telefone é obrigatório"),
    nomeCompleto: z.string().optional(),
    cep: z.string().min(1, "CEP é obrigatório"),
    estado: z.string().min(1, "Estado é obrigatório"),
    cidade: z.string().min(1, "Cidade é obrigatória"),
    endereco: z.string().min(1, "Endereço é obrigatório"),
    numero: z.string().min(1, "Número é obrigatório"),
    mensagem: z.string().min(1, "A mensagem é obrigatória"),
    razaoSocial: z.string().trim().optional(),
    cnpj: z.string().trim().optional(),
    nomeResponsavel: z.string().trim().optional(),
    cpfResponsavel: z.string().trim().optional(),
  })

  .superRefine((data, ctx) => {
    if (data.tipoPessoa === "Pessoa Jurídica") {
      if (!data.razaoSocial) {
        ctx.addIssue({
          path: ["razaoSocial"],
          code: z.ZodIssueCode.custom,
          message: "Razão Social é obrigatória",
        });
      }
      if (!data.cnpj) {
        ctx.addIssue({
          path: ["cnpj"],
          code: z.ZodIssueCode.custom,
          message: "CNPJ é obrigatório",
        });
      }
      if (!data.nomeResponsavel) {
        ctx.addIssue({
          path: ["nomeResponsavel"],
          code: z.ZodIssueCode.custom,
          message: "Nome do responsável é obrigatório",
        });
      }
      if (!data.cpfResponsavel) {
        ctx.addIssue({
          path: ["cpfResponsavel"],
          code: z.ZodIssueCode.custom,
          message: "CPF do responsável é obrigatório",
        });
      }
    }
  });