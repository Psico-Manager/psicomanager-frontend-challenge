import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const AlertBox = styled.div`
  background-color: #fff9c4;
  border: 1px solid #ffe0b2;
  border-radius: 8px;
  padding: 16px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const AlertTitle = styled.p`
  color: #e6a200;
  font-weight: bold;
  margin: 0 0 10px 0;
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const AlertList = styled.ul`
  color: #e6a200;
  list-style-type: disc;
  padding-left: 20px;
  margin: 0;

  @media (max-width: 480px) {
    padding-left: 16px;
  }
`;

export const AlertItem = styled.li`
  margin-bottom: 8px;
  line-height: 1.5;
  font-size: 0.95rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 6px;
  }
`;

export const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  color: #333;
`;

export const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: ${(props) => (props.error ? '2px solid #e74c3c' : '1px solid #ccc')};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

export const Select = styled.select<{ error?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: ${(props) => (props.error ? '2px solid #e74c3c' : '1px solid #ccc')};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const Col = styled.div`
  flex: 1;
  min-width: 200px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const Button = styled.button<{ secondary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  ${(props) =>
    props.secondary
      ? 'background-color: #ccc; color: #333;'
      : 'background-color: #3498db; color: white;'}

  &:hover {
    ${(props) =>
      props.secondary
        ? 'background-color: #bbb;'
        : 'background-color: #2980b9;'}
  }
`;
