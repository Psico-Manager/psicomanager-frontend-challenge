import { FaCheck } from "react-icons/fa";
import styled from "styled-components";

type StepState = "past" | "now" | "future";
type StepPosition = "start" | "center" | "end";

interface StepperProps {
  index: number;
  progress: number;
  onStepChange?: (step: number) => void;
}

const STEP_LABELS = [
  "Cadastrar uma conta",
  "Canais de envio e mensagem",
  "Forma de pagamento",
] as const;

const STEP_POSITIONS: StepPosition[] = ["start", "center", "end"];

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 2rem 0;
`;

const ProgressContainer = styled.div`
  position: relative;
  width: calc(100% - 64px);
  height: 4px;
  left: 18px;
  margin: 0 14px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
`;

const ProgressFill = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: #96A5FF;
  border-radius: 2px;
  transition: width 0.4s ease-in-out;
`;

const StepsRow = styled.ul`
  position: absolute;
  top: -14px;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StepItem = styled.li<{ position: StepPosition }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  ${({ position }) => {
    switch (position) {
      case "start":
        return "left: 0;";
      case "center":
        return "left: 50%; transform: translateX(-50%);";
      case "end":
        return "right: 0;";
      default:
        return "";
    }
  }}
`;

const Dot = styled.div<{ state: StepState }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: ${({ state }) => (state === "past" ? "4px" : "8px")} solid
    ${({ state }) =>
      state === "past" || state === "now"
        ? "#96A5FF"
        : "#E5E7EB"};
  background-color: ${({ state }) =>
    state === "past" || state === "now" ? "#96A5FF" : "#E5E7EB"};
  color: ${({ state }) =>
    state === "past" || state === "now"
      ? "#FFFFFF"
      : "#6B7280"};
  font-size: 16px;
  font-weight: bold;
  cursor: ${({ state }) => (state === "past" ? "pointer" : "default")};
  z-index: 2;
  transition: all 0.3s ease-in-out;

  &:hover {
    ${({ state }) =>
      state === "past" &&
      `
      transform: scale(1.1);
    `}
  }
`;

const Label = styled.span<{ state: StepState }>`
  display: block;
  max-width: 90px;
  margin-top: 6px;
  font-size: 13px;
  text-align: center;
  color: ${({ theme, state }) =>
    state === "now" ? theme.colors.text : theme.colors.muted};
`;

const getStepState = (stepNumber: number, currentIndex: number): StepState => {
  if (stepNumber < currentIndex) return "past";
  if (stepNumber === currentIndex) return "now";
  return "future";
};

const calculateProgress = (
  currentIndex: number,
  progress: number,
  totalSteps: number
): number => {
  const baseProgress = ((currentIndex - 1) / (totalSteps - 1)) * 100;
  const stepProgress = progress / (totalSteps - 1);
  return Math.min(baseProgress + stepProgress, 100);
};

export function Stepper({ index, progress, onStepChange }: StepperProps) {
  const totalProgress = calculateProgress(index, progress, STEP_LABELS.length);

  const handleStepClick = (stepNumber: number, state: StepState) => {
    if (state === "past" && onStepChange) {
      onStepChange(stepNumber);
    }
  };

  return (
    <Wrapper>
      <ProgressContainer>
        <ProgressFill progress={totalProgress} />
      </ProgressContainer>

      <StepsRow>
        {STEP_LABELS.map((label, stepIndex) => {
          const stepNumber = stepIndex + 1;
          const state = getStepState(stepNumber, index);
          const position = STEP_POSITIONS[stepIndex];

          return (
            <StepItem key={label} position={position}>
              <Dot
                state={state}
                onClick={() => handleStepClick(stepNumber, state)}
              >
                {state === "past" && <FaCheck size={8} />}
              </Dot>
              <Label state={state}>{label}</Label>
            </StepItem>
          );
        })}
      </StepsRow>
    </Wrapper>
  );
}
