import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { useFormData } from '../context/FormDataContext';

// Estilos com Styled Components
const Container = styled.div`
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  margin-top: 0;
  color: #333;
  font-size: 1.2em;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 0.9em;
  color: #555;
  font-weight: 500;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9em;
  background-color: white;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

const InstructionBox = styled.div`
  background-color: #e8f4fd;
  border: 1px solid #b8daff;
  border-radius: 4px;
  padding: 12px 16px;
  margin: 16px 0;
  color: #0066cc;
  font-size: 0.9em;
  line-height: 1.5;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s ease;
  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const QuillContainer = styled.div`
  .ql-editor {
    min-height: 120px;
    font-size: 14px;
    line-height: 1.5;
    padding: 12px;
  }

  .ql-toolbar {
    border-bottom: 1px solid #ddd;
    padding: 0;
    background-color: white;
    border-radius: 4px 4px 0 0;
  }

  .ql-container {
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const EmailMessageEditor = () => {
  const { formData, updateEmailData } = useFormData();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [quillEditor, setQuillEditor] = useState<any>(null);
  const [professional, setProfessional] = useState('João Silva');
  const [dynamicTag, setDynamicTag] = useState('');
  const [content, setContent] = useState(
    `Olá {{NOME_CLIENTE}}. Estou te mandando um link no qual você consegue ver a melhor forma de pagamento das nossas sessões. Obrigado!`
  );

  const dynamicTags = [
    { value: '{{NOME_CLIENTE}}', label: 'Nome do Cliente' },
    { value: '{{VALOR_COBRANCA}}', label: 'Valor da Cobrança' },
    { value: '{{DATA_VENCIMENTO}}', label: 'Data de Vencimento' },
    { value: '{{LINK_PAGAMENTO}}', label: 'Link de Pagamento' },
  ];

  // Atualizar dados do contexto quando houver mudanças
  const debouncedUpdate = useCallback(
    debounce((data) => {
      updateEmailData(data);
    }, 300),
    [updateEmailData]
  );

  // Evitar atualização infinita ao inicializar
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      setProfessional(formData.emailData.professional);
      setContent(formData.emailData.content);
      setIsInitialized(true);
    } else {
      debouncedUpdate({ professional, content });
    }
  }, [professional, content, debouncedUpdate, formData.emailData, isInitialized]);

  const handleInsertTag = () => {
    if (dynamicTag && quillEditor) {
      const selection = quillEditor.getSelection();
      const cursorPosition = selection
        ? selection.index
        : quillEditor.getLength();

      quillEditor.insertText(cursorPosition, dynamicTag);
      quillEditor.setSelection(cursorPosition + dynamicTag.length);
    }
  };

  const modules = {
    toolbar: [
      ['undo', 'redo'],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link'],
    ],
  };

  const formats = [
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'align',
    'link',
  ];

  return (
    <Container>
      <Title>Preencha os itens a seguir para configurar o PsicoBank</Title>

      {/* Profissional */}
      <FormGroup>
        <Label>
          Profissional: <span style={{ color: 'red' }}>*</span>
        </Label>
        <Select
          value={professional}
          disabled
          onChange={(e) => setProfessional(e.target.value)}
        >
          <option value='João Silva'>João Silva</option>
          <option value='Maria Oliveira'>Maria Oliveira</option>
          <option value='Carlos Mendes'>Carlos Mendes</option>
        </Select>
      </FormGroup>

      {/* Instrução */}
      <FormGroup>
        <Label>Enviar cobrança por e-mail:</Label>
        <InstructionBox>
          Esse é a mensagem por e-mail que seus clientes irão receber. Clique no
          campo de texto para editar o conteúdo da mensagem e depois siga para o
          próximo passo.
        </InstructionBox>
      </FormGroup>

      {/* Marcação Dinâmica */}
      <FormGroup>
        <Label>Marcação dinâmica:</Label>
        <FlexContainer>
          <Select
            value={dynamicTag}
            onChange={(e) => setDynamicTag(e.target.value)}
          >
            <option value=''>--Selecione--</option>
            {dynamicTags.map((tag) => (
              <option key={tag.value} value={tag.value}>
                {tag.label}
              </option>
            ))}
          </Select>
          <Button onClick={handleInsertTag} disabled={!dynamicTag}>
            + Inserir
          </Button>
        </FlexContainer>
      </FormGroup>

      {/* Conteúdo da Mensagem */}
      <FormGroup>
        <Label>Conteúdo da mensagem:</Label>
        <QuillContainer>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder='Digite sua mensagem aqui...'
            theme='snow'
            ref={(editor) => setQuillEditor(editor)}
          />
        </QuillContainer>
      </FormGroup>
    </Container>
  );
};

// Função de debounce para evitar atualizações frequentes
function debounce<F extends (...args: any[]) => any>(func: F, delay: number): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export default EmailMessageEditor;
