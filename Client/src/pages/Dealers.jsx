import { useState } from "react";
import { mockDealers, mockOffers } from "../data/mockData";
import { MapPin, Star, Shield, Clock, ChevronRight, Send, X, CheckCircle } from "lucide-react";

const catChip = {
  paper:    "bg-amber-50 text-amber-700 border-amber-200",
  plastic:  "bg-blue-50 text-blue-700 border-blue-200",
  metal:    "bg-slate-100 text-slate-600 border-slate-200",
  "e-waste":"bg-purple-50 text-purple-700 border-purple-200",
};

function OfferModal({ dealer, onClose }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md border border-gray-100"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Request an Offer</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg"><X size={15} className="text-gray-400" /></button>
        </div>
        {sent ? (
          <div className="p-10 text-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={24} className="text-emerald-500" />
            </div>
            <div className="font-semibold text-gray-900 mb-1">Request sent!</div>
            <div className="text-gray-400 text-sm">{dealer.name} will respond in {dealer.responseTime}</div>
          </div>
        ) : (
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center text-base">🏪</div>
              <div>
                <div className="font-medium text-gray-900 text-sm">{dealer.name}</div>
                <div className="text-gray-400 text-xs">{dealer.distance} km · ⭐ {dealer.rating} · {dealer.responseTime}</div>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">Select Listing</label>
              <select className="input">
                <option>Plastic Bottles (Mixed) — 8 kg</option>
                <option>Old Newspapers Bundle — 15 kg</option>
                <option>Broken Laptop + Cables — 5 kg</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">Your Expected Price (₹)</label>
              <input type="number" placeholder="e.g. 200" className="input" />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">Message (optional)</label>
              <textarea rows={2} placeholder="Any special instructions..." className="input resize-none" />
            </div>
            <button onClick={() => setSent(true)} className="w-full btn-primary flex items-center justify-center gap-2">
              <Send size={14} /> Send Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dealers() {
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [radius, setRadius] = useState(10);
  const filtered = mockDealers.filter(d => d.distance <= radius);

  return (
    <div className="min-h-screen bg-gray-50 pt-14">
      <div className="max-w-5xl mx-auto px-5 py-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">Nearby Dealers</h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <MapPin size={13} className="text-emerald-500" />
            Siliguri, West Bengal
            <span className="tag bg-emerald-50 text-emerald-700 border border-emerald-200 ml-1">
              MongoDB 2dsphere index
            </span>
          </div>
        </div>

        {/* Radius control */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Search radius</span>
            <span className="text-emerald-600 font-bold text-sm">{radius} km</span>
          </div>
          <input type="range" min={2} max={10} value={radius}
            onChange={e => setRadius(Number(e.target.value))}
            className="w-full accent-emerald-500 mb-2" />
          <div className="flex justify-between text-xs text-gray-300">
            <span>2 km</span><span>10 km</span>
          </div>
          <p className="text-gray-400 text-xs mt-2">
            Found <span className="text-emerald-600 font-semibold">{filtered.length}</span> dealers via{" "}
            <code className="bg-gray-100 text-gray-600 px-1 py-0.5 rounded text-xs">$near</code> geospatial query
          </p>
        </div>

        {/* Map placeholder */}
        <div className="card mb-6 h-36 flex items-center justify-center bg-gray-50 border-dashed relative overflow-hidden">
          <div className="text-center">
            <div className="text-3xl mb-1">🗺️</div>
            <div className="text-gray-500 text-sm font-medium">Interactive Map</div>
            <div className="text-gray-300 text-xs">Mapbox — dealer pins with real-time distance</div>
          </div>
          {filtered.map((d, i) => (
            <div key={d._id} className="absolute w-3 h-3 bg-emerald-500 rounded-full shadow-sm border-2 border-white animate-pulse"
              style={{ left: `${18 + i * 20}%`, top: `${28 + (i % 2) * 38}%` }} />
          ))}
        </div>

        {/* Dealer cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {filtered.map((dealer) => (
            <div key={dealer._id} className="card hover:border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="font-semibold text-gray-900">{dealer.name}</h3>
                    {dealer.verified && <Shield size={13} className="text-emerald-500" title="Verified" />}
                  </div>
                  <p className="text-gray-400 text-sm">{dealer.owner}</p>
                </div>
                <div className="text-right">
                  <div className="text-emerald-600 font-bold">{dealer.distance} km</div>
                  <div className="text-gray-300 text-xs">away</div>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3 text-sm">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={12} fill="currentColor" />
                  <span className="font-medium text-gray-800">{dealer.rating}</span>
                  <span className="text-gray-400 text-xs">({dealer.totalReviews})</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <Clock size={11} />{dealer.responseTime}
                </div>
                <div className="text-gray-300 text-xs">{dealer.totalTransactions} trades</div>
              </div>

              <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                <MapPin size={11} />{dealer.address}
              </div>

              <div className="flex gap-1.5 flex-wrap mb-4">
                {dealer.categories.map(c => (
                  <span key={c} className={`tag border capitalize ${catChip[c]}`}>{c}</span>
                ))}
              </div>

              <button onClick={() => setSelectedDealer(dealer)}
                className="w-full py-2 text-sm bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-all flex items-center justify-center gap-2 font-medium">
                Request Offer <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Offers received */}
        <h2 className="font-semibold text-gray-900 mb-4">Offers Received</h2>
        <div className="space-y-2.5">
          {mockOffers.map((offer) => (
            <div key={offer._id} className="card flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-lg flex-shrink-0">🏪</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-sm">{offer.dealer.name}</div>
                <div className="text-gray-400 text-xs">{offer.listingTitle} · {offer.estimatedPickupTime}</div>
                <div className="text-gray-300 text-xs italic truncate mt-0.5">"{offer.message}"</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-emerald-600 font-bold text-lg">₹{offer.offeredPrice}</div>
                <div className="text-gray-300 text-xs">₹{offer.pricePerKg}/kg</div>
                {offer.status === "pending" ? (
                  <div className="flex gap-1 mt-1">
                    <button className="text-xs px-2.5 py-1 bg-gray-900 text-white rounded-lg font-medium">Accept</button>
                    <button className="text-xs px-2.5 py-1 border border-gray-200 text-gray-500 rounded-lg">Reject</button>
                  </div>
                ) : (
                  <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">Accepted ✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedDealer && <OfferModal dealer={selectedDealer} onClose={() => setSelectedDealer(null)} />}
    </div>
  );
}
