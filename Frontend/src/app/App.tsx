import { useState, useMemo } from "react";
import { VerticalStepper } from "./components/VerticalStepper";
import { InputsStep } from "./components/InputsStep";
import { MotorSelection } from "./components/MotorSelection";
import { GearDesign } from "./components/GearDesign";
import { ShaftsBearings } from "./components/ShaftsBearings";
import { ExportReports } from "./components/ExportReports";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = useMemo(() => [
    { id: 1, label: "Nhập thông số", status: currentStep === 1 ? "current" as const : currentStep > 1 ? "completed" as const : "upcoming" as const },
    { id: 2, label: "Chọn động cơ", status: currentStep === 2 ? "current" as const : currentStep > 2 ? "completed" as const : "upcoming" as const },
    { id: 3, label: "Thiết kế bánh răng", status: currentStep === 3 ? "current" as const : currentStep > 3 ? "completed" as const : "upcoming" as const },
    { id: 4, label: "Trục & Ổ bi", status: currentStep === 4 ? "current" as const : currentStep > 4 ? "completed" as const : "upcoming" as const },
    { id: 5, label: "Xuất báo cáo", status: currentStep === 5 ? "current" as const : currentStep > 5 ? "completed" as const : "upcoming" as const },
  ], [currentStep]);

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <InputsStep />;
      case 2:
        return <MotorSelection />;
      case 3:
        return <GearDesign />;
      case 4:
        return <ShaftsBearings />;
      case 5:
        return <ExportReports />;
      default:
        return <InputsStep />;
    }
  };

  return (
    <div className="h-screen flex bg-[#F8FAFC]">
      <VerticalStepper 
        steps={steps} 
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />
      {renderStepContent()}
    </div>
  );
}