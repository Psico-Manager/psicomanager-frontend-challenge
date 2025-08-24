import { Controller, useFormContext } from 'react-hook-form';
import { useState, useRef } from 'react';
import dynamicTags from '../utils/dynamicTags';
import Quill from 'quill';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';


// ✅ Registre os formatos de lista manualmente
const List = Quill.import('formats/list');
Quill.register(List, true);

export const StepMensagemCobranca = ({
  onNext,
  onCancel,
}: {
  onNext: () => void;
  onCancel: () => void;
}) => {
const methods = useFormContext();

const {
  control,
  trigger,
  setValue,
  getValues,
  formState: { errors },
} = methods;

  const [selectedTag, setSelectedTag] = useState('');
  const quillRef = useRef<ReactQuill | null>(null);

  const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic'],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
  history: {
    delay: 1000,
    maxStack: 100,
    userOnly: true,
  },
};

const formats = ['header', 'bold', 'italic', 'align', 'list', 'link'];

const insertTag = (tag: string) => {
  const mensagemAtual = getValues("mensagem");
  setValue("mensagem", `${mensagemAtual} ${tag}`);
};

const handleNext = async () => {
  const tipoPessoa = getValues("tipoPessoa");
  const mensagem = getValues("mensagem");

  const isMensagemValida = mensagem && mensagem.replace(/<(.|\n)*?>/g, '').trim().length > 0;

  const camposBase = [
    "mensagem", "profissional", "banco", "tipoConta", "agencia", "contaComDigito",
    "tipoPessoa", "telefone", "cep", "estado", "cidade", "endereco", "numero"
  ];

  const camposPessoaFisica = ["cpf"];
  const camposPessoaJuridica = ["razaoSocial", "cnpj", "nomeResponsavel", "cpfResponsavel"];

  const campos = tipoPessoa === "Pessoa Física"
    ? [...camposBase, ...camposPessoaFisica]
    : [...camposBase, ...camposPessoaJuridica];

  const isValid = await trigger(campos);

  console.log("Campos validados:", campos);
  console.log("Trigger retornou:", isValid);
  console.log("Mensagem válida:", isMensagemValida);
  console.log("Erros:", errors);

  if (isValid && isMensagemValida) {
  const data = getValues();
  console.log("Dados válidos:", data);
  onNext();
}

}
  const handleUndo = () => {
    const editor = quillRef.current?.getEditor();
    const history = editor?.getModule('history') as { undo: () => void } | undefined;
    history?.undo();
  };

  const handleRedo = () => {
    const editor = quillRef.current?.getEditor();
    const history = editor?.getModule('history') as { redo: () => void } | undefined;
    history?.redo();
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl w-full max-w-2xl mx-auto mt-12 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight">
        Canais de Envio e Mensagens de Cobrança
      </h2>

      <div className="space-y-6">
        {/* Profissional */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profissional</label>
          <input
            value=" Dr. Danilo" required
            readOnly
            disabled
            className="w-full border border-gray-300 p-3 rounded-md bg-gray-100 text-gray-800 font-medium shadow-sm"
          />
        </div>

        {/* Marcação Dinâmica */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marcação Dinâmica</label>
          <div className="flex gap-3">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="border border-gray-300 p-3 rounded-md w-full text-gray-700 shadow-sm"
            >
              <option value="">Selecione</option>
              {dynamicTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <button
               type="button"
               onClick={() => insertTag(selectedTag)}
               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md"
            >
             Inserir
            </button>
          </div>
        </div>
        <div className="relative">
  {/* Botões flutuantes no canto superior direito */}
  <div className="absolute top-2 right-2 flex gap-2 z-10">
    <button
      type="button"
      onClick={handleUndo}
      className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
    >
      ⟲
    </button>
    <button
      type="button"
      onClick={handleRedo}
      className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
    >
      ⟳
    </button>
  </div>

        {/* Editor de Texto */}
<Controller
  name="mensagem"
  control={control}
  rules={{
  validate: (value) => {
    const plainText = value.replace(/<(.|\n)*?>/g, '').trim();
    return plainText.length > 0 || "A mensagem é obrigatória.";
  }
}}
  render={({ field }) => (
    <ReactQuill
      ref={quillRef}
      value={field.value}
      onChange={field.onChange}
      modules={modules}
      formats={formats}
      className="bg-white border border-gray-300 rounded-md shadow-sm"
    />
  )}
/>
          {errors.mensagem?.message && typeof errors.mensagem.message === 'string' && (
            <p className="text-red-500 text-sm mt-2">{errors.mensagem.message}</p>
          )}
        </div>
      </div>

      {/* Botões de Navegação */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors shadow-sm"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-md"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default StepMensagemCobranca;