/**
 * Funções de validação centralizadas para o projeto
 */

export const onlyDigits = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.replace(/\D/g, '');
};

export function validateCPF(cpf: string): boolean {
  if (!cpf) return false;

  const digits = onlyDigits(cpf).slice(0, 11);

  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]) * (10 - i);
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;

  if (parseInt(digits[9]) !== digit1) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits[i]) * (11 - i);
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;

  return parseInt(digits[10]) === digit2;
}

export function validateCNPJ(cnpj: string): boolean {
  if (!cnpj) return false;

  const digits = onlyDigits(cnpj).slice(0, 14);

  if (digits.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(digits)) return false;

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits[i]) * weights1[i];
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;

  if (parseInt(digits[12]) !== digit1) return false;

  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(digits[i]) * weights2[i];
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;

  return parseInt(digits[13]) === digit2;
}

export function validateCEP(cep: string): boolean {
  if (!cep) return false;

  const digits = onlyDigits(cep);
  return digits.length === 8 && !/^0{8}$/.test(digits);
}

export function validatePhone(phone: string): boolean {
  if (!phone) return false;

  const digits = onlyDigits(phone);

  if (![10, 11].includes(digits.length)) return false;

  const ddd = parseInt(digits.substring(0, 2));
  if (ddd < 11 || ddd > 99) return false;

  if (digits.length === 11 && digits[2] !== '9') return false;

  if (digits.length === 10 && ['0', '1'].includes(digits[2])) return false;

  return true;
}

export function validateMonetary(value: string): boolean {
  if (!value || value.trim() === '') return false;

  const cleaned = value.trim();
  if (!/^[\d.,]+$/.test(cleaned)) return false;

  const normalized = cleaned.replace(/\./g, '').replace(',', '.');
  const num = parseFloat(normalized);

  return !isNaN(num) && num > 0;
}
