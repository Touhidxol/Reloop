import { useAuth } from "../context/AuthContext";
import { monthlyData } from "../data/mockData";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { Leaf, TrendingUp, Recycle, TreePine, Droplets, Zap, Package } from "lucide-react";

const PIE_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#a855f7"];
const categoryBreakdown = [
  { name: "Paper",   value: 37, kg: 45 },
  { name: "Plastic", value: 30, kg: 36 },
  { name: "Metal",   value: 15, kg: 18 },
  { name: "E-Waste", value: 10, kg: 12 },
];
const impactCards = [
  { icon: TreePine,  label: "Trees Equivalent", value: "3.2",   unit: "trees saved",  color: "text-green-600",  bg: "bg-green-50"  },
  { icon: Droplets,  label: "Water Saved",       value: "1,240", unit: "litres",        color: "text-blue-600",   bg: "bg-blue-50"   },
  { icon: Zap,       label: "Energy Saved",       value: "87",    unit: "kWh",           color: "text-amber-600",  bg: "bg-amber-50"  },
  { icon: Package,   label: "Landfill Diverted",  value: "120",   unit: "kg",            color: "text-purple-600", bg: "bg-purple-50" },
];

const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-3 text-xs shadow-lg">
      <div className="text-gray-400 mb-1 font-medium">{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color }} className="font-semibold capitalize">
          {p.name}: {p.value}{p.name === "waste" || p.name === "co2" ? " kg" : " pts"}
        </div>
      ))}
    </div>
  );
};

export default function Sustainability() {
  const { user } = useAuth();
  const pts = user?.ecoStats?.ecoPoints || 0;
  const nextLevel = 300;
  const progress = Math.min((pts / nextLevel) * 100, 100);
  const level = pts >= 200 ? "Gold" : pts >= 100 ? "Silver" : "Bronze";
  const levelStyle = { Gold: "text-amber-500 bg-amber-50 border-amber-200", Silver: "text-slate-500 bg-slate-50 border-slate-200", Bronze: "text-orange-600 bg-orange-50 border-orange-200" };

  return (
    <div className="min-h-screen bg-gray-50 pt-14">
      <div className="max-w-6xl mx-auto px-5 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-0.5">Sustainability Dashboard</h1>
          <p className="text-gray-400 text-sm">Your environmental impact since joining EcoLoop</p>
        </div>

        {/* Eco Level */}
        <div className="card mb-6 flex items-center gap-5 border-emerald-100 bg-gradient-to-r from-emerald-50 to-white">
          <div className="text-4xl animate-float flex-shrink-0">🏆</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="font-display text-2xl font-bold text-gray-900">Eco {level}</span>
              <span className={`tag border font-semibold ${levelStyle[level]}`}>{pts} pts</span>
            </div>
            <p className="text-gray-400 text-sm mb-2">{nextLevel - pts} more points to reach Eco Platinum 🌟</p>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-emerald-600 text-3xl font-bold font-display">{Math.round(progress)}%</div>
            <div className="text-gray-400 text-xs">to next level</div>
          </div>
        </div>

        {/* Impact cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {impactCards.map(({ icon: Icon, label, value, unit, color, bg }) => (
            <div key={label} className="card text-center">
              <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <Icon size={17} className={color} />
              </div>
              <div className={`text-xl font-bold ${color} mb-0.5`}>{value}</div>
              <div className="text-gray-400 text-xs">{unit}</div>
              <div className="text-gray-300 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-5">
          {/* Area chart */}
          <div className="card md:col-span-2">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Waste Recycled Over Time (kg)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="waste" stroke="#10b981" fill="url(#wg)" strokeWidth={2} name="waste" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">By Category</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={categoryBreakdown} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={3} dataKey="value">
                  {categoryBreakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v, n, p) => [`${p.payload.kg} kg`, p.payload.name]}
                  contentStyle={{ borderRadius: 10, fontSize: 12, border: "1px solid #f3f4f6" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {categoryBreakdown.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                    <span className="text-gray-500">{item.name}</span>
                  </div>
                  <span className="text-gray-700 font-medium">{item.kg} kg</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm">CO₂ Saved & Eco Points per Month</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="co2"    fill="#3b82f6" radius={[4,4,0,0]} name="co2"    maxBarSize={24} />
              <Bar dataKey="points" fill="#10b981" radius={[4,4,0,0]} name="points" maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-5 mt-3 justify-center">
            {[{ color: "#3b82f6", label: "CO₂ Saved (kg)" }, { color: "#10b981", label: "Eco Points" }].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-gray-400">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
