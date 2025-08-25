import { z } from "zod";

export const step3Schema = z.object({
  profissional: z.string().min(1, "Selecione um profissional"),

  pix: z.boolean().optional(),
  cartao: z.boolean().optional(),
  boleto: z.boolean().optional(),

  jurosAtivo: z.boolean().optional(),
  jurosValor: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Informe um valor numérico válido",
    }),

  multaAtiva: z.boolean().optional(),
  multaValor: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Informe um valor numérico válido",
    }),

  jurosAtrasoAtivo: z.boolean().optional(),
  jurosAtrasoValor: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Informe um valor numérico válido",
    }),
});

export type Step3Data = z.infer<typeof step3Schema>;
