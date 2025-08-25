import styled from "styled-components";

export const BoldSpan = styled.span`
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  padding-bottom: 4px;
  display: inline-block; // necessário para que o padding-bottom funcione
  font-size: 16px; // base
  color: #3d3d3d; // texto principal (preto quase sólido)
`;

export const MediumSpan = styled(BoldSpan)`
  font-weight: 600; // menos pesado que bold
  font-size: 16px; // 2px menor
  color: #4c5153; // cinza médio
`;

export const LightSpan = styled(BoldSpan)`
  font-weight: 400; // regular
  font-size: 12px; // mais 2px menor
  color: #999; // cinza claro
`;
