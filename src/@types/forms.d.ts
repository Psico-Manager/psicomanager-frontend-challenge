import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch, FieldValues } from 'react-hook-form';

/**
 * Props base para componentes de formulário
 */
export interface BaseFormProps<T extends FieldValues = FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  watch: UseFormWatch<T>;
}

/**
 * Props para campos de formulário
 */
export interface FormFieldProps<T extends FieldValues = FieldValues> extends BaseFormProps<T> {
  name: keyof T;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'select';
  disabled?: boolean;
  colSpan?: number;
  options?: Array<{ label: string; value: string }>;
  mask?: (value: string) => string;
}

/**
 * Props para componentes que necessitam de callbacks de progresso
 */
export interface ProgressCallbackProps {
  onProgress?: (progress: number) => void;
}

/**
 * Props para modais
 */
export interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

/**
 * Props para steps de wizard
 */
export interface WizardStepProps<T = any> extends ProgressCallbackProps {
  defaultValues?: T;
  onCancel: () => void;
  onSubmit: (data: T) => void;
}

/**
 * Estados possíveis de um step
 */
export type StepState = 'past' | 'current' | 'future';

/**
 * Variantes de componentes
 */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type AlertVariant = 'yellow' | 'blue' | 'success' | 'error';

/**
 * Props para componentes com variantes
 */
export interface VariantProps<T extends string> {
  variant?: T;
}

/**
 * Props para componentes que podem ser desabilitados
 */
export interface DisableableProps {
  disabled?: boolean;
}

/**
 * Props para componentes com loading state
 */
export interface LoadingProps {
  loading?: boolean;
}
