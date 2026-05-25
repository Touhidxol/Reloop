import { useState, useRef } from "react";
import { mockListings, categoryMeta, statusMeta } from "../data/mockData";
import { Plus, X, Upload, Cpu, CheckCircle, Package, ArrowRight, Filter } from "lucide-react";

const AI_RESULTS = {
  plastic: { detectedCategory: "plastic", recyclable: true, estimatedPrice: { min: 120, max: 180 }, confidenceScore: 0.96, detectedObjects: ["plastic bottle", "HDPE container"], co2Saved: 2.5 },
  paper:   { detectedCategory: "paper",   recyclable: true, estimatedPrice: { min: 40,  max: 70  }, confidenceScore: 0.93, detectedObjects: ["newspaper", "cardboard"],         co2Saved: 1.2 },
  metal:   { detectedCategory: "metal",   recyclable: true, estimatedPrice: { min: 280, max: 420 }, confidenceScore: 0.91, detectedObjects: ["copper wire", "aluminium sheet"], co2Saved: 3.8 },
  "e-waste":{ detectedCategory: "e-waste",recyclable: true, estimatedPrice: { min: 500, max: 800 }, confidenceScore: 0.88, detectedObjects: ["laptop", "circuit board"],        co2Saved: 5.1 },
};

function AIResultCard({ result }) {
  const cat = categoryMeta[result.detectedCategory];
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 animate-fade-up">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Cpu size={15} className="text-emerald-600" />
          <span className="text-emerald-700 font-semibold text-sm">AI Analysis Complete</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
          <CheckCircle size={13} />
          {Math.round(result.confidenceScore * 100)}% confidence
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {[
          { label: "Category",    value: <span className="capitalize font-semibold">{result.detectedCategory}</span> },
          { label: "Recyclable",  value: <span className="text-emerald-600 font-semibold">✓ Yes</span> },
          { label: "Est. Value",  value: <span className="font-semibold">₹{result.estimatedPrice.min}–{result.estimatedPrice.max}</span> },
          { label: "CO₂ Saved",   value: <span className="text-green-700 font-semibold">{result.co2Saved} kg</span> },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-lg p-2.5 border border-emerald-100">
            <div className="text-gray-400 text-xs mb-0.5">{label}</div>
            <div className="text-gray-900 text-sm">{value}</div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 mb-1.5">Detected objects:</div>
      <div className="flex gap-1.5 flex-wrap">
        {result.detectedObjects.map(obj => (
          <span key={obj} className={`tag border ${cat.color}`}>{obj}</span>
        ))}
      </div>
      <div className="text-xs text-gray-300 mt-2 text-right">Powered by Gemini Vision API</div>
    </div>
  );
}

function NewListingModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [category, setCategory] = useState("plastic");
  const fileRef = useRef();

  const handleAnalyze = () => {
    setStep(2);
    setTimeout(() => { setAiResult(AI_RESULTS[category]); setStep(3); }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-100"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
        <div className="p-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
          <h2 className="font-semibold text-gray-900">New Scrap Listing</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-all">
            <X size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {step === 2 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-[3px] border-emerald-100 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
              <div className="text-gray-900 font-semibold mb-1">Analyzing with AI...</div>
              <div className="text-gray-400 text-sm mb-4">Gemini Vision API processing image</div>
              <div className="space-y-1 text-xs text-gray-300">
                <div>⚡ Detecting object types...</div>
                <div>⚡ Estimating recyclability...</div>
                <div>⚡ Calculating market value...</div>
              </div>
            </div>
          ) : (
            <>
              <div>
                <label className="text-xs text-gray-400 font-medium uppercase tracking-wider block mb-1.5">Title</label>
                <input type="text" placeholder="e.g. Old Newspapers Bundle" className="input" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 font-medium uppercase tracking-wider block mb-1.5">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="input">
                    <option value="plastic">Plastic</option>
                    <option value="paper">Paper</option>
                    <option value="metal">Metal</option>
                    <option value="e-waste">E-Waste</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-medium uppercase tracking-wider block mb-1.5">Weight (kg)</label>
                  <input type="number" placeholder="15" className="input" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 font-medium uppercase tracking-wider block mb-1.5">Description</label>
                <textarea rows={2} placeholder="Brief description..." className="input resize-none" />
              </div>
              <div>
                <label className="text-xs text-gray-400 font-medium uppercase tracking-wider block mb-1.5">Photo</label>
                <div onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-emerald-300 hover:bg-emerald-50/50 transition-all">
                  {preview
                    ? <img src={preview} alt="preview" className="max-h-28 mx-auto rounded-lg object-cover" />
                    : <>
                        <Upload size={20} className="text-gray-300 mx-auto mb-2" />
                        <div className="text-gray-400 text-sm">Click to upload scrap photo</div>
                        <div className="text-gray-300 text-xs mt-0.5">AI will auto-detect category & price</div>
                      </>
                  }
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={e => { const f = e.target.files[0]; if (f) setPreview(URL.createObjectURL(f)); }} />
              </div>

              {step === 3 && aiResult && <AIResultCard result={aiResult} />}

              <div className="flex gap-2 pt-1">
                {step === 1 && (
                  <button onClick={handleAnalyze} className="flex-1 btn-green flex items-center justify-center gap-2">
                    <Cpu size={15} /> Analyse with AI
                  </button>
                )}
                {step === 3 && (
                  <button onClick={onClose} className="flex-1 btn-primary flex items-center justify-center gap-2">
                    <Package size={15} /> Post Listing
                  </button>
                )}
                <button onClick={onClose} className="btn-secondary">Cancel</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Listings() {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? mockListings : mockListings.filter(l => l.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 pt-14">
      <div className="max-w-5xl mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900">My Listings</h1>
            <p className="text-gray-400 text-sm mt-0.5">{mockListings.length} total listings</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-1.5">
            <Plus size={15} /> New listing
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["all","open","negotiating","completed"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all border ${
                filter === f
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
              }`}>{f}</button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((listing) => {
            const cat = categoryMeta[listing.category];
            const st = statusMeta[listing.status];
            return (
              <div key={listing._id} className="card group">
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border ${cat.color}`}>
                    {cat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="font-semibold text-gray-900">{listing.title}</span>
                      <span className={`tag ${st.color}`}>{st.label}</span>
                    </div>
                    <p className="text-gray-400 text-sm truncate">{listing.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: "Weight",    value: `${listing.estimatedWeight} kg` },
                    { label: "Offers",    value: listing.offers },
                    { label: "Est. Value", value: `₹${listing.aiAnalysis.estimatedPrice.min}+` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-gray-50 rounded-xl p-2.5 text-center border border-gray-100">
                      <div className="font-semibold text-gray-900 text-sm">{value}</div>
                      <div className="text-gray-400 text-xs">{label}</div>
                    </div>
                  ))}
                </div>

                <div className={`flex items-center gap-2 text-xs p-2.5 rounded-lg border ${cat.color} mb-3`}>
                  <Cpu size={12} />
                  <span>AI: {cat.label} · {Math.round(listing.aiAnalysis.confidenceScore * 100)}% confidence · Recyclable ✓</span>
                </div>

                {listing.status === "open" && (
                  <button className="w-full py-2 text-sm bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 border border-emerald-200 transition-all flex items-center justify-center gap-2 font-medium">
                    View {listing.offers} offers <ArrowRight size={13} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {showModal && <NewListingModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
