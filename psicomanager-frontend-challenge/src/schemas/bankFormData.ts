import { z } from "zod";
import { bankFormSchema } from "./bankFormSchema"; // ajuste o caminho se necessário

export const mensagemSchema = z.object({
  mensagem: z.string().min(1, "A mensagem é obrigatória"),
});

export type BankFormData = z.infer<typeof bankFormSchema>;