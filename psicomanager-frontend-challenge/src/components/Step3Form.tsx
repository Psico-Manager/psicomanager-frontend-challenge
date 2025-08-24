import {  useFormContext, type SubmitHandler } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  metodoPagamento: string; 
  cobrarMulta: boolean;
  valorMulta?: number;
  cobrarJuros: boolean;
};

interface Step3FormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function Step3Form({ onClose, onSuccess }: Step3FormProps) {
  const methods = useFormContext<FormValues>(); // usando o contexto do FormProvider
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const [showSuccess, setShowSuccess] = useState(false);
  const cobrarMulta = watch("cobrarMulta");

  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<FormValues> = (_data) => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onSuccess();
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Profissional</label>
        <input
          type="text"
          disabled
          defaultValue="Dr. Danilo" required
          className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Método de Pagamento</label>
        <div className="flex gap-4 mt-2">
          {["boleto", "pix", "cartao"].map((method) => (
            <label key={method} className="flex items-center gap-2">
              <input
                type="radio"
                value={method}
                {...register("metodoPagamento", { required: true })}
              />
              {method.charAt(0).toUpperCase() + method.slice(1)}
            </label>
          ))}
        </div>
        {errors.metodoPagamento && (
          <p className="text-red-500 text-sm mt-1">Selecione um método.</p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("cobrarMulta")} />
          Cobrar Multa
        </label>
        {cobrarMulta && (
          <input
            type="number"
            placeholder="Multa (%)"
            {...register("valorMulta", { required: true })}
            className="mt-2 block w-full border border-gray-300 rounded px-3 py-2"
          />
        )}
        {errors.valorMulta && cobrarMulta && (
          <p className="text-red-500 text-sm mt-1">Informe o valor da multa.</p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("cobrarJuros")} />
          Cobrar Juros
        </label>
      </div>

            <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Concluir
        </button>
      </div>

      {showSuccess && (
        <div className="mt-4 p-2 bg-green-500 text-white rounded text-center">
          Cobrança configurada com sucesso!
        </div>
      )}
    </div>
  );
}