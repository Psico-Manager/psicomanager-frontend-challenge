import React, { useState, useCallback, useEffect } from "react";
import { Backdrop, ModalBox, ModalHeader, ModalBody } from "../../../components/ui/Modal";
import { Stepper } from "./Stepper";
import { Step1View } from "../steps/StepView1";
import { Step2View } from "../steps/StepView2";
import { Step3View } from "../steps/StepView3";
import { Step1, Step2, Step3 } from "../validation/schemas";
import { Button } from "../../../components/ui/Button";
import { useWizardNavigation, useWizardData } from "../../../hooks";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

interface ActivatePsicoBankModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function ActivatePsicoBankModal({ onClose, onSuccess }: ActivatePsicoBankModalProps) {
  const {
    currentStep,
    progress,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    updateProgress,
  } = useWizardNavigation({ totalSteps: 3 });

  const {
    wizardData,
    updateStepData,
    clearWizardData,
    hasStepData,
    isWizardComplete,
    getStepData,
  } = useWizardData();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleStep1Submit = useCallback((data: Step1) => {
    updateStepData('step1', data);
    goToNextStep();
  }, [updateStepData, goToNextStep]);

  const handleStep2Submit = useCallback((data: Step2) => {
    updateStepData('step2', data);
    goToNextStep();
  }, [updateStepData, goToNextStep]);

  const handleStep3Submit = useCallback(async (data: Step3) => {
    setIsSubmitting(true);
    
    updateStepData('step3', data);
    
    // Log das informações salvas de todas as etapas do wizard
    const allWizardData = {
      ...wizardData,
      step3: data
    };
    
    console.log('=== DADOS SALVOS NO WIZARD ===');
    console.log('Etapa 1 - Cadastrar uma conta:', allWizardData.step1);
    console.log('Etapa 2 - Canais de envio e mensagem:', allWizardData.step2);
    console.log('Etapa 3 - Forma de pagamento:', allWizardData.step3);
    console.log('Dados completos do wizard:', allWizardData);
    console.log('================================');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      
      setTimeout(() => {
        toast.success("PsicoBank ativado com sucesso!");
      }, 3000);
      
      setTimeout(() => {
        clearWizardData();
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      }, 3000);
      
    } catch (error) {
      toast.error("Erro ao ativar PsicoBank. Tente novamente.");
      setIsSubmitting(false);
    }
  }, [updateStepData, wizardData, clearWizardData, onClose, onSuccess]);

  const handleStepChange = useCallback((step: number) => {
    const stepKey = `step${step}` as keyof typeof wizardData;
    
    if (step < currentStep || hasStepData(stepKey)) {
      goToStep(step);
    } else {
      toast.error('Complete a etapa atual antes de navegar para etapas futuras.');
    }
  }, [currentStep, goToStep, hasStepData, wizardData]);

  const handleCloseModal = useCallback(() => {
    if (!isSuccess && !isSubmitting) {
      if (hasStepData('step1') || hasStepData('step2') || hasStepData('step3')) {
        const shouldSave = window.confirm(
          'Deseja salvar os dados preenchidos antes de fechar? Os dados serão mantidos para quando você retornar.'
        );
        
        if (!shouldSave) {
          clearWizardData();
        }
      }
    }
    onClose();
  }, [isSuccess, isSubmitting, hasStepData, clearWizardData, onClose]);

  return (
    <Backdrop>
      <ModalBox role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <ModalHeader>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}>
            <h3 id="modal-title" style={{ margin: "4px 0", color: "#677176" }}>
              Ativar o PsicoBank
            </h3>
            <Button
              variant="tertiary"
              size="small"
              onClick={handleCloseModal}
              disabled={isSubmitting}
              aria-label="Fechar modal"
              style={{ padding: "4px" }}
            >
              <IoCloseSharp />
            </Button>
          </div>

          <div style={{ width: "100%", marginTop: 16 }}>
            <Stepper
              index={currentStep}
              progress={progress}
              onStepChange={isSubmitting ? undefined : handleStepChange}
            />
          </div>
        </ModalHeader>

        <ModalBody>
          {currentStep === 1 && (
            <Step1View
              defaultValues={getStepData<Step1>('step1') || undefined}
              onCancel={handleCloseModal}
              onSubmit={handleStep1Submit}
              onProgress={updateProgress}
            />
          )}
          
          {currentStep === 2 && (
            <Step2View
              profissional={getStepData<Step1>('step1')?.profissional || "João Silva"}
              defaultValues={getStepData<Step2>('step2') || undefined}
              onCancel={handleCloseModal}
              onSubmit={handleStep2Submit}
              onProgress={updateProgress}
            />
          )}
          
          {currentStep === 3 && (
            <Step3View
              profissional={getStepData<Step1>('step1')?.profissional || "João Silva"}
              defaultValues={getStepData<Step3>('step3') || undefined}
              onCancel={handleCloseModal}
              onSubmit={handleStep3Submit}
              onProgress={updateProgress}
              isSubmitting={isSubmitting}
            />
          )}
        </ModalBody>
      </ModalBox>
    </Backdrop>
  );
}
