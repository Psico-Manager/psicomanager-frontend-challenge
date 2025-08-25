"use client";

import { useState } from "react";
import { Button, Card, Modal, Steps, notification } from "antd";
import Step1Form from "@/components/FormFinancialSteps/Step1Form";
import Step2Form from "@/components/FormFinancialSteps/Step2Form";
import Step3Form from "@/components/FormFinancialSteps/Step3Form";
import { Step1Data } from "@/schema/step1Schema";
import { Step2Data } from "@/schema/step2Schema";
import { Step3Data } from "@/schema/step3Schema";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

export default function FinanceiroPage() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState<{
    step1?: Step1Data;
    step2?: Step2Data;
    step3?: Step3Data;
  }>({});

  const next = () => setStep((prev) => Math.min(prev + 1, 2));
  const prev = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Header />
        <main className="flex flex-1 p-6 items-center justify-center flex-col">
          <p className="text-gray-600 mb-6 text-center">
            Aqui você pode gerenciar cobranças, pagamentos e relatórios.
          </p>

          <Button type="primary" onClick={() => setOpen(true)}>
            Ativar PsicoBank
          </Button>
        </main>
      </div>
      <Modal
        title="Ativar o PsicoBank"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        width={800}
      >
        <Steps current={step} size="small" className="mb-4">
          <Steps.Step title="Cadastrar conta" />
          <Steps.Step title="Canais e mensagens" />
          <Steps.Step title="Forma de pagamento" />
        </Steps>
        <Card>
          <Card.Grid
            hoverable={false}
            style={{ width: "100%", minHeight: "150px" }}
          >
            {step === 0 && (
              <Step1Form
                defaultValues={formData.step1}
                onSubmit={(data) => {
                  setFormData((prev) => ({ ...prev, step1: data }));
                  next();
                }}
              />
            )}
            {step === 1 && (
              <Step2Form
                defaultValues={formData.step2}
                onBack={prev}
                onSubmit={(data) => {
                  setFormData((prev) => ({ ...prev, step2: data }));
                  next();
                }}
              />
            )}
            {step === 2 && (
              <Step3Form
                defaultValues={formData.step3}
                onBack={prev}
                onSubmit={(data) => {
                  const finalData = { ...formData, step3: data };
                  console.log("✅ DADOS FINAIS:", finalData);
                  notification.success({
                    message: "Cadastro concluído!",
                    description:
                      "Seu cadastro no PsicoBank foi realizado com sucesso.",
                    placement: "topRight",
                    duration: 3, // fecha automaticamente após 3 segundos
                  });
                  setOpen(false);
                }}
              />
            )}
          </Card.Grid>
        </Card>
      </Modal>
    </div>
  );
}
