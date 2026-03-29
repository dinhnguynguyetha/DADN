import { Gauge, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "./ui/utils";
import { useState } from "react";

export function ShaftsBearings() {
  const [calculated, setCalculated] = useState(false);

  const shaftResults = [
    { parameter: "Đường kính trục ở bánh răng", value: "45", unit: "mm", status: "passed" },
    { parameter: "Đường kính trục ở ổ bi", value: "40", unit: "mm", status: "passed" },
    { parameter: "Ứng suất uốn (σ_u)", value: "38.5", unit: "MPa", status: "passed" },
    { parameter: "Ứng suất xoắn (τ)", value: "22.3", unit: "MPa", status: "passed" },
    { parameter: "Ứng suất tương đương (σ_td)", value: "52.7", unit: "MPa", status: "passed" },
    { parameter: "Hệ số an toàn", value: "2.85", unit: "-", status: "passed" },
  ];

  const bearingOptions = [
    {
      id: 1,
      code: "6208",
      type: "Bi đỡ cỡ trung",
      innerDia: "40",
      outerDia: "80",
      width: "18",
      dynamicLoad: "32.0",
      staticLoad: "17.6",
      lifespan: "28500",
      recommended: true,
    },
    {
      id: 2,
      code: "6308",
      type: "Bi đỡ cỡ nặng",
      innerDia: "40",
      outerDia: "90",
      width: "23",
      dynamicLoad: "48.0",
      staticLoad: "27.0",
      lifespan: "45200",
      recommended: false,
    },
    {
      id: 3,
      code: "N208",
      type: "Bi đũa trụ",
      innerDia: "40",
      outerDia: "80",
      width: "18",
      dynamicLoad: "38.5",
      staticLoad: "32.0",
      lifespan: "32100",
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
              <Gauge className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl text-[#0F172A]">Bước 4: Thiết Kế Trục & Chọn Ổ Bi</h1>
          </div>
          <p className="text-[#64748B]">
            Tính toán kích thước trục, kiểm tra độ bền và lựa chọn ổ bi phù hợp
          </p>
        </div>

        <Tabs defaultValue="shaft" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="shaft">Thiết Kế Trục</TabsTrigger>
            <TabsTrigger value="bearing">Chọn Ổ Bi</TabsTrigger>
          </TabsList>

          {/* Tab Thiết Kế Trục */}
          <TabsContent value="shaft" className="space-y-6">
            {/* Thông số trục */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông Số Trục Truyền Động</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="shaft-material">Vật Liệu Trục</Label>
                    <Select defaultValue="steel45">
                      <SelectTrigger id="shaft-material">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="steel45">Thép 45 (σ_ch = 600 MPa)</SelectItem>
                        <SelectItem value="steel40x">Thép 40X (σ_ch = 750 MPa)</SelectItem>
                        <SelectItem value="steel40xh">Thép 40XH (σ_ch = 850 MPa)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="torque">Mô-men Xoắn (T)</Label>
                    <div className="relative">
                      <Input
                        id="torque"
                        defaultValue="580"
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                        N·m
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shaft-length">Chiều Dài Trục</Label>
                    <div className="relative">
                      <Input
                        id="shaft-length"
                        defaultValue="420"
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                        mm
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="load-type">Loại Tải Trọng</Label>
                    <Select defaultValue="combined">
                      <SelectTrigger id="load-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="torsion">Chỉ xoắn</SelectItem>
                        <SelectItem value="bending">Chỉ uốn</SelectItem>
                        <SelectItem value="combined">Uốn và xoắn kết hợp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="surface-treatment">Xử Lý Bề Mặt</Label>
                    <Select defaultValue="none">
                      <SelectTrigger id="surface-treatment">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Không xử lý</SelectItem>
                        <SelectItem value="hardening">Tôi bề mặt</SelectItem>
                        <SelectItem value="nitriding">Thấm nitơ</SelectItem>
                        <SelectItem value="carburizing">Thấm cacbon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nút tính toán */}
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8"
                onClick={() => setCalculated(true)}
              >
                <Gauge className="w-4 h-4 mr-2" />
                Tính Toán Độ Bền Trục
              </Button>
              {calculated && (
                <span className="text-sm text-[#10B981] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Tính toán hoàn tất - Trục đạt yêu cầu
                </span>
              )}
            </div>

            {/* Kết quả tính toán */}
            {calculated && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Kết Quả Kiểm Tra Độ Bền</CardTitle>
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
                          {shaftResults.map((result, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{result.parameter}</TableCell>
                              <TableCell>{result.value}</TableCell>
                              <TableCell>{result.unit}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#D1FAE5] text-[#065F46] text-xs font-medium">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Đạt
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                {/* Sơ đồ phân bố ứng suất */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sơ Đồ Phân Bố Ứng Suất</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-[#F8FAFC] rounded-lg p-8 border border-[#E2E8F0]">
                      {/* Simplified shaft diagram */}
                      <div className="flex items-center justify-center gap-8">
                        <div className="text-center">
                          <div className="w-16 h-32 bg-[#64748B] rounded-md mx-auto mb-2"></div>
                          <p className="text-xs text-[#64748B]">Tiết diện A</p>
                          <p className="text-sm font-medium">Ø40 mm</p>
                        </div>
                        <div className="text-center">
                          <div className="w-20 h-32 bg-[#475569] rounded-md mx-auto mb-2"></div>
                          <p className="text-xs text-[#64748B]">Tiết diện B</p>
                          <p className="text-sm font-medium">Ø45 mm</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-32 bg-[#64748B] rounded-md mx-auto mb-2"></div>
                          <p className="text-xs text-[#64748B]">Tiết diện C</p>
                          <p className="text-sm font-medium">Ø40 mm</p>
                        </div>
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-[#64748B]">
                          * Sơ đồ minh họa - Xem báo cáo chi tiết để có bản vẽ kỹ thuật đầy đủ
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Tab Chọn Ổ Bi */}
          <TabsContent value="bearing" className="space-y-6">
            {/* Điều kiện làm việc */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Điều Kiện Làm Việc Ổ Bi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-[#64748B]">Tải Trọng Hướng Kính</p>
                    <p className="text-xl font-semibold text-[#0F172A]">3250 <span className="text-sm text-[#64748B]">N</span></p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-[#64748B]">Tải Trọng Hướng Trục</p>
                    <p className="text-xl font-semibold text-[#0F172A]">850 <span className="text-sm text-[#64748B]">N</span></p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-[#64748B]">Tốc Độ Quay</p>
                    <p className="text-xl font-semibold text-[#0F172A]">1480 <span className="text-sm text-[#64748B]">vg/ph</span></p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-[#64748B]">Tuổi Thọ Yêu Cầu</p>
                    <p className="text-xl font-semibold text-[#3B82F6]">25000 <span className="text-sm text-[#64748B]">giờ</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gợi ý */}
            <div className="flex items-start gap-3 p-4 bg-[#DBEAFE] border border-[#3B82F6] rounded-lg">
              <AlertCircle className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#1E3A8A]">
                  Gợi ý từ hệ thống
                </p>
                <p className="text-xs text-[#1E40AF] mt-1">
                  Dựa trên tải trọng và tốc độ, hệ thống đề xuất <strong>Ổ bi đỡ cỡ trung 6208</strong> 
                  với tuổi thọ tính toán 28,500 giờ, đáp ứng yêu cầu 25,000 giờ.
                </p>
              </div>
            </div>

            {/* Bảng chọn ổ bi */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Danh Sách Ổ Bi Phù Hợp</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-[#E2E8F0] overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#F8FAFC]">
                        <TableHead className="font-semibold text-[#0F172A]">Mã Hiệu</TableHead>
                        <TableHead className="font-semibold text-[#0F172A]">Loại</TableHead>
                        <TableHead className="font-semibold text-[#0F172A]">Ø Trong (mm)</TableHead>
                        <TableHead className="font-semibold text-[#0F172A]">Ø Ngoài (mm)</TableHead>
                        <TableHead className="font-semibold text-[#0F172A]">Rộng (mm)</TableHead>
                        <TableHead className="font-semibold text-[#0F172A]">C (kN)</TableHead>
                        <TableHead className="font-semibold text-[#0F172A]">C₀ (kN)</TableHead>
                        <TableHead className="font-semibold text-[#0F172A]">Tuổi thọ (h)</TableHead>
                        <TableHead className="font-semibold text-[#0F172A]">Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bearingOptions.map((bearing) => (
                        <TableRow
                          key={bearing.id}
                          className={cn(
                            bearing.recommended && "bg-[#EFF6FF] border-l-4 border-l-[#3B82F6]"
                          )}
                        >
                          <TableCell className="font-medium">{bearing.code}</TableCell>
                          <TableCell>{bearing.type}</TableCell>
                          <TableCell>{bearing.innerDia}</TableCell>
                          <TableCell>{bearing.outerDia}</TableCell>
                          <TableCell>{bearing.width}</TableCell>
                          <TableCell>{bearing.dynamicLoad}</TableCell>
                          <TableCell>{bearing.staticLoad}</TableCell>
                          <TableCell className={cn(
                            parseInt(bearing.lifespan) >= 25000 ? "text-[#10B981] font-semibold" : "text-[#F59E0B]"
                          )}>
                            {bearing.lifespan}
                          </TableCell>
                          <TableCell>
                            {bearing.recommended && (
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
              </CardContent>
            </Card>

            {/* Thông tin kỹ thuật */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông Tin Kỹ Thuật - Ổ Bi 6208</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="text-[#64748B] mb-1">Cấp chính xác:</p>
                    <p className="text-[#0F172A] font-medium">P0 (Tiêu chuẩn)</p>
                  </div>
                  <div>
                    <p className="text-[#64748B] mb-1">Khe hở:</p>
                    <p className="text-[#0F172A] font-medium">C0 (Bình thường)</p>
                  </div>
                  <div>
                    <p className="text-[#64748B] mb-1">Vật liệu lồng bi:</p>
                    <p className="text-[#0F172A] font-medium">Thép GCr15</p>
                  </div>
                  <div>
                    <p className="text-[#64748B] mb-1">Nhiệt độ làm việc:</p>
                    <p className="text-[#0F172A] font-medium">-20°C đến +120°C</p>
                  </div>
                  <div>
                    <p className="text-[#64748B] mb-1">Phương pháp bôi trơn:</p>
                    <p className="text-[#0F172A] font-medium">Mỡ hoặc dầu</p>
                  </div>
                  <div>
                    <p className="text-[#64748B] mb-1">Nhà sản xuất:</p>
                    <p className="text-[#10B981] font-medium">SKF / FAG / NSK</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <Button variant="outline">
            Quay Lại
          </Button>
          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
            Xác Nhận & Tiếp Tục
          </Button>
        </div>
      </div>
    </div>
  );
}
