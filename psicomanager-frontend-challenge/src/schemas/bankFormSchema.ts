import z from "zod";

export const bankFormSchema = z
  .object({
    profissional: z.string(),
    banco: z.string().min(1, "Banco é obrigatório"),
    tipoConta: z.string().min(1, "Tipo de conta é obrigatório"),
    agencia: z.string().min(1, "Agência é obrigatória"),
    contaComDigito: z.string().min(1, "Conta com dígito é obrigatória"),
    conta: z.string().optional(),
    tipoPessoa: z.string().min(1, "Tipo de pessoa é obrigatório"),
    cpf: z.string().min(1, "CPF é obrigatório"),
    telefone: z.string().min(1, "Telefone é obrigatório"),
    nomeCompleto: z.string().optional(),
    cep: z.string().min(1, "CEP é obrigatório"),
    estado: z.string().min(1, "Estado é obrigatório"),
    cidade: z.string().min(1, "Cidade é obrigatória"),
    endereco: z.string().min(1, "Endereço é obrigatório"),
    numero: z.string().min(1, "Número é obrigatório"),

    razaoSocial: z.string().optional(),
    cnpj: z.string().optional(),
    nomeResponsavel: z.string().optional(),
    cpfResponsavel: z.string().optional(),
  })
  
  .refine((data) => {
    if (data.tipoPessoa === "Pessoa Jurídica") {
      return (
        !!data.razaoSocial &&
        !!data.cnpj &&
        !!data.nomeResponsavel &&
        !!data.cpfResponsavel
      );
    }
    return true;
  }, {
    message: "Campos obrigatórios para Pessoa Jurídica estão faltando",
    path: ["tipoPessoa"], // você pode apontar para um campo específico
  });