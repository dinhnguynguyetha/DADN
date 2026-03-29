import { FileText, FileSpreadsheet, Download, Eye, CheckCircle2, Package, Calendar, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

export function ExportReports() {
  const projectSummary = {
    name: "Băng tải sản xuất",
    designer: "Nguyễn Văn A",
    date: "29/03/2026",
    status: "Hoàn tất",
  };

  const designResults = [
    { component: "Động cơ", value: "Y225M-4 (45 kW, 1480 vg/ph)" },
    { component: "Tỷ số truyền", value: "3.5" },
    { component: "Vật liệu bánh răng", value: "Thép 45 (HB 241-285)" },
    { component: "Khoảng cách trục", value: "180.5 mm" },
    { component: "Mô đun", value: "3.0 mm" },
    { component: "Vật liệu trục", value: "Thép 45 (σ_ch = 600 MPa)" },
    { component: "Đường kính trục", value: "Ø40-45 mm" },
    { component: "Ổ bi", value: "6208 (40×80×18)" },
  ];

  const exportOptions = [
    {
      id: 1,
      title: "Báo Cáo Kỹ Thuật Đầy Đủ",
      description: "Bao gồm tất cả phép tính, bản vẽ kỹ thuật, và bảng thông số",
      format: "PDF",
      icon: FileText,
      size: "~2.5 MB",
      color: "bg-[#EF4444]",
    },
    {
      id: 2,
      title: "Bảng Kê Vật Tư Sản Xuất",
      description: "Danh sách chi tiết linh kiện, vật liệu cần đặt hàng",
      format: "Excel",
      icon: FileSpreadsheet,
      size: "~150 KB",
      color: "bg-[#10B981]",
    },
    {
      id: 3,
      title: "Bản Vẽ Lắp Ráp 2D",
      description: "File CAD bản vẽ lắp ráp tổng thể hộp giảm tốc",
      format: "DWG",
      icon: Package,
      size: "~850 KB",
      color: "bg-[#3B82F6]",
    },
    {
      id: 4,
      title: "Tóm Tắt Dự Án",
      description: "Báo cáo ngắn gọn các thông số và kết quả chính",
      format: "PDF",
      icon: FileText,
      size: "~420 KB",
      color: "bg-[#F59E0B]",
    },
  ];

  const versionHistory = [
    { version: "v1.3", date: "29/03/2026 14:30", changes: "Hoàn thiện thiết kế, tất cả kiểm nghiệm đạt" },
    { version: "v1.2", date: "29/03/2026 11:15", changes: "Điều chỉnh bề rộng bánh răng, chọn ổ bi" },
    { version: "v1.1", date: "28/03/2026 16:45", changes: "Cập nhật vật liệu, tính toán lại trục" },
    { version: "v1.0", date: "28/03/2026 09:00", changes: "Khởi tạo dự án, nhập thông số ban đầu" },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl text-[#0F172A]">Bước 5: Xuất Báo Cáo & Hoàn Tất</h1>
          </div>
          <p className="text-[#64748B]">
            Xem lại tổng quan dự án và xuất các báo cáo kỹ thuật
          </p>
        </div>

        <div className="space-y-6">
          {/* Banner thành công */}
          <div className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-semibold">Thiết Kế Hoàn Tất!</h2>
                <p className="text-sm text-green-100">
                  Tất cả các kiểm nghiệm đã đạt yêu cầu. Hệ thống truyền động sẵn sàng để sản xuất.
                </p>
              </div>
            </div>
          </div>

          {/* Tổng quan dự án */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tổng Quan Dự Án</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#DBEAFE] flex items-center justify-center">
                    <Package className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Tên Dự Án</p>
                    <p className="font-medium text-[#0F172A]">{projectSummary.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] flex items-center justify-center">
                    <User className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Người Thiết Kế</p>
                    <p className="font-medium text-[#0F172A]">{projectSummary.designer}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E0E7FF] flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#6366F1]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Ngày Hoàn Thành</p>
                    <p className="font-medium text-[#0F172A]">{projectSummary.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#D1FAE5] flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Trạng Thái</p>
                    <Badge className="bg-[#10B981] hover:bg-[#059669]">{projectSummary.status}</Badge>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h4 className="font-semibold text-[#0F172A] mb-4">Kết Quả Thiết Kế</h4>
                <div className="grid grid-cols-2 gap-4">
                  {designResults.map((result, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2" />
                      <div className="flex-1">
                        <p className="text-xs text-[#64748B]">{result.component}</p>
                        <p className="text-sm font-medium text-[#0F172A]">{result.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tùy chọn xuất file */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Xuất Tài Liệu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {exportOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div
                      key={option.id}
                      className="p-4 border border-[#E2E8F0] rounded-lg hover:border-[#3B82F6] hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 ${option.color} rounded-lg flex items-center justify-center shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#0F172A] mb-1">{option.title}</h4>
                          <p className="text-xs text-[#64748B] mb-2">{option.description}</p>
                          <div className="flex items-center gap-2 text-xs text-[#64748B]">
                            <Badge variant="outline" className="text-xs">{option.format}</Badge>
                            <span>•</span>
                            <span>{option.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          Xem trước
                        </Button>
                        <Button size="sm" className="flex-1 bg-[#3B82F6] hover:bg-[#2563EB] text-white">
                          <Download className="w-3 h-3 mr-1" />
                          Tải xuống
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg">
                <p className="text-sm text-[#92400E]">
                  <strong>Lưu ý:</strong> Tất cả báo cáo được tạo tự động dựa trên kết quả tính toán. 
                  Vui lòng kiểm tra kỹ trước khi gửi cho phòng sản xuất.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Lịch sử phiên bản */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lịch Sử Phiên Bản</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {versionHistory.map((version, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b border-[#E2E8F0] last:border-0 last:pb-0">
                    <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] shrink-0">
                      <span className="text-sm font-semibold text-[#0F172A]">{version.version}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-[#0F172A]">{version.changes}</p>
                        {index === 0 && (
                          <Badge className="bg-[#10B981] hover:bg-[#059669] text-xs">Mới nhất</Badge>
                        )}
                      </div>
                      <p className="text-xs text-[#64748B]">{version.date}</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="w-3 h-3 mr-1" />
                      Khôi phục
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-[#E2E8F0]">
            <Button variant="outline">
              Quay Lại
            </Button>
            <div className="flex gap-3">
              <Button variant="outline">
                Lưu Dự Án
              </Button>
              <Button className="bg-[#10B981] hover:bg-[#059669] text-white px-8">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Hoàn Tất & Đóng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
