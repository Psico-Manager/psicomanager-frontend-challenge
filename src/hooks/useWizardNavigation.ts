import { useState, useCallback } from 'react';

interface UseWizardNavigationProps {
  totalSteps: number;
  initialStep?: number;
  onStepChange?: (step: number) => void;
}

/**
 * Custom hook para gerenciar navegação em wizard/stepper
 */
export function useWizardNavigation({ 
  totalSteps, 
  initialStep = 1,
  onStepChange
}: UseWizardNavigationProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [progress, setProgress] = useState(0);

  const goToNextStep = useCallback(() => {
    const nextStep = Math.min(totalSteps, currentStep + 1);
    setCurrentStep(nextStep);
    setProgress(0);
    
    if (onStepChange) {
      onStepChange(nextStep);
    }
  }, [totalSteps, currentStep, onStepChange]);

  const goToPreviousStep = useCallback(() => {
    const prevStep = Math.max(1, currentStep - 1);
    setCurrentStep(prevStep);
    setProgress(0);
    
    if (onStepChange) {
      onStepChange(prevStep);
    }
  }, [currentStep, onStepChange]);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
      setProgress(0);
      
      if (onStepChange) {
        onStepChange(step);
      }
    }
  }, [totalSteps, onStepChange]);

  const updateProgress = useCallback((newProgress: number) => {
    setProgress(Math.max(0, Math.min(100, newProgress)));
  }, []);

  return {
    currentStep,
    progress,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    updateProgress,
  };
}
