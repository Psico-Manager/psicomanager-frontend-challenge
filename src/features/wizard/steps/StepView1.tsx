import React, { useEffect, useCallback, useMemo, memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styled from "styled-components";

import { Step1, step1Schema } from "../validation/schemas";

import { Button } from "../../../components/ui/Button";
import { FormField } from "../../../components/ui/FormField";
import { AlertBox } from "../../../components/ui/Alertbox";
import { BoldSpan } from "../../../components/ui/Span";

import { useFormProgress } from "../../../hooks";

import { maskCEP, maskCNPJ, maskCPF, maskPhone } from "../../../utils/masks";

import { WizardStepProps } from "../../../@types/forms";

/**
 * Grid principal do formulário - responsivo
 * Em telas pequenas (<900px), todos os campos ficam em uma coluna
 */
const Grid = styled.div<{ columns?: number; alignStart?: boolean }>`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(${(props) => props.columns ?? 2}, 1fr);
  justify-items: ${(props) => (props.alignStart ? "start" : "stretch")};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

/**
 * Item do grid - controla quantas colunas o campo ocupa
 * Em telas pequenas, sempre ocupa 1 coluna
 */
const GridItem = styled.div<{ colSpan?: number }>`
  grid-column: span ${(props) => props.colSpan ?? 1};

  @media (max-width: 900px) {
    grid-column: span 1;
    width: 100%;
  }
`;

/**
 * Row com 2 colunas iguais
 * Em telas pequenas, vira uma coluna
 */
const Row2 = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

/**
 * Row com proporção 2:1 (campo maior + campo menor)
 * Em telas pequenas, vira uma coluna
 */
const Row21 = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 2fr 1fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// ===== TIPOS E INTERFACES =====

/**
 * Props do componente Step1View
 * Herda de WizardStepProps com tipo Step1
 */
interface Step1ViewProps extends WizardStepProps<Step1> {
  // Props específicas do Step1View podem ser adicionadas aqui
}

/**
 * Opção de campo select
 */
interface FieldOption {
  label: string;
  value: string;
}

/**
 * Configuração de campo do formulário
 */
interface FieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'select';
  options?: FieldOption[];
  mask?: (value: string) => string;
  colSpan?: number;
  disabled?: boolean;
}

// ===== CONSTANTES E OPÇÕES =====

/**
 * Estados brasileiros para o campo de seleção
 */
const BRAZILIAN_STATES: FieldOption[] = [
  { label: "Acre", value: "AC" },
  { label: "Alagoas", value: "AL" },
  { label: "Amapá", value: "AP" },
  { label: "Amazonas", value: "AM" },
  { label: "Bahia", value: "BA" },
  { label: "Ceará", value: "CE" },
  { label: "Distrito Federal", value: "DF" },
  { label: "Espírito Santo", value: "ES" },
  { label: "Goiás", value: "GO" },
  { label: "Maranhão", value: "MA" },
  { label: "Mato Grosso", value: "MT" },
  { label: "Mato Grosso do Sul", value: "MS" },
  { label: "Minas Gerais", value: "MG" },
  { label: "Pará", value: "PA" },
  { label: "Paraíba", value: "PB" },
  { label: "Paraná", value: "PR" },
  { label: "Pernambuco", value: "PE" },
  { label: "Piauí", value: "PI" },
  { label: "Rio de Janeiro", value: "RJ" },
  { label: "Rio Grande do Norte", value: "RN" },
  { label: "Rio Grande do Sul", value: "RS" },
  { label: "Rondônia", value: "RO" },
  { label: "Roraima", value: "RR" },
  { label: "Santa Catarina", value: "SC" },
  { label: "São Paulo", value: "SP" },
  { label: "Sergipe", value: "SE" },
  { label: "Tocantins", value: "TO" }
];

/**
 * Opções de bancos disponíveis
 */
const BANK_OPTIONS: FieldOption[] = [
  { label: "Banco do Brasil", value: "Banco do Brasil" },
  { label: "Bradesco", value: "Bradesco" },
  { label: "Caixa Econômica", value: "Caixa Econômica" },
  { label: "Itaú", value: "Itaú" },
  { label: "Inter", value: "Inter" },
  { label: "Santander", value: "Santander" },
];

/**
 * Tipos de conta bancária
 */
const ACCOUNT_TYPE_OPTIONS: FieldOption[] = [
  { label: "Conta Corrente", value: "Corrente" },
  { label: "Conta Poupança", value: "Poupança" },
];

/**
 * Tipos de pessoa (Física ou Jurídica)
 */
const PERSON_TYPE_OPTIONS: FieldOption[] = [
  { label: "Pessoa Física", value: "PF" },
  { label: "Pessoa Jurídica", value: "PJ" },
];

// ===== COMPONENTE PRINCIPAL =====

/**
 * Step1View - Primeiro passo do wizard de configuração do PsicoBank
 * Coleta informações bancárias, pessoais e de endereço
 */
export const Step1View = memo(function Step1View({
  defaultValues,
  onCancel,
  onSubmit,
  onProgress,
}: Step1ViewProps) {
  // ===== CONFIGURAÇÃO DO FORMULÁRIO =====
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<Step1>({
    resolver: zodResolver(step1Schema),
    mode: "onBlur",
    defaultValues: {
      profissional: "Murillo Nunes",
      ...defaultValues,
    },
  });

  // ===== ESTADO E OBSERVADORES =====
  const personType = watch("tipoPessoa");

  // Campos observados para cálculo do progresso
  const watchedValues = watch([
    "profissional", "banco", "tipoConta", "agencia", "conta",
    "tipoPessoa", "cpf", "cnpj", "telefone", "nomeCompleto",
    "responsavelNome", "responsavelCpf", "cep", "estado",
    "cidade", "endereco", "numero",
  ]);

  // Hook para controle do progresso do formulário
  useFormProgress(watchedValues, onProgress);

  // ===== EFEITOS =====
  
  /**
   * Limpa campos específicos quando o tipo de pessoa muda
   * PF: limpa campos de CNPJ e responsável
   * PJ: limpa campos de CPF e nome completo
   */
  useEffect(() => {
    if (personType === "PF") {
      setValue("cnpj", "");
      setValue("responsavelNome", "");
      setValue("responsavelCpf", "");
    } else if (personType === "PJ") {
      setValue("cpf", "");
      setValue("nomeCompleto", "");
    }
  }, [personType, setValue]);

  // ===== CONFIGURAÇÃO DOS CAMPOS =====
  
  /**
   * Configurações dos campos do formulário
   * Centraliza labels, placeholders, tipos e máscaras
   */
  const fieldConfigs = useMemo((): Record<string, FieldConfig> => ({
    profissional: {
      name: "profissional",
      label: "Profissional",
      disabled: true,
    },
    banco: {
      name: "banco",
      label: "Banco *",
      type: "select",
      options: BANK_OPTIONS,
    },
    tipoConta: {
      name: "tipoConta",
      label: "Tipo de conta *",
      type: "select",
      options: ACCOUNT_TYPE_OPTIONS,
    },
    agencia: {
      name: "agencia",
      label: "Agência *",
      placeholder: "Digite a agência",
    },
    conta: {
      name: "conta",
      label: "Conta com dígito *",
      placeholder: "Digite a conta com dígito",
    },
    tipoPessoa: {
      name: "tipoPessoa",
      label: "Tipo de pessoa *",
      type: "select",
      options: PERSON_TYPE_OPTIONS,
    },
    cpf: {
      name: "cpf",
      label: "CPF *",
      placeholder: "000.000.000-00",
      mask: maskCPF,
    },
    telefone: {
      name: "telefone",
      label: "Telefone *",
      placeholder: "(00) 00000-0000",
      mask: maskPhone,
    },
    nomeCompleto: {
      name: "nomeCompleto",
      label: "Nome completo *",
      placeholder: "Digite o nome completo",
    },
    cep: {
      name: "cep",
      label: "CEP *",
      placeholder: "00000-000",
      mask: maskCEP,
    },
    estado: {
      name: "estado",
      label: "Estado *",
      type: "select",
      options: BRAZILIAN_STATES,
    },
    cidade: {
      name: "cidade",
      label: "Cidade *",
      placeholder: "Digite a cidade",
    },
    endereco: {
      name: "endereco",
      label: "Endereço *",
      placeholder: "Digite o endereço",
    },
    numero: {
      name: "numero",
      label: "Número *",
      placeholder: "Digite o número",
    },
  }), []);

  // ===== FUNÇÕES DE MANIPULAÇÃO =====
  
  /**
   * Manipula o submit do formulário
   * Valida todos os campos antes de enviar
   */
  const handleFormSubmit = useCallback(async (data: Step1) => {
    const isValid = await trigger();
    if (isValid) {
      onSubmit(data);
    }
  }, [trigger, onSubmit]);

  /**
   * Renderiza um campo do formulário baseado na configuração
   */
  const renderFormField = useCallback((fieldConfig: FieldConfig) => (
    <FormField
      key={fieldConfig.name}
      name={fieldConfig.name as keyof Step1}
      label={fieldConfig.label}
      placeholder={fieldConfig.placeholder}
      type={fieldConfig.type}
      options={fieldConfig.options}
      mask={fieldConfig.mask}
      colSpan={fieldConfig.colSpan}
      disabled={fieldConfig.disabled}
      register={register}
      errors={errors}
      setValue={setValue}
      trigger={trigger}
      watch={watch}
    />
  ), [register, errors, setValue, trigger, watch]);

  // ===== RENDERIZAÇÃO =====
  
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Título da seção */}
      <BoldSpan>
        Preencha os itens a seguir para configurar o PsicoBank
      </BoldSpan>

      {/* Alerta com instruções importantes */}
      <AlertBox variant="yellow">
        <strong>
          ⚠️ Atenção! Verifique atentamente cada dado preenchido no cadastro de sua conta.
        </strong>
        <ul>
          <li>
            Se sua conta for CNPJ, verifique se a conta corrente é realmente CNPJ e preencha o CPF correto do responsável.
          </li>
          <li>
            Informações incorretas podem causar problemas na transferência dos valores para sua conta.
          </li>
          <li>
            Preencha todos os campos com atenção para evitar erros.
          </li>
        </ul>
      </AlertBox>

      {/* Formulário principal */}
      <Grid>
        {/* Seção: Informações do Profissional */}
        <GridItem colSpan={3}>
          {renderFormField(fieldConfigs.profissional)}
        </GridItem>
        
        {/* Seção: Dados Bancários */}
        <GridItem colSpan={3}>
          <Row2>
            {renderFormField(fieldConfigs.banco)}
            {renderFormField(fieldConfigs.tipoConta)}
          </Row2>
        </GridItem>
        
        <GridItem colSpan={3}>
          <Row2>
            {renderFormField(fieldConfigs.agencia)}
            {renderFormField(fieldConfigs.conta)}
          </Row2>
        </GridItem>
        
        {/* Seção: Dados Pessoais */}
        <GridItem>
          {renderFormField(fieldConfigs.tipoPessoa)}
        </GridItem>

        <GridItem>
          {personType === "PF" ? (
            renderFormField(fieldConfigs.cpf)
          ) : (
            <FormField
              name={"cnpj" as keyof Step1}
              label="CNPJ *"
              placeholder="00.000.000/0000-00"
              mask={maskCNPJ}
              register={register}
              errors={errors}
              setValue={setValue}
              trigger={trigger}
              watch={watch}
            />
          )}
        </GridItem>

        <GridItem>
          {renderFormField(fieldConfigs.telefone)}
        </GridItem>

        {/* Nome/Responsável baseado no tipo de pessoa */}
        <GridItem colSpan={3}>
          {personType === "PF" ? (
            renderFormField(fieldConfigs.nomeCompleto)
          ) : (
            <Row2>
              <FormField
                name={"responsavelNome" as keyof Step1}
                label="Nome do responsável *"
                placeholder="Digite o nome do responsável"
                register={register}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                watch={watch}
              />
              <FormField
                name={"responsavelCpf" as keyof Step1}
                label="CPF do responsável *"
                placeholder="000.000.000-00"
                mask={maskCPF}
                register={register}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                watch={watch}
              />
            </Row2>
          )}
        </GridItem>

        {/* Seção: Endereço */}
        <GridItem>
          {renderFormField(fieldConfigs.cep)}
        </GridItem>
        
        <GridItem>
          {renderFormField(fieldConfigs.estado)}
        </GridItem>
        
        <GridItem>
          {renderFormField(fieldConfigs.cidade)}
        </GridItem>

        <GridItem colSpan={3}>
          <Row21>
            {renderFormField(fieldConfigs.endereco)}
            {renderFormField(fieldConfigs.numero)}
          </Row21>
        </GridItem>
      </Grid>

      {/* Botões de ação */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        <Button 
          variant="secondary" 
          type="button" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Próximo
        </Button>
      </div>
    </form>
  );
});
