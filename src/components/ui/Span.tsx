import styled from "styled-components";

/**
 * Componente de texto base em negrito
 * Usado como base para outros componentes de texto
 */
export const BoldSpan = styled.span`
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  padding-bottom: 4px;
  display: inline-block;
  font-size: 16px;
  color: #3d3d3d;
`;

/**
 * Componente de texto médio
 * Herda estilos do BoldSpan com peso intermediário
 */
export const MediumSpan = styled(BoldSpan)`
  font-weight: 600;
  font-size: 16px;
  color: #4c5153;
`;

