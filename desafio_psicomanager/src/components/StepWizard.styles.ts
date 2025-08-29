import styled from 'styled-components';

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const StepIndicatorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
  position: relative;
  padding: 0 20px;
`;

export const StepIndicator = styled.div<{
  active: boolean;
  completed: boolean;
}>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid
    ${({ active, completed }) =>
      active ? '#60a5fa' : completed ? '#60a5fa' : '#d1d5db'};
  background-color: ${({ active, completed }) =>
    active ? '#60a5fa' : completed ? '#60a5fa' : 'transparent'};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease;
  }

  .dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: white;
    opacity: 0.7;
  }
`;

export const StepLine = styled.div<{ completed: boolean }>`
  flex: 1;
  height: 2px;
  background-color: ${({ completed }) => (completed ? '#60a5fa' : '#d1d5db')};
  margin: 0 10px;
  position: relative;
  top: 16px;
  z-index: 1;
`;

export const StepTitle = styled.div<{ active: boolean; completed: boolean }>`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ active, completed }) =>
    active ? '#60a5fa' : completed ? '#6b7280' : '#9ca3af'};
  text-align: center;
  min-width: 100px;
  line-height: 1.4;
`;

export const StepContent = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StepNavigation = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  width: 100%;
`;

export const StepButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #60a5fa;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3b82f6;
  }

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;
