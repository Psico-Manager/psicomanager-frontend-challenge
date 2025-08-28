import { useState, useEffect, useCallback } from 'react';
import { Step1, Step2, Step3 } from '../features/wizard/validation/schemas';

interface WizardData {
  step1: Step1 | null;
  step2: Step2 | null;
  step3: Step3 | null;
}

const STORAGE_KEY = 'psicomanager_wizard_data';

/**
 * Custom hook para gerenciar e persistir dados do wizard
 */
export function useWizardData() {
  const [wizardData, setWizardData] = useState<WizardData>({
    step1: null,
    step2: null,
    step3: null,
  });

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setWizardData(parsedData);
      }
    } catch (error) {
      console.warn('Erro ao carregar dados do wizard:', error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wizardData));
    } catch (error) {
      console.warn('Erro ao salvar dados do wizard:', error);
    }
  }, [wizardData]);

  const updateStepData = useCallback(<T extends Step1 | Step2 | Step3>(
    step: keyof WizardData,
    data: T
  ) => {
    setWizardData(prev => ({
      ...prev,
      [step]: data,
    }));
  }, []);

  const clearWizardData = useCallback(() => {
    setWizardData({
      step1: null,
      step2: null,
      step3: null,
    });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const hasStepData = useCallback((step: keyof WizardData) => {
    return wizardData[step] !== null;
  }, [wizardData]);

  const isWizardComplete = useCallback(() => {
    return wizardData.step1 !== null && 
           wizardData.step2 !== null && 
           wizardData.step3 !== null;
  }, [wizardData]);

  const getStepData = useCallback(<T extends Step1 | Step2 | Step3>(
    step: keyof WizardData
  ): T | null => {
    return wizardData[step] as T | null;
  }, [wizardData]);

  return {
    wizardData,
    updateStepData,
    clearWizardData,
    hasStepData,
    isWizardComplete,
    getStepData,
  };
}
