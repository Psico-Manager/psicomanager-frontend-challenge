import { z } from "zod";

export const bankFormSchema = z
  .object({
    profissional: z.string(),
    banco: z.string().min(1, "Banco é obrigatório"),
    tipoConta: z.string().min(1, "Tipo de conta é obrigatório"),
    agencia: z.string().min(1, "Agência é obrigatória"),
    contaComDigito: z.string().min(1, "Conta com dígito é obrigatória"),
    conta: z.string().optional(),
    tipoPessoa: z.string().min(1, "Tipo de pessoa é obrigatório"),
    cpf: z.string().min(1, "CPF é obrigatório"), // ✅ obrigatório sempre
    telefone: z.string().min(1, "Telefone é obrigatório"),
    nomeCompleto: z.string().optional(),
    cep: z.string().min(1, "CEP é obrigatório"),
    estado: z.string().min(1, "Estado é obrigatório"),
    cidade: z.string().min(1, "Cidade é obrigatória"),
    endereco: z.string().min(1, "Endereço é obrigatório"),
    numero: z.string().min(1, "Número é obrigatório"),
    mensagem: z.string().min(1, "A mensagem é obrigatória"),
    razaoSocial: z.string().optional(),
    cnpj: z.string().optional(),
    nomeResponsavel: z.string().optional(),
    cpfResponsavel: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.tipoPessoa === "Pessoa Jurídica") {
      if (!data.razaoSocial || data.razaoSocial.trim() === "") {
        ctx.addIssue({
          path: ["razaoSocial"],
          code: z.ZodIssueCode.custom,
          message: "Razão Social é obrigatória",
        });
      }
      if (!data.cnpj || data.cnpj.trim() === "") {
        ctx.addIssue({
          path: ["cnpj"],
          code: z.ZodIssueCode.custom,
          message: "CNPJ é obrigatório",
        });
      }
      if (!data.nomeResponsavel || data.nomeResponsavel.trim() === "") {
        ctx.addIssue({
          path: ["nomeResponsavel"],
          code: z.ZodIssueCode.custom,
          message: "Nome do responsável é obrigatório",
        });
      }
      if (!data.cpfResponsavel || data.cpfResponsavel.trim() === "") {
        ctx.addIssue({
          path: ["cpfResponsavel"],
          code: z.ZodIssueCode.custom,
          message: "CPF do responsável é obrigatório",
        });
      }
    }
  });