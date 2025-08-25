import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { bankFormSchema } from '../schemas/bankFormSchema';
import { useEffect, useState } from 'react';

const steps = ['Dados Bancários', 'Configuração de Cobrança', 'Resumo'];

type BankFormData = z.infer<typeof bankFormSchema>;

const FinanceiroWizard = () => {
  const [step, setStep] = useState(0);

  const {
    formState: { isValid },
  } = useForm<BankFormData>({
    resolver: zodResolver(bankFormSchema),
    mode: 'onChange',
    defaultValues: {
      profissional: 'Dr. Danilo',
    },
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  // ⏩ Avança automaticamente quando todos os campos obrigatórios estiverem válidos
  useEffect(() => {
    if (step === 0 && isValid) {
      nextStep();
    }
  }, [isValid, step]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md w-full max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{steps[step]}</h2>

      {step === 1 && (
        <div>
          <p>Configure os métodos de cobrança...</p>
          <div className="flex justify-between mt-6">
            <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">
              Voltar
            </button>
            <button onClick={nextStep} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Próximo
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p>Revise e confirme suas informações.</p>
          <div className="flex justify-between mt-6">
            <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">
              Voltar
            </button>
            <button
              onClick={() => alert('Finalizado!')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Concluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceiroWizard;