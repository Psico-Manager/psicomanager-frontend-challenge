import React, { useState } from "react";
import { Backdrop, ModalBox, ModalHeader, ModalBody } from "./primitives/Modal";
import { Stepper } from "./Stepper";
import { Step1View } from "./steps/Step1View";
import { Step2View } from "./steps/Step2View";
import { Step3View } from "./steps/Step3View";
import { Step1, Step2, Step3 } from "../schema";
import { Button } from "./primitives/Button";
import { IoCloseSharp } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

export function ActivatePsicoBankModal({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState(1);
  const [step1, setStep1] = useState<Step1 | null>(null);
  const [step2, setStep2] = useState<Step2 | null>(null);
  const [step3, setStep3] = useState<Step3 | null>(null);
  const [progress, setProgress] = useState(0);
  const [flag, setFlag] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  function next() {
    setCurrent((c) => Math.min(3, c + 1));
    setProgress(0);
  }

  function prev() {
    setCurrent((c) => Math.max(1, c - 1));
    setProgress(0);
  }

  function finish(payload: Step3) {
    setStep3(payload);
    const all = { step1, step2, step3: payload };

    setTimeout(() => {
      toast.success("PsicoBank ativado com sucesso!");
      onClose();
    }, 3000);
  }

  return (
    <Backdrop>
      <ModalBox>
        <ModalHeader
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h3 style={{ margin: "4px 0" }}>Ativar o PsicoBank</h3>
            <Button
              variant="tertiary"
              onClick={onClose}
              style={{
                fontWeight: 700, // bold
                fontSize: "24px", // tamanho 12px
                color: "#a1a1aa", // zinc-400
                padding: 4, // opcional, deixar compacto
                minWidth: 0, // evitar largura extra
                lineHeight: 1, // ajustar alinhamento
              }}
            >
              <IoCloseSharp />
            </Button>
          </div>

          {/* Stepper agora ocupa toda a largura */}
          <div style={{ width: "100%", marginTop: 16 }}>
            <Stepper
              index={current}
              progress={progress}
              onStepChange={(step) => {
                setCurrent(step); // atualiza o step atual ao clicar em um passo concluído
                setProgress(0); // reseta o progresso
              }}
            />
          </div>
        </ModalHeader>
        <ModalBody>
          {current === 1 && (
            <Step1View
              defaultValues={step1 || undefined}
              onCancel={onClose}
              onSubmit={(d) => {
                setStep1(d);
                next();
              }}
              onProgress={setProgress} // 👈 barra dinâmica
            />
          )}
          {current === 2 && (
            <Step2View
              profissional={step1?.profissional || "João Silva"}
              defaultValues={step2 || undefined}
              onCancel={onClose}
              onSubmit={(d) => {
                setStep2(d);
                next();
              }}
              onProgress={setProgress}
            />
          )}
          {current === 3 && (
            <Step3View
              profissional={step1?.profissional || "João Silva"}
              defaultValues={step3 || undefined}
              onCancel={onClose}
              onSubmit={finish}
              onProgress={setProgress}
            />
          )}

          {flag && (
            <div
              style={{
                marginTop: 12,
                padding: 12,
                background: flag.type === "success" ? "#ECFDF5" : "#FEF2F2",
                color: flag.type === "success" ? "#065F46" : "#991B1B",
                borderRadius: 8,
              }}
            >
              {flag.text}
            </div>
          )}
        </ModalBody>
      </ModalBox>
    </Backdrop>
  );
}
