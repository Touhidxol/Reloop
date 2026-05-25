import { useNavigate } from "react-router-dom";
import { Recycle, Zap, MapPin, TrendingUp, Leaf, ArrowRight, CheckCircle, Star } from "lucide-react";

const stats = [
  { value: "98K+", label: "Households joined" },
  { value: "12K+", label: "Active dealers" },
  { value: "2.4T", label: "Tonnes recycled" },
  { value: "₹4.2Cr", label: "Paid to residents" },
];

const features = [
  { icon: Zap, title: "AI Waste Classification", desc: "Upload a photo. Gemini Vision identifies your scrap type, recyclability, and fair market value — instantly.", color: "bg-violet-50 text-violet-600" },
  { icon: MapPin, title: "Geospatial Dealer Discovery", desc: "MongoDB 2dsphere indexing finds verified dealers nearest to you. Real distances, real-time availability.", color: "bg-blue-50 text-blue-600" },
  { icon: TrendingUp, title: "Competitive Bidding", desc: "Multiple dealers compete for your scrap. You pick the best offer — no middlemen, full transparency.", color: "bg-amber-50 text-amber-600" },
  { icon: Leaf, title: "Environmental Impact Tracking", desc: "Every pickup earns Eco Points. See exactly how much CO₂ you've saved and waste you've diverted from landfills.", color: "bg-emerald-50 text-emerald-600" },
];

const steps = [
  { num: "01", title: "Upload your scrap", desc: "Take a photo. AI does the rest." },
  { num: "02", title: "Receive dealer offers", desc: "Nearby dealers bid for your material." },
  { num: "03", title: "Accept & schedule pickup", desc: "Choose the best deal. Done." },
];

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Recycle size={15} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">EcoLoop</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate("/login")} className="btn-secondary">Sign in</button>
          <button onClick={() => navigate("/login")} className="btn-primary">Get started</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-medium mb-8 border border-emerald-100">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          AI-Powered Circular Economy Platform
        </div>

        <h1 className="font-display text-6xl md:text-7xl font-bold leading-[1.08] mb-6 text-gray-900 animate-fade-up">
          Your scrap is<br />
          <span className="text-emerald-500 italic">worth more</span> than<br />
          you think.
        </h1>

        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          EcoLoop connects households with verified recycling dealers through AI-driven waste classification, real-time bidding, and geospatial discovery.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <button onClick={() => navigate("/login")} className="btn-green flex items-center justify-center gap-2 text-base px-7 py-3">
            Start recycling <ArrowRight size={16} />
          </button>
          <button onClick={() => navigate("/login")} className="btn-secondary flex items-center justify-center gap-2 text-base px-7 py-3">
            Join as dealer
          </button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          {stats.map(({ value, label }) => (
            <div key={label} className="card text-left">
              <div className="font-display text-2xl font-bold text-gray-900 mb-0.5">{value}</div>
              <div className="text-gray-400 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">How it works</div>
            <h2 className="font-display text-4xl font-bold">Three steps to get paid</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="card">
                <div className="font-display text-4xl font-bold text-gray-100 mb-4">{num}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Platform features</div>
          <h2 className="font-display text-4xl font-bold">Built for the real world</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="card flex gap-4">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center shrink-0`}>
                <Icon size={18} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1.5">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto bg-gray-900 rounded-3xl p-12 text-center text-white">
          <h2 className="font-display text-4xl font-bold mb-3">Ready to close the loop?</h2>
          <p className="text-gray-400 mb-8 text-sm">Join thousands of households already earning from their waste.</p>
          <button onClick={() => navigate("/login")} className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-all text-sm">
            Create free account →
          </button>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-400 text-xs border-t border-gray-100">
        © 2024 EcoLoop — AI-Powered Smart Scrap Marketplace
      </footer>
    </div>
  );
}
