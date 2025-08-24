import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import dynamicTags from '../utils/dynamicTags'; // Supondo que você tenha uma lista de marcações

const StepMensagemCobranca = ({ onNext, onCancel }: { onNext: () => void; onCancel: () => void }) => {
  const { register, setValue, getValues, formState: { errors } } = useFormContext();
  const [selectedTag, setSelectedTag] = useState('');

  const insertTag = () => {
    const currentContent = getValues('mensagem') || '';
    const newContent = `${currentContent} {{${selectedTag}}}`;
    setValue('mensagem', newContent);
  };


  return (
    <div className="p-6 bg-white shadow-md rounded-md w-full max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Canais de Envio e Mensagens de Cobrança</h2>

      <div className="space-y-4">
        {/* Profissional */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Profissional</label>
          <input
            {...register('profissional')}
            disabled
            className="w-full border p-2 rounded bg-gray-100 text-gray-600"
          />
        </div>

        {/* Marcação Dinâmica */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Marcação Dinâmica</label>
          <div className="flex gap-2">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Selecione</option>
              {dynamicTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={insertTag}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Inserir
            </button>
          </div>
        </div>

        {/* Editor de Texto */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Conteúdo da Mensagem</label>
          <textarea
            {...register('mensagem', { required: 'Conteúdo da mensagem é obrigatório' })}
            rows={8}
            className="w-full border p-2 rounded"
          />
         {typeof errors.mensagem?.message === 'string' && (
         <p className="text-red-500 text-sm mt-1">{errors.mensagem.message}</p>
         )}
        </div>
      </div>

      {/* Botões de Navegação */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={() => {
            const mensagem = getValues('mensagem');
            if (!mensagem) return setValue('mensagem', '', { shouldValidate: true });
            onNext();
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default StepMensagemCobranca;