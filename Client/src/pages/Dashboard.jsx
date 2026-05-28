import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockListings, mockOffers, categoryMeta, statusMeta } from "../data/mockData";
import { Plus, Package, TrendingUp, Leaf, Star, ArrowRight, Clock, ChevronRight } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const pending = mockOffers.filter(o => o.status === "pending");

  const stats = [
    { label: "Waste Recycled", value: `${user?.ecoStats?.totalWasteRecycled} kg`, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Eco Points", value: user?.ecoStats?.ecoPoints, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "CO₂ Saved", value: `${user?.ecoStats?.co2Saved} kg`, icon: Leaf, color: "text-green-600", bg: "bg-green-50" },
    { label: "Your Rating", value: `${user?.rating} / 5`, icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-14">
      <div className="max-w-6xl mx-auto px-5 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-gray-400 text-sm mb-0.5">Good morning</p>
            <h1 className="font-display text-3xl font-bold text-gray-900">
              {user?.name?.split(" ")[0]} 👋
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">{user?.address}</p>
          </div>
          <button onClick={() => navigate("/listings")} className="btn-primary flex items-center gap-1.5">
            <Plus size={15} /> New listing
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="card">
              <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={17} className={color} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-0.5">{value}</div>
              <div className="text-gray-400 text-xs">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-5 gap-5">
          {/* Listings */}
          <div className="md:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Recent Listings</h2>
              <button onClick={() => navigate("/listings")} className="text-emerald-600 text-sm flex items-center gap-1 hover:underline">
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-2.5">
              {mockListings.slice(0, 3).map((l) => {
                const cat = categoryMeta[l.category];
                const st = statusMeta[l.status];
                return (
                  <div key={l._id} className="card flex items-center gap-4 cursor-pointer" onClick={() => navigate("/listings")}>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${cat.color.split(' ')[0]}`}>
                      {cat.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-medium text-gray-900 text-sm truncate">{l.title}</span>
                        <span className={`tag ${st.color} shrink-0`}>{st.label}</span>
                      </div>
                      <div className="text-gray-400 text-xs">{l.estimatedWeight}kg · {l.offers} offers · ₹{l.aiAnalysis.estimatedPrice.min}–{l.aiAnalysis.estimatedPrice.max}</div>
                    </div>
                    <ArrowRight size={14} className="text-gray-300 shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Offers */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Pending Offers</h2>
              <span className="tag bg-emerald-50 text-emerald-700">{pending.length} new</span>
            </div>
            <div className="space-y-2.5">
              {pending.map((o) => (
                <div key={o._id} className="card">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{o.dealer.name}</div>
                      <div className="text-gray-400 text-xs truncate">{o.listingTitle}</div>
                    </div>
                    <div className="text-emerald-600 font-bold text-lg">₹{o.offeredPrice}</div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                    <Clock size={11} /> {o.estimatedPickupTime}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1.5 text-xs bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-all">Accept</button>
                    <button className="flex-1 py-1.5 text-xs border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-all">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard
