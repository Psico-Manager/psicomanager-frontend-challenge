import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Container,
  Title,
  AlertBox,
  AlertTitle,
  AlertList,
  AlertItem,
  Form,
  Label,
  Input,
  Select,
  Row,
  Col,
} from './Client.styles';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormData } from '../context/FormDataContext';

// Schema Zod - Adaptável ao Tipo de Pessoa
const personalSchema = z.object({
  professional: z.string().min(1),
  bank: z.string().min(1, 'Banco é obrigatório'),
  accountType: z.string().min(1, 'Tipo de conta é obrigatório'),
  agency: z.string().min(1, 'Agência é obrigatória'),
  accountNumber: z.string().min(1, 'Conta com dígito é obrigatória'),
  personType: z.enum(['FISICA', 'JURIDICA']),
  cpf: z
    .string()
    .min(1, 'CPF é obrigatório')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido'),
  fullName: z.string().min(1, 'Nome completo é obrigatório'),
  cep: z
    .string()
    .min(1, 'CEP é obrigatório')
    .regex(/^\d{5}-\d{3}$/, 'CEP inválido'),
  state: z.string().min(1, 'Estado é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  number: z.string().min(1, 'Número é obrigatório'),
});

const juridicalSchema = z.object({
  professional: z.string().min(1),
  bank: z.string().min(1, 'Banco é obrigatório'),
  accountType: z.string().min(1, 'Tipo de conta é obrigatório'),
  agency: z.string().min(1, 'Agência é obrigatória'),
  accountNumber: z.string().min(1, 'Conta com dígito é obrigatória'),
  personType: z.literal('JURIDICA'),
  cnpj: z
    .string()
    .min(1, 'CNPJ é obrigatório')
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido'),
  responsibleName: z.string().min(1, 'Nome do responsável é obrigatório'),
  responsibleCpf: z
    .string()
    .min(1, 'CPF do responsável é obrigatório')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido'),
  cep: z
    .string()
    .min(1, 'CEP é obrigatório')
    .regex(/^\d{5}-\d{3}$/, 'CEP inválido'),
  state: z.string().min(1, 'Estado é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  number: z.string().min(1, 'Número é obrigatório'),
});

type FormValues = z.infer<typeof personalSchema> &
  z.infer<typeof juridicalSchema>;
type FieldName = keyof FormValues;

interface ClientFormProps {
  // Props do componente, se houver
}

interface ClientFormRef {
  validate: () => boolean;
}

const PsicoBankConfig = forwardRef<ClientFormRef, ClientFormProps>((_, ref) => {
  const { formData, updatePersonalData } = useFormData();
  const [personType, setPersonType] = useState<'FISICA' | 'JURIDICA'>('FISICA');

  // Funções de máscara
  const maskCPF = (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2');
  };

  const maskCNPJ = (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
  };

  const maskPhone = (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  };

  const maskCEP = (value: string): string => {
    return value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2');
  };

  // Validar schema com base no tipo
  const schema = personType === 'FISICA' ? personalSchema : juridicalSchema;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
    trigger,
    getValues,
  } = useForm<z.infer<typeof personalSchema> | z.infer<typeof juridicalSchema>>(
    {
      resolver: zodResolver(schema),
      defaultValues: formData.personalData,
    }
  );

  // Expõe o método de validação para o componente pai
  useImperativeHandle(ref, () => ({
    validate: async () => {
      const isValid = await trigger();
      return isValid;
    },
  }));

  // Observa mudança no tipo de pessoa
  const personTypeWatch = watch('personType');
  const allFields = watch();

  // Atualizar dados no contexto quando houver mudanças
  const debouncedUpdate = useCallback(
    debounce((data) => {
      updatePersonalData(data);
    }, 300),
    [updatePersonalData]
  );

  // Evitar atualização infinita ao inicializar
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      // Inicializar com dados do contexto
      setIsInitialized(true);
    } else {
      debouncedUpdate(allFields);
    }
  }, [allFields, debouncedUpdate, isInitialized]);

  useEffect(() => {
    if (personTypeWatch !== personType) {
      setPersonType(personTypeWatch as 'FISICA' | 'JURIDICA');
    }
  }, [personTypeWatch, personType]);

  // Atualiza valores ao mudar o tipo
  useEffect(() => {
    if (personType === 'JURIDICA') {
      setValue('cpf', '');
      clearErrors('cpf');
    } else {
      setValue('cnpj', '');
      clearErrors('cnpj');
      setValue('responsibleName', '');
      clearErrors('responsibleName');
      setValue('responsibleCpf', '');
      clearErrors('responsibleCpf');
    }
  }, [personType, setValue, clearErrors]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: FieldName, // Agora aceita qualquer campo
    maskFn: (value: string) => string
  ) => {
    const value = maskFn(e.target.value);
    setValue(field, value, { shouldValidate: true });
  };

  const onSubmit = (
    data: z.infer<typeof personalSchema> | z.infer<typeof juridicalSchema>
  ) => {
    console.log('Dados enviados:', data);
    alert('Formulário enviado com sucesso!');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onCancel = () => {
    alert('Cancelado.');
  };

  return (
    <Container>
      <Title>Preencha os itens a seguir para configurar o PsicoBank</Title>

      <AlertBox>
        <AlertTitle>
          Atenção!!! Verifique atentamente a cada dado preenchido no cadastro de
          sua conta.
        </AlertTitle>
        <AlertList>
          <AlertItem>
            Caso queira cadastrar uma conta de banco CNPJ, verifique se a sua
            conta corrente é CNPJ e preencha o CPF correto do responsável da
            conta.
          </AlertItem>
          <AlertItem>
            O preenchimento incorreto das informações pode trazer transtornos no
            momento da transferência do valor para essa conta corrente.
          </AlertItem>
          <AlertItem>
            Se possível preencha com calma para não ocorrer erros.
          </AlertItem>
        </AlertList>
      </AlertBox>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Profissional */}
        <Label>
          Profissional: <span style={{ color: 'red' }}>*</span>
        </Label>
        <Select {...register('professional')} disabled>
          <option value='João Silva'>João Silva</option>
        </Select>

        <Row>
          <Col>
            <Label>
              Banco: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Select {...register('bank')} error={!!errors.bank}>
              <option value=''>Selecione</option>
              <option value='Banco do Brasil'>Banco do Brasil</option>
              <option value='Itaú'>Itaú</option>
              <option value='Santander'>Santander</option>
            </Select>
          </Col>
          <Col>
            <Label>
              Tipo de conta: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Select {...register('accountType')} error={!!errors.accountType}>
              <option value=''>Selecione</option>
              <option value='Corrente'>Corrente</option>
              <option value='Poupança'>Poupança</option>
            </Select>
          </Col>
        </Row>

        <Row>
          <Col>
            <Label>
              Agência: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Input
              {...register('agency')}
              error={!!errors.agency}
              placeholder='Digite aqui'
            />
          </Col>
          <Col>
            <Label>
              Conta com dígito: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Input
              {...register('accountNumber')}
              error={!!errors.accountNumber}
              placeholder='Digite aqui'
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Label>
              Tipo de pessoa: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Select
              {...register('personType')}
              onChange={(e) => {
                const value = e.target.value as 'FISICA' | 'JURIDICA';
                setPersonType(value);
              }}
            >
              <option value='FISICA'>Pessoa Física</option>
              <option value='JURIDICA'>Pessoa Jurídica</option>
            </Select>
          </Col>
          {personType === 'FISICA' ? (
            <>
              <Col>
                <Label>
                  CPF: <span style={{ color: 'red' }}>*</span>
                </Label>
                <Input
                  {...register('cpf')}
                  error={!!errors['cpf' as keyof typeof errors]}
                  placeholder='___.___.___-__'
                  onChange={(e) => handleInputChange(e, 'cpf', maskCPF)}
                />
              </Col>
              <Col>
                <Label>
                  Telefone: <span style={{ color: 'red' }}>*</span>
                </Label>
                <Input
                  {...register('phone')}
                  error={!!errors.phone}
                  placeholder='(__) _____-____'
                  onChange={(e) => handleInputChange(e, 'phone', maskPhone)}
                />
              </Col>
            </>
          ) : (
            <>
              <Col>
                <Label>
                  CNPJ: <span style={{ color: 'red' }}>*</span>
                </Label>
                <Input
                  {...register('cnpj')}
                  error={!!errors['cnpj' as keyof typeof errors]}
                  placeholder='__.___.___/____-__'
                  onChange={(e) => handleInputChange(e, 'cnpj', maskCNPJ)}
                />
              </Col>
              <Col>
                <Label>
                  Nome do responsável: <span style={{ color: 'red' }}>*</span>
                </Label>
                <Input
                  {...register('responsibleName')}
                  error={!!errors['responsibleName' as keyof typeof errors]}
                  placeholder='Digite aqui'
                />
              </Col>
              <Col>
                <Label>
                  CPF do responsável: <span style={{ color: 'red' }}>*</span>
                </Label>
                <Input
                  {...register('responsibleCpf')}
                  error={!!errors['responsibleCpf' as keyof typeof errors]}
                  placeholder='___.___.___-__'
                  onChange={(e) =>
                    handleInputChange(e, 'responsibleCpf', maskCPF)
                  }
                />
              </Col>
            </>
          )}
        </Row>

        <Row>
          <Col>
            <Label>
              {personType === 'FISICA' ? 'Nome completo' : 'Razão Social'}:{' '}
              <span style={{ color: 'red' }}>*</span>
            </Label>
            <Input
              {...register(
                personType === 'FISICA' ? 'fullName' : 'responsibleName'
              )}
              error={
                !!(
                  (personType === 'FISICA' &&
                    errors['fullName' as keyof typeof errors]) ||
                  (personType === 'JURIDICA' &&
                    errors['responsibleName' as keyof typeof errors])
                )
              }
              placeholder='Digite aqui'
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Label>
              CEP: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Input
              {...register('cep')}
              error={!!errors.cep}
              placeholder='_____-___'
              onChange={(e) => handleInputChange(e, 'cep', maskCEP)}
            />
          </Col>
          <Col>
            <Label>
              Estado: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Select {...register('state')} error={!!errors.state}>
              <option value=''>Selecione</option>
              <option value='SP'>São Paulo</option>
              <option value='RJ'>Rio de Janeiro</option>
              <option value='MG'>Minas Gerais</option>
            </Select>
          </Col>
          <Col>
            <Label>
              Cidade: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Input
              {...register('city')}
              error={!!errors.city}
              placeholder='Digite aqui'
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Label>
              Endereço: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Input
              {...register('address')}
              error={!!errors.address}
              placeholder='Digite aqui'
            />
          </Col>
          <Col>
            <Label>
              Número: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Input
              {...register('number')}
              error={!!errors.number}
              placeholder='Digite aqui'
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
});

// Função de debounce para evitar atualizações frequentes
function debounce<F extends (...args: any[]) => any>(
  func: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export default PsicoBankConfig;
