// @types/step1.ts
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
export type Step1Fields = keyof Step1PF | keyof Step1PJ;

import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

// src/@types/form.ts (ou onde achar melhor)
export interface FormFieldProps<T extends string = string> {
  name: T;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "select";
  options?: { label: string; value: string }[];
  colSpan?: number;
  mask?: (value: string) => string;
  register?: any;
  errors?: Record<string, any>;
  setValue?: any;
  trigger?: any;
}
