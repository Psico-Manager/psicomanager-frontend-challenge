import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from 'react';

// Definir os tipos para os dados do formulário
interface PersonalData {
  professional: string;
  bank: string;
  accountType: string;
  agency: string;
  accountNumber: string;
  personType: 'FISICA' | 'JURIDICA';
  cpf?: string;
  phone?: string;
  fullName?: string;
  cep?: string;
  state?: string;
  city?: string;
  address?: string;
  number?: string;
  cnpj?: string;
  responsibleName?: string;
  responsibleCpf?: string;
}

interface EmailData {
  professional: string;
  content: string;
}

interface PaymentData {
  professional: string;
  paymentMethods: {
    pix: boolean;
    creditCard: boolean;
    boleto: boolean;
  };
  applyFine: boolean;
  fineValue: string;
  applyInterest: boolean;
}

interface FormData {
  personalData: PersonalData;
  emailData: EmailData;
  paymentData: PaymentData;
}

type FormAction =
  | { type: 'UPDATE_PERSONAL_DATA'; payload: Partial<PersonalData> }
  | { type: 'UPDATE_EMAIL_DATA'; payload: Partial<EmailData> }
  | { type: 'UPDATE_PAYMENT_DATA'; payload: Partial<PaymentData> };

interface FormDataContextType {
  formData: FormData;
  updatePersonalData: (data: Partial<PersonalData>) => void;
  updateEmailData: (data: Partial<EmailData>) => void;
  updatePaymentData: (data: Partial<PaymentData>) => void;
}

const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined
);

const formReducer = (state: FormData, action: FormAction): FormData => {
  switch (action.type) {
    case 'UPDATE_PERSONAL_DATA':
      return {
        ...state,
        personalData: { ...state.personalData, ...action.payload },
      };
    case 'UPDATE_EMAIL_DATA':
      return {
        ...state,
        emailData: { ...state.emailData, ...action.payload },
      };
    case 'UPDATE_PAYMENT_DATA':
      return {
        ...state,
        paymentData: { ...state.paymentData, ...action.payload },
      };
    default:
      return state;
  }
};

export const FormDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, dispatch] = useReducer(formReducer, {
    personalData: {
      professional: 'João Silva',
      bank: '',
      accountType: '',
      agency: '',
      accountNumber: '',
      personType: 'FISICA',
    },
    emailData: {
      professional: 'João Silva',
      content: `Olá {{NOME_CLIENTE}}. Estou te mandando um link no qual você consegue ver a melhor forma de pagamento das nossas sessões. Obrigado!`,
    },
    paymentData: {
      professional: 'João Silva',
      paymentMethods: {
        pix: true,
        creditCard: false,
        boleto: false,
      },
      applyFine: false,
      fineValue: '0.0',
      applyInterest: false,
    },
  });

  const updatePersonalData = (data: Partial<PersonalData>) => {
    dispatch({ type: 'UPDATE_PERSONAL_DATA', payload: data });
  };

  const updateEmailData = (data: Partial<EmailData>) => {
    dispatch({ type: 'UPDATE_EMAIL_DATA', payload: data });
  };

  const updatePaymentData = (data: Partial<PaymentData>) => {
    dispatch({ type: 'UPDATE_PAYMENT_DATA', payload: data });
  };

  return (
    <FormDataContext.Provider
      value={{
        formData,
        updatePersonalData,
        updateEmailData,
        updatePaymentData,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};

const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useFormData };
