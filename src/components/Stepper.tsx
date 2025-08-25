import { FaCheck } from "react-icons/fa";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;
  position: relative;
  margin: 2rem 0;
`;

const ProgressContainer = styled.div`
  position: relative;
  width: calc(100% - 64px);
  height: 4px;
  left: 18px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  margin: 0 14px;
`;

const ProgressFill = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: #96a5ff;
  transition: width 0.4s ease-in-out;
  border-radius: 2px;
`;

const StepsRow = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: -14px;
  left: 0;
`;

const StepItem = styled.li<{ position: "start" | "center" | "end" }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ position }) =>
    position === "start"
      ? "left: 0;"
      : position === "center"
      ? "left: 50%; transform: translateX(-50%);"
      : "right: 0;"}
`;

const Dot = styled.div<{ state: "past" | "now" | "future" }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  border: ${({ state }) => (state === "past" ? "4px" : "8px")} solid
    ${({ theme, state }) =>
      state === "past" || state === "now"
        ? theme.colors.primary
        : theme.colors.border};

  background: #96a5ff;
  z-index: 2;
  font-size: 16px;
  color: ${({ theme, state }) =>
    state === "past" || state === "now"
      ? theme.colors.primary
      : theme.colors.border};
  font-weight: bold;

  cursor: ${({ state }) => (state === "past" ? "pointer" : "default")};
`;

const Label = styled.span<{ state: "past" | "now" | "future" }>`
  font-size: 13px;
  margin-top: 6px;
  color: ${({ theme, state }) =>
    state === "now" ? theme.colors.text : theme.colors.muted};
  text-align: center;
  display: block;
  max-width: 90px;
`;

type StepperProps = {
  index: number;
  progress: number;
  onStepChange?: (step: number) => void; // callback ao clicar em steps concluídos
};

export function Stepper({ index, progress, onStepChange }: StepperProps) {
  const items = [
    "Cadastrar uma conta",
    "Canais de envio e mensagem",
    "Forma de pagamento",
  ];

  const positions: ("start" | "center" | "end")[] = ["start", "center", "end"];

  const baseProgress = ((index - 1) / (items.length - 1)) * 100;
  const stepProgress = progress / (items.length - 1);
  const totalProgress = Math.min(baseProgress + stepProgress, 100);

  return (
    <Wrapper>
      <ProgressContainer>
        <ProgressFill progress={totalProgress} />
      </ProgressContainer>

      <StepsRow>
        {items.map((t, i) => {
          const step = i + 1;
          const state: "past" | "now" | "future" =
            step < index ? "past" : step === index ? "now" : "future";

          return (
            <StepItem key={t} position={positions[i]}>
              <Dot
                state={state}
                onClick={() => state === "past" && onStepChange?.(step)}
              >
                {state === "past" ? <FaCheck size={12} /> : null}
              </Dot>
              <Label state={state}>{t}</Label>
            </StepItem>
          );
        })}
      </StepsRow>
    </Wrapper>
  );
}
