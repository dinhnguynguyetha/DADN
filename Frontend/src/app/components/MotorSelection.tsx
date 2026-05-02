import { Zap, CheckCircle2, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { cn } from "./ui/utils";
import { useState } from "react";

interface MotorSelectionProps {
  onNext?: () => void;
  onBack?: () => void;
}

export function MotorSelection({ onNext, onBack }: MotorSelectionProps) {
  const [selectedMotor, setSelectedMotor] = useState(2);

  const motorOptions = [
    {
      id: 1,
      model: "Y200L-4",
      power: "30",
      speed: "1470",
      voltage: "380",
      efficiency: "92.5",
      costFactor: "Thấp",
      recommended: false,
    },
    {
      id: 2,
      model: "Y225M-4",
      power: "45",
      speed: "1480",
      voltage: "380",
      efficiency: "93.8",
      costFactor: "Trung bình",
      recommended: true,
    },
    {
      id: 3,
      model: "Y250M-4",
      power: "55",
      speed: "1485",
      voltage: "380",
      efficiency: "94.2",
      costFactor: "Cao",
      recommended: false,
    },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl text-[#0F172A]">Bước 2: Chọn Động Cơ</h1>
          </div>
          <p className="text-[#64748B]">
            Lựa chọn động cơ phù hợp dựa trên công suất yêu cầu và điều kiện làm việc
          </p>
        </div>

        <div className="space-y-6">
          {/* Thông số tính toán */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông Số Tính Toán Động Cơ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-[#64748B]">Công Suất Yêu Cầu</p>
                  <p className="text-2xl font-semibold text-[#0F172A]">38.7 <span className="text-base text-[#64748B]">kW</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-[#64748B]">Tốc Độ Đồng Bộ</p>
                  <p className="text-2xl font-semibold text-[#0F172A]">1500 <span className="text-base text-[#64748B]">vg/ph</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-[#64748B]">Hệ Số Dự Trữ</p>
                  <p className="text-2xl font-semibold text-[#0F172A]">1.15 <span className="text-base text-[#64748B]">-</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-[#64748B]">Công Suất Động Cơ</p>
                  <p className="text-2xl font-semibold text-[#3B82F6]">44.5 <span className="text-base text-[#64748B]">kW</span></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gợi ý hệ thống */}
          <div className="flex items-start gap-3 p-4 bg-[#DBEAFE] border border-[#3B82F6] rounded-lg">
            <Info className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#1E3A8A]">
                Gợi ý từ hệ thống
              </p>
              <p className="text-xs text-[#1E40AF] mt-1">
                Dựa trên công suất tính toán 44.5 kW, hệ thống đề xuất động cơ <strong>Y225M-4 (45 kW)</strong> 
                với hiệu suất cao 93.8% và giá thành hợp lý. Động cơ này phù hợp với băng tải công nghiệp.
              </p>
            </div>
          </div>

          {/* Bảng lựa chọn động cơ */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Danh Sách Động Cơ Phù Hợp</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-[#E2E8F0] overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F8FAFC]">
                      <TableHead className="font-semibold text-[#0F172A]">Chọn</TableHead>
                      <TableHead className="font-semibold text-[#0F172A]">Mã Hiệu</TableHead>
                      <TableHead className="font-semibold text-[#0F172A]">Công Suất (kW)</TableHead>
                      <TableHead className="font-semibold text-[#0F172A]">Tốc Độ (vg/ph)</TableHead>
                      <TableHead className="font-semibold text-[#0F172A]">Điện Áp (V)</TableHead>
                      <TableHead className="font-semibold text-[#0F172A]">Hiệu Suất (%)</TableHead>
                      <TableHead className="font-semibold text-[#0F172A]">Chi Phí</TableHead>
                      <TableHead className="font-semibold text-[#0F172A]">Trạng Thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {motorOptions.map((motor) => (
                      <TableRow
                        key={motor.id}
                        className={cn(
                          "cursor-pointer transition-colors",
                          selectedMotor === motor.id && "bg-[#EFF6FF]",
                          motor.recommended && "border-l-4 border-l-[#3B82F6]"
                        )}
                        onClick={() => setSelectedMotor(motor.id)}
                      >
                        <TableCell>
                          <div
                            className={cn(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                              selectedMotor === motor.id
                                ? "border-[#3B82F6] bg-[#3B82F6]"
                                : "border-[#CBD5E1]"
                            )}
                          >
                            {selectedMotor === motor.id && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{motor.model}</TableCell>
                        <TableCell>{motor.power}</TableCell>
                        <TableCell>{motor.speed}</TableCell>
                        <TableCell>{motor.voltage}</TableCell>
                        <TableCell>{motor.efficiency}</TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "inline-flex px-2 py-1 rounded-md text-xs font-medium",
                              motor.costFactor === "Thấp" && "bg-[#D1FAE5] text-[#065F46]",
                              motor.costFactor === "Trung bình" && "bg-[#FEF3C7] text-[#92400E]",
                              motor.costFactor === "Cao" && "bg-[#FEE2E2] text-[#991B1B]"
                            )}
                          >
                            {motor.costFactor}
                          </span>
                        </TableCell>
                        <TableCell>
                          {motor.recommended && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#DBEAFE] text-[#1E40AF] text-xs font-medium">
                              <CheckCircle2 className="w-3 h-3" />
                              Đề xuất
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Thông tin chi tiết động cơ đã chọn */}
              {selectedMotor && (
                <div className="mt-6 p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <h4 className="font-semibold text-[#0F172A] mb-3">
                    Thông Tin Chi Tiết: {motorOptions.find(m => m.id === selectedMotor)?.model}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[#64748B]">Kiểu động cơ:</p>
                      <p className="text-[#0F172A] font-medium">3 pha, không đồng bộ</p>
                    </div>
                    <div>
                      <p className="text-[#64748B]">Cấp bảo vệ:</p>
                      <p className="text-[#0F172A] font-medium">IP55</p>
                    </div>
                    <div>
                      <p className="text-[#64748B]">Cấp cách điện:</p>
                      <p className="text-[#0F172A] font-medium">F (155°C)</p>
                    </div>
                    <div>
                      <p className="text-[#64748B]">Phương thức làm mát:</p>
                      <p className="text-[#0F172A] font-medium">IC411 (Quạt gió)</p>
                    </div>
                    <div>
                      <p className="text-[#64748B]">Mômen khởi động:</p>
                      <p className="text-[#0F172A] font-medium">2.2 × M<sub>định mức</sub></p>
                    </div>
                    <div>
                      <p className="text-[#64748B]">Thời gian giao hàng:</p>
                      <p className="text-[#10B981] font-medium">Có sẵn trong kho</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
              Quay Lại
            </Button>
            <div className="flex gap-3">
              <Button variant="outline">
                So Sánh Chi Tiết
              </Button>
              <Button
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                onClick={onNext}
              >
                Xác Nhận & Tiếp Tục
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
