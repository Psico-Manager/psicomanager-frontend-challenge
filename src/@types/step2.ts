export type Step2Fields = "profissional" | "marcacaoDinamica" | "mensagem";

export interface Step2 {
  profissional: string;
  marcacaoDinamica: string;
  mensagem: string;
}

export interface FormFieldProps {
  name: Step2Fields;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "select";
  options?: { label: string; value: string }[];
  colSpan?: number;
}
