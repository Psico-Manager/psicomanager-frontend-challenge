export interface Step3 {
  profissional: string;
  metodoPagamento: "PIX" | "Cartão de crédito" | "Boleto Bancário";
  cobrarMulta: boolean;
  valorMulta?: string;
  cobrarJuros: boolean;
  jurosDia?: string;
}
