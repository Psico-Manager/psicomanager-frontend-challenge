import { useFormContext, type SubmitHandler } from "react-hook-form";
import { useState } from "react";

type Step3FormValues = {
  metodoPagamento: string[];
  cobrarMulta: boolean;
  valorMulta?: number;
  cobrarJuros: boolean;
  valorJuros?: number;
};

interface Step3FormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function Step3Form({ onClose, onSuccess }: Step3FormProps) {
const {
  watch,
  getValues,
  setValue,
  trigger,
  formState: { errors },
} = useFormContext<Step3FormValues>();

const cobrarMulta = watch("cobrarMulta");
const cobrarJuros = watch("cobrarJuros");
const valorMulta = watch("valorMulta") ?? "";
const valorJuros = watch("valorJuros") ?? "";

  const [showSuccess, setShowSuccess] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<Step3FormValues> = (_data) => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onSuccess();
    }, 3000);
  };

  const handleConcluir = async () => {
    const campos: (keyof Step3FormValues)[] = [
      "metodoPagamento",
      "cobrarMulta",
      "valorMulta",
      "cobrarJuros",
      "valorJuros",
    ];

    const isValid = await trigger(campos);

    if (isValid) {
      onSubmit(getValues());
    }
  };

  const metodoAtual = watch("metodoPagamento") ?? [];
  const opcoes = ["boleto", "pix", "cartao"];

  return (
    <div className="space-y-6">
      {/* ... Profissional ... */}
<div>
  <label className="block text-sm font-medium text-gray-700">Método de Pagamento</label>
  <div className="flex gap-4 mt-2">
    {opcoes.map((opcao) => (
      <label key={opcao} className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          value={opcao}
          checked={metodoAtual.includes(opcao)}
          onChange={() => {
            const novo = metodoAtual.includes(opcao)
              ? metodoAtual.filter((v) => v !== opcao)
              : [...metodoAtual, opcao];
            setValue("metodoPagamento", novo);
          }}
        />
        {opcao.charAt(0).toUpperCase() + opcao.slice(1)}
      </label>
    ))}
  </div>
  {errors.metodoPagamento && (
    <p className="text-red-500 text-sm mt-1">{errors.metodoPagamento.message}</p>
  )}
</div>
<div>
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={cobrarMulta ?? false}
      onChange={() => setValue("cobrarMulta", !cobrarMulta)}
    />
    Cobrar Multa
  </label>

  {cobrarMulta && (
  <input
    type="number"
    placeholder="Multa (%)"
    value={valorMulta}
    onChange={(e) => {
      const valor = e.target.value;
      setValue("valorMulta", valor === "" ? undefined : Number(valor));
    }}
    className="mt-2 block w-full border border-gray-300 rounded px-3 py-2"
  />
)}

  {errors.valorMulta && cobrarMulta && (
    <p className="text-red-500 text-sm mt-1">{errors.valorMulta.message}</p>
  )}
</div>

<div>
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={cobrarJuros ?? false}
      onChange={() => setValue("cobrarJuros", !cobrarJuros)}
    />
    Cobrar Juros
  </label>

  {cobrarJuros && (
  <input
    type="number"
    placeholder="Juros (%)"
    value={valorJuros}
    onChange={(e) => {
      const valor = e.target.value;
      setValue("valorJuros", valor === "" ? undefined : Number(valor));
    }}
    className="mt-2 block w-full border border-gray-300 rounded px-3 py-2"
  />
)}

  {errors.valorJuros && cobrarJuros && (
    <p className="text-red-500 text-sm mt-1">{errors.valorJuros.message}</p>
  )}
</div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={handleConcluir}
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


