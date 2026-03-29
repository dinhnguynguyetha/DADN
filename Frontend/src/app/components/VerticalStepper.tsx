import { Check } from "lucide-react";
import { cn } from "./ui/utils";

interface Step {
  id: number;
  label: string;
  status: "completed" | "current" | "upcoming";
}

interface VerticalStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export function VerticalStepper({ steps, currentStep, onStepClick }: VerticalStepperProps) {
  return (
    <div className="w-72 h-screen bg-[#0F172A] border-r border-[#1E293B] py-8 px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-xl mb-1">Hệ Thống Thiết Kế Hộp Giảm Tốc</h1>
        <p className="text-[#94A3B8] text-sm">Phần Mềm Tính Toán Truyền Động</p>
      </div>

      {/* Steps */}
      <nav className="space-y-6">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isClickable = step.status === "completed" || step.status === "current";
          
          return (
            <div key={step.id} className="relative">
              {/* Connector Line */}
              {!isLast && (
                <div
                  className={cn(
                    "absolute left-4 top-10 w-0.5 h-6",
                    step.status === "completed" 
                      ? "bg-[#3B82F6]" 
                      : "bg-[#334155]"
                  )}
                />
              )}

              {/* Step */}
              <div 
                className={cn(
                  "flex items-start gap-3",
                  isClickable && "cursor-pointer hover:opacity-80 transition-opacity"
                )}
                onClick={() => isClickable && onStepClick(step.id)}
              >
                {/* Circle Indicator */}
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                    step.status === "completed" && "bg-[#3B82F6]",
                    step.status === "current" && "bg-[#3B82F6] ring-4 ring-[#1E3A8A]",
                    step.status === "upcoming" && "bg-[#1E293B] border-2 border-[#334155]"
                  )}
                >
                  {step.status === "completed" ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <span
                      className={cn(
                        "text-sm font-medium",
                        step.status === "current" && "text-white",
                        step.status === "upcoming" && "text-[#64748B]"
                      )}
                    >
                      {step.id}
                    </span>
                  )}
                </div>

                {/* Step Label */}
                <div className="pt-0.5">
                  <p
                    className={cn(
                      "text-sm font-medium leading-tight",
                      step.status === "current" && "text-white",
                      step.status === "completed" && "text-[#94A3B8]",
                      step.status === "upcoming" && "text-[#64748B]"
                    )}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-8 left-6 right-6">
        <div className="border-t border-[#1E293B] pt-4">
          <p className="text-[#64748B] text-xs">Phiên bản 2.4.1</p>
          <p className="text-[#475569] text-xs mt-1">© 2026 MechDesign Pro</p>
        </div>
      </div>
    </div>
  );
}