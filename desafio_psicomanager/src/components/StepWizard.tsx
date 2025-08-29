import React, { useState } from 'react';
import {
  StepContainer,
  StepIndicatorContainer,
  StepIndicator,
  StepLine,
  StepContent,
  StepNavigation,
  StepButton,
  StepTitle,
} from './StepWizard.styles';
import { Check } from 'lucide-react';

interface StepWizardProps {
  steps: {
    title: string;
    content: React.ReactNode;
    validator?: () => boolean;
  }[];
  callback: (value: boolean) => void;
  onFinish?: () => void;
}

const StepWizard: React.FC<StepWizardProps> = ({ steps, callback, onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    // Verificar se o step atual tem validação e se passou
    const currentStepValidator = steps[currentStep].validator;
    if (currentStepValidator && !currentStepValidator()) {
      return; // Não avançar se a validação falhar
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (onFinish) {
      onFinish();
    }
  };

  const handleBack = () => {
    callback(false);
  };

  return (
    <StepContainer>
      {/* Indicadores de passo */}
      <StepIndicatorContainer>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <StepIndicator
                active={index === currentStep}
                completed={index < currentStep}
              >
                {index < currentStep ? (
                  <Check size={18} color='white' />
                ) : (
                  <div className='dot' />
                )}
              </StepIndicator>
              <StepTitle
                active={index === currentStep}
                completed={index < currentStep}
              >
                {step.title}
              </StepTitle>
            </div>
            {index < steps.length - 1 && (
              <StepLine completed={index < currentStep} />
            )}
          </React.Fragment>
        ))}
      </StepIndicatorContainer>

      {/* Conteúdo do passo atual */}
      <StepContent>{steps[currentStep].content}</StepContent>

      {/* Navegação */}
      <StepNavigation>
        <StepButton onClick={handleBack} disabled={currentStep === 0}>
          Cancelar
        </StepButton>
        <StepButton
          onClick={handleNext}
          disabled={currentStep === steps.length - 1 && !onFinish}
        >
          {currentStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
        </StepButton>
      </StepNavigation>
    </StepContainer>
  );
};

export default StepWizard;
