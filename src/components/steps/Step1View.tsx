import React, { useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step1, step1Schema } from "../../schema";

import { FieldWrap, Label, InputBase, Helper } from "../primitives/Field";
import { Button } from "../primitives/Button";
import styled from "styled-components";
import { maskCEP, maskCPF, maskCNPJ, maskPhone } from "../../utils/masks";
import { Step1PF, Step1PJ } from "src/@types/step1";

const Grid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const bancos = [
  "Banco do Brasil",
  "Bradesco",
  "Caixa",
  "Itaú",
  "Nubank",
  "Santander",
];
const tipos = ["Corrente", "Poupança"];
const estados = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export function Step1View({
  defaultValues,
  onCancel,
  onSubmit,
}: {
  defaultValues?: Step1;
  onCancel: () => void;
  onSubmit: (d: Step1) => void;
}) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1>({
    resolver: zodResolver(step1Schema),
    mode: "onChange",
    defaultValues: defaultValues ?? {
      profissional: "João Silva",
      banco: "",
      tipoConta: "",
      agencia: "",
      conta: "",
      tipoPessoa: "PF",
      cpf: "",
      telefone: "",
      nomeCompleto: "",
      cep: "",
      estado: "",
      cidade: "",
      endereco: "",
      numero: "",
    },
  });

  const tipoPessoa = watch("tipoPessoa");
  const errorsPF = errors as FieldErrors<Step1PF>;
  const errorsPJ = errors as FieldErrors<Step1PJ>;

  useEffect(() => {
    if (tipoPessoa === "PF") {
      setValue("cpf", "");
      setValue("cnpj" as any, undefined);
      setValue("razaoSocial" as any, "");
      setValue("responsavelNome" as any, "");
      setValue("responsavelCpf" as any, "");
    } else {
      setValue("cpf", "");
    }
  }, [tipoPessoa, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        {/* Profissional */}
        <FieldWrap>
          <Label>Profissional</Label>
          <InputBase
            {...register("profissional")}
            disabled
            value="João Silva"
          />
        </FieldWrap>

        {/* Banco */}
        <FieldWrap>
          <Label>Banco *</Label>
          <select
            {...register("banco")}
            defaultValue=""
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid #E5E7EB",
            }}
          >
            <option value="">Selecione</option>
            {bancos.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          {errors.banco && <Helper>{errors.banco.message}</Helper>}
        </FieldWrap>

        {/* Tipo de conta */}
        <FieldWrap>
          <Label>Tipo de conta *</Label>
          <select
            {...register("tipoConta")}
            defaultValue=""
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid #E5E7EB",
            }}
          >
            <option value="">Selecione</option>
            {tipos.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.tipoConta && <Helper>{errors.tipoConta.message}</Helper>}
        </FieldWrap>

        {/* Agência */}
        <FieldWrap>
          <Label>Agência *</Label>
          <InputBase
            {...register("agencia")}
            placeholder="Digite aqui"
            error={!!errorsPF.agencia || !!errorsPJ.agencia}
          />
          {(errorsPF.agencia || errorsPJ.agencia) && (
            <Helper>
              {errorsPF.agencia?.message || errorsPJ.agencia?.message}
            </Helper>
          )}
        </FieldWrap>

        {/* Conta */}
        <FieldWrap>
          <Label>Conta com dígito *</Label>
          <InputBase
            {...register("conta")}
            placeholder="Digite aqui"
            error={!!errorsPF.conta || !!errorsPJ.conta}
          />
          {(errorsPF.conta || errorsPJ.conta) && (
            <Helper>
              {errorsPF.conta?.message || errorsPJ.conta?.message}
            </Helper>
          )}
        </FieldWrap>

        {/* Tipo de pessoa */}
        <FieldWrap>
          <Label>Tipo de pessoa *</Label>
          <select
            {...register("tipoPessoa")}
            defaultValue="PF"
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid #E5E7EB",
            }}
          >
            <option value="PF">Pessoa Física</option>
            <option value="PJ">Pessoa Jurídica</option>
          </select>
        </FieldWrap>

        {/* Campos discriminados */}
        {tipoPessoa === "PF" ? (
          <FieldWrap>
            <Label>CPF *</Label>
            <InputBase
              {...register("cpf")}
              placeholder="000.000.000-00"
              onChange={(e) =>
                (e.currentTarget.value = maskCPF(e.currentTarget.value))
              }
              error={!!errorsPF.cpf}
            />
            {errorsPF.cpf && <Helper>{errorsPF.cpf.message}</Helper>}
          </FieldWrap>
        ) : (
          <>
            <FieldWrap>
              <Label>Razão Social *</Label>
              <InputBase
                {...register("razaoSocial")}
                placeholder="Digite aqui"
                error={!!errorsPJ.razaoSocial}
              />
              {errorsPJ.razaoSocial && (
                <Helper>{errorsPJ.razaoSocial.message}</Helper>
              )}
            </FieldWrap>

            <FieldWrap>
              <Label>CNPJ *</Label>
              <InputBase
                {...register("cnpj")}
                placeholder="00.000.000/0000-00"
                onChange={(e) =>
                  (e.currentTarget.value = maskCNPJ(e.currentTarget.value))
                }
                error={!!errorsPJ.cnpj}
              />
              {errorsPJ.cnpj && <Helper>{errorsPJ.cnpj.message}</Helper>}
            </FieldWrap>

            <FieldWrap>
              <Label>Nome do responsável *</Label>
              <InputBase
                {...register("responsavelNome")}
                placeholder="Digite aqui"
                error={!!errorsPJ.responsavelNome}
              />
              {errorsPJ.responsavelNome && (
                <Helper>{errorsPJ.responsavelNome.message}</Helper>
              )}
            </FieldWrap>

            <FieldWrap>
              <Label>CPF do responsável *</Label>
              <InputBase
                {...register("responsavelCpf")}
                placeholder="000.000.000-00"
                onChange={(e) =>
                  (e.currentTarget.value = maskCPF(e.currentTarget.value))
                }
                error={!!errorsPJ.responsavelCpf}
              />
              {errorsPJ.responsavelCpf && (
                <Helper>{errorsPJ.responsavelCpf.message}</Helper>
              )}
            </FieldWrap>
          </>
        )}

        {/* Telefone */}
        <FieldWrap>
          <Label>Telefone *</Label>
          <InputBase
            {...register("telefone")}
            placeholder="(00) 00000-0000"
            onChange={(e) =>
              (e.currentTarget.value = maskPhone(e.currentTarget.value))
            }
            error={!!errorsPF.telefone || !!errorsPJ.telefone}
          />
          {(errorsPF.telefone || errorsPJ.telefone) && (
            <Helper>
              {errorsPF.telefone?.message || errorsPJ.telefone?.message}
            </Helper>
          )}
        </FieldWrap>

        {/* Nome completo */}
        <FieldWrap>
          <Label>Nome completo</Label>
          <InputBase {...register("nomeCompleto")} placeholder="Digite aqui" />
        </FieldWrap>

        {/* CEP */}
        <FieldWrap>
          <Label>CEP *</Label>
          <InputBase
            {...register("cep")}
            placeholder="00000-000"
            onChange={(e) =>
              (e.currentTarget.value = maskCEP(e.currentTarget.value))
            }
            error={!!errorsPF.cep || !!errorsPJ.cep}
          />
          {(errorsPF.cep || errorsPJ.cep) && (
            <Helper>{errorsPF.cep?.message || errorsPJ.cep?.message}</Helper>
          )}
        </FieldWrap>

        {/* Estado */}
        <FieldWrap>
          <Label>Estado *</Label>
          <select
            {...register("estado")}
            defaultValue=""
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid #E5E7EB",
            }}
          >
            <option value="">Selecione</option>
            {estados.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
          {(errorsPF.estado || errorsPJ.estado) && (
            <Helper>
              {errorsPF.estado?.message || errorsPJ.estado?.message}
            </Helper>
          )}
        </FieldWrap>

        {/* Cidade */}
        <FieldWrap>
          <Label>Cidade *</Label>
          <InputBase
            {...register("cidade")}
            placeholder="Digite aqui"
            error={!!errorsPF.cidade || !!errorsPJ.cidade}
          />
          {(errorsPF.cidade || errorsPJ.cidade) && (
            <Helper>
              {errorsPF.cidade?.message || errorsPJ.cidade?.message}
            </Helper>
          )}
        </FieldWrap>

        {/* Endereço */}
        <FieldWrap>
          <Label>Endereço *</Label>
          <InputBase
            {...register("endereco")}
            placeholder="Digite aqui"
            error={!!errorsPF.endereco || !!errorsPJ.endereco}
          />
          {(errorsPF.endereco || errorsPJ.endereco) && (
            <Helper>
              {errorsPF.endereco?.message || errorsPJ.endereco?.message}
            </Helper>
          )}
        </FieldWrap>

        {/* Número */}
        <FieldWrap>
          <Label>Número *</Label>
          <InputBase
            {...register("numero")}
            placeholder="Digite aqui"
            error={!!errorsPF.numero || !!errorsPJ.numero}
          />
          {(errorsPF.numero || errorsPJ.numero) && (
            <Helper>
              {errorsPF.numero?.message || errorsPJ.numero?.message}
            </Helper>
          )}
        </FieldWrap>
      </Grid>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginTop: 16,
        }}
      >
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Próximo</Button>
      </div>
    </form>
  );
}
