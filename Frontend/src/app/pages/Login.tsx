import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Lock, AtSign } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Email hoặc mật khẩu không hợp lệ.");
        return;
      }

      onLogin();
    } catch (err) {
      setError("Lỗi kết nối tới máy chủ. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 border border-[#E2E8F0]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-[#3B82F6] flex items-center justify-center text-white">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-semibold text-[#0F172A]">Đăng nhập</h1>
          <p className="text-sm text-[#64748B] mt-2">Đăng nhập để bắt đầu thiết kế hộp giảm tốc.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
            />
          </div>

          {error && <p className="text-sm text-[#DC2626]">{error}</p>}

          <Button type="submit" className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white">
            Đăng nhập
          </Button>
        </form>

        <p className="mt-6 text-sm text-[#64748B] text-center">
          Chưa có tài khoản? <Link className="text-[#2563EB] font-semibold" to="/register">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}
