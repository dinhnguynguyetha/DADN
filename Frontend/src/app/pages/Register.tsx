import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AtSign, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username || !email || !password) {
      setError("Vui lòng điền đầy đủ thông tin đăng ký.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.detail || "Đăng ký thất bại. Vui lòng thử lại.");
        return;
      }

      setSuccess("Đăng ký thành công. Chuyển đến trang đăng nhập...");
      setTimeout(() => navigate("/login", { replace: true }), 1200);
    } catch (err) {
      setError("Lỗi kết nối tới máy chủ. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 border border-[#E2E8F0]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-[#3B82F6] flex items-center justify-center text-white">
            <User className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-semibold text-[#0F172A]">Đăng ký</h1>
          <p className="text-sm text-[#64748B] mt-2">Tạo tài khoản mới để bắt đầu sử dụng ứng dụng.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Tên người dùng</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tên hiển thị"
                className="pl-10"
              />
            </div>
          </div>

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
              placeholder="Ít nhất 6 ký tự"
            />
          </div>

          {error && <p className="text-sm text-[#DC2626]">{error}</p>}
          {success && <p className="text-sm text-[#16A34A]">{success}</p>}

          <Button type="submit" className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white">
            Tạo tài khoản
          </Button>
        </form>

        <p className="mt-6 text-sm text-[#64748B] text-center">
          Đã có tài khoản? <Link className="text-[#2563EB] font-semibold" to="/login">Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
}
