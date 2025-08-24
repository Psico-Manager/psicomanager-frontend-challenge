import { z } from "zod";
import { bankFormSchema } from "./bankFormSchema"; // ajuste o caminho se necessário

export type BankFormData = z.infer<typeof bankFormSchema>;