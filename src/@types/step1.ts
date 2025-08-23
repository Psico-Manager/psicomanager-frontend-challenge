// types/step1.ts
export type Step1PF = {
  tipoPessoa: "PF";
  profissional: string;
  banco: string;
  tipoConta: string;
  agencia: string;
  conta: string;
  cpf: string;
  telefone: string;
  nomeCompleto?: string;
  cep: string;
  estado: string;
  cidade: string;
  endereco: string;
  numero: string;
};

export type Step1PJ = {
  tipoPessoa: "PJ";
  profissional: string;
  banco: string;
  tipoConta: string;
  agencia: string;
  conta: string;
  cnpj: string;
  razaoSocial: string;
  responsavelNome: string;
  responsavelCpf: string;
  telefone: string;
  nomeCompleto?: string;
  cep: string;
  estado: string;
  cidade: string;
  endereco: string;
  numero: string;
};

export type Step1 = Step1PF | Step1PJ;
