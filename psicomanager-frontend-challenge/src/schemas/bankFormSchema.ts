import { z } from "zod";

export const bankFormSchema = z
  .object({

    metodoPagamento: z
      .array(z.string())
      .refine((arr) => arr.length > 0, {
        message: "Selecione pelo menos um método de pagamento",
      }),
    cobrarMulta: z.boolean(),
    valorMulta: z.coerce.number().optional(),
    cobrarJuros: z.boolean(),
    valorJuros: z.coerce.number().optional(),

    profissional: z.string(),
    banco: z.string().min(1, "Banco é obrigatório"),
    tipoConta: z.string().min(1, "Tipo de conta é obrigatório"),
    agencia: z.string().min(1, "Agência é obrigatória"),

    contaComDigito: z
      .string()
      .regex(/^\d{6}-\d{1}$/, "Formato: 000000-0"),

    conta: z.string().optional(),

    tipoPessoa: z
      .string()
      .refine((val) => ["Pessoa Física", "Pessoa Jurídica"].includes(val), {
        message: "Tipo de pessoa é obrigatório",
      }),

    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato: 000.000.000-00"),

    telefone: z
      .string()
      .regex(/^\(\d{2}\)\d{5}\.\d{4}$/, "Formato: (00)00000.0000"),

nomeCompleto: z
  .string()
  .min(1, "Nome é obrigatório")
  .max(50, "Máximo de 50 caracteres")
  .refine((val) => val.trim().length > 0, {
    message: "Nome não pode conter apenas espaços",
  }),
    cep: z
      .string()
      .regex(/^\d{5}-\d{3}$/, "Formato: 00000-000"),

    estado: z.string().min(1, "Estado é obrigatório"),
    cidade: z.string().min(1, "Cidade é obrigatória"),
    endereco: z.string().min(1, "Endereço é obrigatório"),
    numero: z.string().min(1, "Número é obrigatório"),
    mensagem: z.string().min(1, "A mensagem é obrigatória"),

    razaoSocial: z.string().trim().optional(),

    cnpj: z
      .string()
      .trim()
      .optional()
      .refine((val) => !val || /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(val), {
        message: "Formato: 00.000.000/0000-00",
      }),

    nomeResponsavel: z.string().trim().optional(),

    cpfResponsavel: z
      .string()
      .trim()
      .optional()
      .refine((val) => !val || /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val), {
        message: "Formato: 000.000.000-00",
      }),
  })

  .superRefine((data, ctx) => {
    if (
      data.cobrarMulta &&
      (data.valorMulta === undefined || isNaN(data.valorMulta))
    ) {
      ctx.addIssue({
        path: ["valorMulta"],
        code: "custom",
        message: "Informe o valor da multa",
      });
    }

    if (
      data.cobrarJuros &&
      (data.valorJuros === undefined || isNaN(data.valorJuros))
    ) {
      ctx.addIssue({
        path: ["valorJuros"],
        code: "custom",
        message: "Informe o valor dos juros",
      });
    }

    if (data.tipoPessoa === "Pessoa Jurídica") {
      if (!data.razaoSocial?.trim()) {
        ctx.addIssue({
          path: ["razaoSocial"],
          code: "custom",
          message: "Razão Social é obrigatória",
        });
      }
      if (!data.cnpj?.trim()) {
        ctx.addIssue({
          path: ["cnpj"],
          code: "custom",
          message: "CNPJ é obrigatório",
        });
      }
      if (!data.nomeResponsavel?.trim()) {
        ctx.addIssue({
          path: ["nomeResponsavel"],
          code: "custom",
          message: "Nome do responsável é obrigatório",
        });
      }
      if (!data.cpfResponsavel?.trim()) {
        ctx.addIssue({
          path: ["cpfResponsavel"],
          code: "custom",
          message: "CPF do responsável é obrigatório",
        });
      }
    }
  });