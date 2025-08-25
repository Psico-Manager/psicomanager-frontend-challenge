import { z } from "zod";

export const step1Schema = z
  .object({
    profissional: z.string().trim().min(1, "Profissional obrigatório"),
    banco: z.string().trim().min(1, "Banco obrigatório"),
    tipoConta: z.enum(["Corrente", "Poupança"], {
      message: "Tipo de conta obrigatório",
    }),
    agencia: z.string().regex(/^\d+$/, "Agência inválida"),
    conta: z.string().regex(/^\d+$/, "Conta inválida"),
    tipoPessoa: z.enum(["Fisica", "Juridica"], {
      message: "Tipo de pessoa obrigatório",
    }),

    // CPF (somente PF)
    cpf: z
      .string()
      .transform((val) => val.replace(/\D/g, ""))
      .optional(),

    // Nome completo (somente PF)
    nomeCompleto: z.string().optional(),

    // PJ
    razaoSocial: z.string().optional(),
    cnpj: z
      .string()
      .transform((val) => val.replace(/\D/g, ""))
      .optional(),
    nomeResponsavel: z.string().optional(),
    cpfResponsavel: z
      .string()
      .transform((val) => val.replace(/\D/g, ""))
      .optional(),

    // Contato e endereço
    telefone: z
      .string()
      .min(10, "Telefone deve ter pelo menos 10 dígitos")
      .max(15, "Telefone não pode ter mais de 15 dígitos"),
    cep: z
      .string()
      .transform((val) => val.replace(/\D/g, ""))
      .refine((val) => val.length === 8, "CEP deve conter 8 dígitos."),
    estado: z.string().trim().length(2, "Estado deve ter 2 letras"),
    cidade: z.string().trim().min(1, "Cidade obrigatória"),
    endereco: z.string().trim().min(1, "Endereço obrigatório"),
    numero: z.string().regex(/^\d+$/, "Número inválido"),
  })
  .superRefine((data, ctx) => {
    // Pessoa Física
    if (data.tipoPessoa === "Fisica") {
      if (!data.cpf || data.cpf.length !== 11) {
        ctx.addIssue({
          code: "custom",
          message: "CPF obrigatório e deve ter 11 dígitos",
          path: ["cpf"],
        });
      }
      if (!data.nomeCompleto || data.nomeCompleto.trim().length < 3) {
        ctx.addIssue({
          code: "custom",
          message: "Nome completo obrigatório",
          path: ["nomeCompleto"],
        });
      }
    }

    // Pessoa Jurídica
    if (data.tipoPessoa === "Juridica") {
      if (!data.razaoSocial) {
        ctx.addIssue({
          code: "custom",
          message: "Razão Social obrigatória",
          path: ["razaoSocial"],
        });
      }
      if (!data.cnpj || data.cnpj.length !== 14) {
        ctx.addIssue({
          code: "custom",
          message: "CNPJ deve conter 14 dígitos",
          path: ["cnpj"],
        });
      }
      if (!data.nomeResponsavel) {
        ctx.addIssue({
          code: "custom",
          message: "Nome do responsável obrigatório",
          path: ["nomeResponsavel"],
        });
      }
      if (!data.cpfResponsavel || data.cpfResponsavel.length !== 11) {
        ctx.addIssue({
          code: "custom",
          message: "CPF do responsável deve conter 11 dígitos",
          path: ["cpfResponsavel"],
        });
      }
    }
  });

export type Step1Data = z.infer<typeof step1Schema>;
