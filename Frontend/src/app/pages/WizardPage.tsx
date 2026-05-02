import { useState, useMemo } from "react";
import { VerticalStepper } from "../components/VerticalStepper";
import { InputsStep } from "../components/InputsStep";
import { MotorSelection } from "../components/MotorSelection";
import { GearDesign } from "../components/GearDesign";
import { ShaftsBearings } from "../components/ShaftsBearings";
import { ExportReports } from "../components/ExportReports";

export function WizardPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = useMemo(
    () => [
      {
        id: 1,
        label: "Nhập thông số",
        status:
          currentStep === 1
            ? "current"
            : currentStep > 1
            ? "completed"
            : "upcoming",
      },
      {
        id: 2,
        label: "Chọn động cơ",
        status:
          currentStep === 2
            ? "current"
            : currentStep > 2
            ? "completed"
            : "upcoming",
      },
      {
        id: 3,
        label: "Thiết kế bánh răng",
        status:
          currentStep === 3
            ? "current"
            : currentStep > 3
            ? "completed"
            : "upcoming",
      },
      {
        id: 4,
        label: "Trục & Ổ bi",
        status:
          currentStep === 4
            ? "current"
            : currentStep > 4
            ? "completed"
            : "upcoming",
      },
      {
        id: 5,
        label: "Xuất báo cáo",
        status:
          currentStep === 5
            ? "current"
            : currentStep > 5
            ? "completed"
            : "upcoming",
      },
    ],
    [currentStep]
  );

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <InputsStep onNext={handleNextStep} />;
      case 2:
        return <MotorSelection onNext={handleNextStep} onBack={handlePrevStep} />;
      case 3:
        return <GearDesign onNext={handleNextStep} onBack={handlePrevStep} />;
      case 4:
        return <ShaftsBearings onNext={handleNextStep} onBack={handlePrevStep} />;
      case 5:
        return <ExportReports onBack={handlePrevStep} />;
      default:
        return <InputsStep onNext={handleNextStep} />;
    }
  };

  return (
    <div className="h-screen flex bg-[#F8FAFC]">
      <VerticalStepper steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />
      {renderStepContent()}
    </div>
  );
}
