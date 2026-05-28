import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Recycle, Mail, Lock, User, Eye, EyeOff, Building2 } from "lucide-react";

const Auth = () => {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("resident");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { login(role); navigate("/dashboard"); }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Recycle size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-xl">ReLoop</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-gray-400 text-sm">
            {mode === "login" ? "Sign in to your account" : "Join thousands of recyclers"}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          {/* Tab */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {["login", "register"].map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${mode === m ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}>{m === "login" ? "Sign in" : "Register"}</button>
            ))}
          </div>

          {/* Role */}
          <div className="mb-5">
            <p className="text-xs text-gray-400 font-medium mb-2">I am a</p>
            <div className="grid grid-cols-2 gap-2">
              {[{ value: "resident", label: "Resident", icon: User, desc: "I have scrap to sell" },
              { value: "dealer", label: "Dealer", icon: Building2, desc: "I buy scrap" }].map(({ value, label, icon: Icon, desc }) => (
                <button key={value} onClick={() => setRole(value)}
                  className={`p-3 rounded-xl border text-left transition-all ${role === value ? "border-emerald-400 bg-emerald-50" : "border-gray-200 hover:border-gray-300"
                    }`}>
                  <Icon size={14} className={role === value ? "text-emerald-600 mb-1" : "text-gray-400 mb-1"} />
                  <div className={`text-sm font-semibold ${role === value ? "text-emerald-700" : "text-gray-700"}`}>{label}</div>
                  <div className="text-xs text-gray-400">{desc}</div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "register" && (
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Full name" required className="input pl-10" />
              </div>
            )}
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" placeholder="Email" defaultValue="rahul@gmail.com" required className="input pl-10" />
            </div>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type={showPass ? "text" : "password"} placeholder="Password" defaultValue="••••••••" required className="input pl-10 pr-10" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            <button type="submit" disabled={loading}
              className="w-full btn-green mt-1 flex items-center justify-center gap-2 py-2.5 disabled:opacity-70">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</>
              ) : mode === "login" ? "Sign in to ReLoop" : "Create account"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-5">
            {mode === "login" ? "No account? " : "Already registered? "}
            <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-emerald-600 font-medium hover:underline">
              {mode === "login" ? "Register" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth
