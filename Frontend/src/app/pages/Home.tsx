import { ArrowRight, CheckCircle2, Layers } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

interface HomeProps {
  onStart: () => void;
  onLogout: () => void;
}

export function Home({ onStart, onLogout }: HomeProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#2563EB]">NỀN TẢNG THIẾT KẾ CƠ KHÍ</p>
              <h1 className="mt-3 text-3xl font-semibold text-[#0F172A]">Chào mừng trở lại!</h1>
              <p className="mt-4 text-sm text-[#64748B] max-w-2xl">
                Tạo và xuất báo cáo thiết kế hộp giảm tốc nhanh chóng với hệ thống wizard 5 bước.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white" onClick={onStart}>
                Bắt đầu thiết kế
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={onLogout}>
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Nhập thông số", description: "Khởi tạo dự án & điều kiện tải", icon: Layers },
            { title: "Chọn động cơ", description: "Chọn động cơ phù hợp theo công suất", icon: CheckCircle2 },
            { title: "Xuất báo cáo", description: "Tạo file PDF/Excel hoàn chỉnh", icon: ArrowRight },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="border-[#E2E8F0]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#4338CA]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#64748B]">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
