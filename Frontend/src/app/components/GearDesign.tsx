import { useState } from "react";
import { AlertTriangle, FileText, FileSpreadsheet, Settings, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { cn } from "./ui/utils";

interface GearDesignProps {
  onNext?: () => void;
  onBack?: () => void;
}

export function GearDesign({ onNext, onBack }: GearDesignProps) {
  const [materialOverride, setMaterialOverride] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState("steel45");
  const [powerInput, setPowerInput] = useState("75");
  const [speedInput, setSpeedInput] = useState("1450");
  const [transmissionRatio, setTransmissionRatio] = useState("3.5");
  const [calculated, setCalculated] = useState(false);

  const materials = [
    { value: "steel45", label: "Thép 45 (HB 241-285, Giới hạn chảy: 580MPa)" },
    { value: "steel40x", label: "Thép 40X (HB 302-341, Giới hạn chảy: 785MPa)" },
    { value: "steel20crmnti", label: "Thép 20CrMnTi (HB 58-63 HRC, Giới hạn chảy: 835MPa)" },
    { value: "castiron", label: "Gang Xám GG-25 (HB 180-220, Giới hạn chảy: 250MPa)" },
  ];

  const calculatedParams = [
    { parameter: "Khoảng cách trục (a)", value: "180.5", unit: "mm", status: "passed" },
    { parameter: "Mô đun (m)", value: "3.0", unit: "mm", status: "passed" },
    { parameter: "Bề rộng bánh răng (b_w)", value: "45.0", unit: "mm", status: "passed" },
    { parameter: "Số răng bánh nhỏ (z1)", value: "24", unit: "-", status: "passed" },
    { parameter: "Số răng bánh lớn (z2)", value: "84", unit: "-", status: "passed" },
    { parameter: "Ứng suất uốn (σ_F)", value: "312.4", unit: "MPa", status: "passed" },
    { 
      parameter: "Ứng suất tiếp xúc (σ_H)", 
      value: "687.3", 
      unit: "MPa", 
      status: "failed",
      suggestion: "Không đạt yêu cầu. Đề xuất: Tăng bề rộng bánh răng (b_w) thêm 5mm hoặc nâng cấp vật liệu lên Thép 40X."
    },
    { parameter: "Hệ số an toàn (S_F)", value: "1.86", unit: "-", status: "passed" },
  ];

  const handleCalculate = () => {
    setCalculated(true);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl text-[#0F172A]">Bước 3: Thiết Kế & Kiểm Nghiệm Bánh Răng</h1>
          </div>
          <p className="text-[#64748B]">
            Cấu hình thông số bánh răng, chạy tính toán và kiểm tra tuân thủ thiết kế
          </p>
        </div>

        <div className="space-y-6">
          {/* Material Suggestion Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Gợi Ý Vật Liệu Thông Minh</span>
                <div className="flex items-center gap-2">
                  <Label htmlFor="material-override" className="text-sm text-[#64748B] font-normal">
                    Ghi đè/Chỉnh sửa
                  </Label>
                  <Switch
                    id="material-override"
                    checked={materialOverride}
                    onCheckedChange={setMaterialOverride}
                  />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!materialOverride ? (
                <div className="flex items-center gap-3 p-4 bg-[#DBEAFE] border border-[#3B82F6] rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#64748B] mb-1">Hệ thống đề xuất vật liệu:</p>
                    <p className="font-medium text-[#0F172A]">
                      Thép 45 (HB 241-285, Giới hạn chảy: 580MPa)
                    </p>
                    <p className="text-xs text-[#64748B] mt-1">
                      Tối ưu cho tải trọng trung bình và ứng dụng hộp giảm tốc tiêu chuẩn
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Label htmlFor="material-select">Chọn Vật Liệu Thay Thế</Label>
                  <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                    <SelectTrigger id="material-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((material) => (
                        <SelectItem key={material.value} value={material.value}>
                          {material.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-[#64748B]">
                    Lưu ý: Ghi đè vật liệu có thể ảnh hưởng đến kết quả tính toán và hệ số an toàn
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Input Parameters Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông Số Đầu Vào</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="power">Công suất (P)</Label>
                  <div className="relative">
                    <Input
                      id="power"
                      value={powerInput}
                      onChange={(e) => setPowerInput(e.target.value)}
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                      kW
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="speed">Tốc độ đầu vào (n₁)</Label>
                  <div className="relative">
                    <Input
                      id="speed"
                      value={speedInput}
                      onChange={(e) => setSpeedInput(e.target.value)}
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                      vg/ph
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ratio">Tỷ số truyền (i)</Label>
                  <div className="relative">
                    <Input
                      id="ratio"
                      value={transmissionRatio}
                      onChange={(e) => setTransmissionRatio(e.target.value)}
                      className={cn(
                        "pr-12",
                        parseFloat(transmissionRatio) < 1 && "border-[#EF4444] focus-visible:ring-[#EF4444]"
                      )}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                      -
                    </span>
                  </div>
                  {parseFloat(transmissionRatio) < 1 && (
                    <p className="text-xs text-[#EF4444] flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Giá trị phải là số và hợp lý (thường {">"} 1.0)
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calculation Action */}
          <div className="flex items-center gap-4">
            <Button
              size="lg"
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8"
              onClick={handleCalculate}
            >
              <Settings className="w-4 h-4 mr-2" />
              Chạy Tính Toán Tuần Tự
            </Button>
            {calculated && (
              <span className="text-sm text-[#10B981] flex items-center gap-1">
                <Check className="w-4 h-4" />
                Tính toán hoàn tất
              </span>
            )}
          </div>

          {/* Results Data Table */}
          {calculated && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông Số Tính Toán & Kiểm Nghiệm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-[#E2E8F0] overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#F8FAFC]">
                        <TableHead className="font-semibold text-[#0F172A]">Thông số</TableHead>
                        <TableHead className="font-semibold text-[#0F172A]">Giá trị</TableHead>
                        <TableHead className="font-semibold text-[#0F172A]">Đơn vị</TableHead>
                        <TableHead className="font-semibold text-[#0F172A]">Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calculatedParams.map((param, index) => (
                        <TableRow
                          key={index}
                          className={cn(
                            param.status === "failed" && "bg-[#FEE2E2]"
                          )}
                        >
                          <TableCell className={cn(
                            "font-medium",
                            param.status === "failed" && "text-[#991B1B]"
                          )}>
                            {param.parameter}
                          </TableCell>
                          <TableCell className={cn(
                            param.status === "failed" && "text-[#DC2626]"
                          )}>
                            {param.value}
                          </TableCell>
                          <TableCell>{param.unit}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {param.status === "passed" ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#D1FAE5] text-[#065F46] text-xs font-medium">
                                  <Check className="w-3 h-3" />
                                  Đạt
                                </span>
                              ) : (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex items-center gap-1">
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#FEE2E2] text-[#991B1B] text-xs font-medium">
                                          <AlertTriangle className="w-3 h-3" />
                                          Không đạt
                                        </span>
                                        <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="max-w-xs bg-[#0F172A] text-white p-3">
                                      <p className="text-sm font-medium mb-1">⚠️ Kiểm nghiệm thất bại</p>
                                      <p className="text-xs">{param.suggestion}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Export Action Bar */}
          {calculated && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tùy Chọn Xuất File</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button className="bg-[#0F172A] hover:bg-[#1E293B] text-white">
                    <FileText className="w-4 h-4 mr-2" />
                    Xuất Báo Cáo Đầy Đủ (PDF)
                  </Button>
                  <Button variant="outline" className="border-[#E2E8F0] hover:bg-[#F8FAFC]">
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Xuất Bảng Kê Vật Tư Sản Xuất (Excel)
                  </Button>
                </div>
                <p className="text-xs text-[#64748B] mt-3">
                  Báo cáo bao gồm tất cả phép tính, kết quả kiểm nghiệm và bản vẽ kỹ thuật
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onBack}>
              Quay Lại
            </Button>
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white" onClick={onNext}>
              Xác Nhận & Tiếp Tục
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}