export const onlyDigits = (v:string) => v.replace(/\D/g, '')

export function maskCPF(v:string){
  const s = onlyDigits(v).slice(0,11)
  return s.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}
export function maskCNPJ(v:string){
  const s = onlyDigits(v).slice(0,14)
  return s.replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d{1,2})$/, '$1-$2')
}
export function maskPhone(v:string){
  const s = onlyDigits(v).slice(0,11)
  if(s.length <= 10) return s.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim()
  return s.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim()
}
export function maskCEP(v:string){
  const s = onlyDigits(v).slice(0,8)
  return s.replace(/(\d{5})(\d{0,3})/, '$1-$2').trim()
}
