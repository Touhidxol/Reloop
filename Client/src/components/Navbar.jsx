import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Recycle, Bell, LogOut, LayoutDashboard, List, Users, BarChart3 } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (p) => location.pathname === p;

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/listings",  label: "My Listings", icon: List },
    { to: "/dealers",   label: "Dealers",     icon: Users },
    { to: "/sustainability", label: "Eco Stats", icon: BarChart3 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Recycle size={15} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-lg text-gray-900 tracking-tight">EcoLoop</span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {links.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
              isActive(to) ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}>
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          </button>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-gray-100 bg-gray-50">
            <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-xs font-bold text-emerald-700">
              {user?.name?.[0]}
            </div>
            <span className="text-sm text-gray-700 font-medium hidden sm:block">{user?.name?.split(" ")[0]}</span>
          </div>
          <button onClick={() => { logout(); navigate("/"); }} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </nav>
  );
}
