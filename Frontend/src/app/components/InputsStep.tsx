import { Calculator, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { useState } from "react";

interface InputsStepProps {
  onNext?: () => void;
}

export function InputsStep({ onNext }: InputsStepProps) {
  const [applicationType, setApplicationType] = useState("conveyor");
  const [workingHours, setWorkingHours] = useState("8");

  const handleNext = () => {
    console.log("Saving data...", { applicationType, workingHours });
    
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center">
              <Calculator className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl text-[#0F172A]">Bước 1: Nhập Thông Số Ban Đầu</h1>
          </div>
          <p className="text-[#64748B]">
            Nhập các thông số cơ bản của hệ thống truyền động cần thiết kế
          </p>
        </div>

        <div className="space-y-6">
          {/* Thông tin ứng dụng */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông Tin Ứng Dụng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Tên Dự Án</Label>
                  <Input
                    id="project-name"
                    placeholder="VD: Băng tải khai thác mỏ"
                    defaultValue="Băng tải sản xuất"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designer">Người Thiết Kế</Label>
                  <Input
                    id="designer"
                    placeholder="Nhập tên kỹ sư"
                    defaultValue="Nguyễn Văn A"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="app-type">Loại Ứng Dụng</Label>
                  <Select value={applicationType} onValueChange={setApplicationType}>
                    <SelectTrigger id="app-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conveyor">Băng tải</SelectItem>
                      <SelectItem value="mixer">Máy trộn</SelectItem>
                      <SelectItem value="crusher">Máy nghiền</SelectItem>
                      <SelectItem value="pump">Bơm thuỷ lực</SelectItem>
                      <SelectItem value="compressor">Máy nén khí</SelectItem>
                      <SelectItem value="fan">Quạt công nghiệp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="working-hours">Số Giờ Làm Việc/Ngày</Label>
                  <div className="relative">
                    <Input
                      id="working-hours"
                      value={workingHours}
                      onChange={(e) => setWorkingHours(e.target.value)}
                      className="pr-16"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                      giờ/ngày
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thông số tải trọng */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông Số Tải Trọng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="output-torque">Mô-men Xoắn Đầu Ra (T)</Label>
                  <div className="relative">
                    <Input
                      id="output-torque"
                      defaultValue="450"
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                      N·m
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="output-speed">Tốc Độ Đầu Ra (n₂)</Label>
                  <div className="relative">
                    <Input
                      id="output-speed"
                      defaultValue="414"
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                      vg/ph
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="design-life">Tuổi Thọ Thiết Kế</Label>
                  <div className="relative">
                    <Input
                      id="design-life"
                      defaultValue="20000"
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                      giờ
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Điều kiện làm việc */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Điều Kiện Làm Việc</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="load-type">Đặc Tính Tải</Label>
                  <Select defaultValue="moderate">
                    <SelectTrigger id="load-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uniform">Tải đều</SelectItem>
                      <SelectItem value="moderate">Tải vừa phải, va đập nhẹ</SelectItem>
                      <SelectItem value="heavy">Tải nặng, va đập mạnh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="environment">Môi Trường</Label>
                  <Select defaultValue="indoor">
                    <SelectTrigger id="environment">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indoor">Trong nhà, sạch</SelectItem>
                      <SelectItem value="dusty">Nhiều bụi</SelectItem>
                      <SelectItem value="outdoor">Ngoài trời</SelectItem>
                      <SelectItem value="corrosive">Ăn mòn cao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature">Nhiệt Độ Làm Việc</Label>
                  <div className="relative">
                    <Input
                      id="temperature"
                      defaultValue="40"
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                      °C
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Banner */}
              <div className="flex items-start gap-3 p-4 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg">
                <Info className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#92400E]">
                    Lưu ý về điều kiện làm việc
                  </p>
                  <p className="text-xs text-[#92400E] mt-1">
                    Điều kiện làm việc ảnh hưởng trực tiếp đến việc chọn hệ số an toàn và loại vật liệu. 
                    Môi trường khắc nghiệt cần hệ số an toàn cao hơn.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline">
              Đặt Lại
            </Button>
            <Button
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
              onClick={handleNext}
            >
              Lưu & Tiếp Tục
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
