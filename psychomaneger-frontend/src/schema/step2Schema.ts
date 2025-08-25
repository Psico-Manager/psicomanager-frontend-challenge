import { z } from "zod";

export const step2Schema = z.object({
  emailCobranca: z.string().min(1, "Selecione uma clínica ou profissional"),
  mensagemPadrao: z
    .string()
    .min(10, "A mensagem deve ter pelo menos 10 caracteres"),
});

export type Step2Data = z.infer<typeof step2Schema>;
