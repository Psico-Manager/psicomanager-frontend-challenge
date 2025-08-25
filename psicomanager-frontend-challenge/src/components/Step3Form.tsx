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
    const dados = getValues();
    console.log("✅ Cobrança finalizada com sucesso!");
    console.log("📦 Dados completos:", dados);

    onSubmit(dados); // mantém o fluxo original
  }
};


  const metodoAtual = watch("metodoPagamento") ?? [];
  const opcoes = ["boleto", "pix", "cartao"];

  return (
<div className="space-y-6">
  {/* Profissional */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Profissional <span className="text-red-500">*</span>
    </label>
    <input
      value="Dr. Danilo"
      readOnly
      disabled
      required
      className="w-full border border-gray-300 p-3 rounded-md bg-gray-100 text-gray-800 font-medium shadow-sm"
    />
  </div>
            <h3>Forma de pagamento da cobrança:</h3>
    <div className="texto1"> Escolha quais as opções de pagamento que estão disponíveis para o seu cliente no link das mensagens de cobrança.</div><br></br>
    <h4>Disponibilizar meios de pagamento:<span style={{ color: 'red' }}>*</span></h4>
 {/* Método de Pagamento */}
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
  <div className="mt-6 p-4 bg-gray-50 border rounded">
  <h3 className="text-sm font-semibold text-gray-700 mb-2">Resumo da Cobrança</h3>
  <ul className="text-sm text-gray-600 space-y-1">
    <li>
      <strong>Cobrar Multa:</strong> {cobrarMulta ? "Sim" : "Não"}
    </li>
    {cobrarMulta && (
      <li>
        <strong>Valor da Multa:</strong> {valorMulta !== "" ? `${valorMulta}%` : "Não informado"}
      </li>
    )}
    <li>
      <strong>Cobrar Juros:</strong> {cobrarJuros ? "Sim" : "Não"}
    </li>
    {cobrarJuros && (
      <li>
        <strong>Valor dos Juros:</strong> {valorJuros !== "" ? `${valorJuros}%` : "Não informado"}
      </li>
    )}
  </ul>
</div>
</div>
      <div className="buttons">
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
  <div className="container">
    <p className="font-semibold mb-2">Cobrança configurada com sucesso!</p>
    <p><strong>Métodos de pagamento selecionados:</strong></p>
    <ul className="list-disc list-inside mt-1">
      {metodoAtual.length > 0 ? (
        metodoAtual.map((metodo) => (
          <li key={metodo}>{metodo.charAt(0).toUpperCase() + metodo.slice(1)}</li>
        ))
      ) : (
        <li className="text-red-600">Nenhum método selecionado</li>
      )}
    </ul>
  </div>
     )}
  </div>
  );
}


