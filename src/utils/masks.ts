export const onlyDigits = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.replace(/\D/g, '');
};

export function maskCPF(value: string): string {
  if (!value) return '';
  
  const digits = onlyDigits(value).slice(0, 11);
  
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function maskCNPJ(value: string): string {
  if (!value) return '';
  
  const digits = onlyDigits(value).slice(0, 14);
  
  return digits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}

export function maskPhone(value: string): string {
  if (!value) return '';
  
  const digits = onlyDigits(value).slice(0, 11);
  
  if (digits.length === 0) return '';
  
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
      .replace(/-$/, '');
  }
  
  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}

export function maskCEP(value: string): string {
  if (!value) return '';
  
  const digits = onlyDigits(value).slice(0, 8);
  
  return digits
    .replace(/(\d{5})(\d{0,3})/, '$1-$2')
    .replace(/-$/, '');
}
