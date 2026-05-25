export const mockUser = {
  name: "Rahul Sharma",
  email: "rahul@gmail.com",
  role: "resident",
  address: "Siliguri, West Bengal",
  ecoStats: { totalWasteRecycled: 120, ecoPoints: 250, co2Saved: 45 },
  rating: 4.5,
  totalReviews: 12,
};

export const mockListings = [
  { _id: "1", title: "Old Newspapers Bundle", category: "paper", estimatedWeight: 15, status: "open", description: "Stack of newspapers from last 3 months", createdAt: "Jan 15", offers: 3, aiAnalysis: { detectedCategory: "paper", recyclable: true, estimatedPrice: { min: 45, max: 75 }, confidenceScore: 0.94 } },
  { _id: "2", title: "Plastic Bottles (Mixed)", category: "plastic", estimatedWeight: 8, status: "negotiating", description: "Mixed plastic bottles, cleaned and sorted", createdAt: "Jan 18", offers: 5, aiAnalysis: { detectedCategory: "plastic", recyclable: true, estimatedPrice: { min: 120, max: 180 }, confidenceScore: 0.96 } },
  { _id: "3", title: "Old Copper Wires", category: "metal", estimatedWeight: 3, status: "completed", description: "Copper electrical wires from old appliances", createdAt: "Jan 10", offers: 7, aiAnalysis: { detectedCategory: "metal", recyclable: true, estimatedPrice: { min: 300, max: 450 }, confidenceScore: 0.91 } },
  { _id: "4", title: "Broken Laptop + Cables", category: "e-waste", estimatedWeight: 5, status: "open", description: "Old laptop, charger, and cables", createdAt: "Jan 20", offers: 2, aiAnalysis: { detectedCategory: "e-waste", recyclable: true, estimatedPrice: { min: 500, max: 800 }, confidenceScore: 0.88 } },
];

export const mockDealers = [
  { _id: "d1", name: "Green Scrap Traders", owner: "Amit Kumar", distance: 1.2, rating: 4.8, totalReviews: 156, categories: ["paper", "plastic", "metal"], verified: true, responseTime: "~15 min", address: "Hill Cart Road, Siliguri", totalTransactions: 342 },
  { _id: "d2", name: "EcoMetal Recyclers", owner: "Priya Singh", distance: 2.7, rating: 4.6, totalReviews: 89, categories: ["metal", "e-waste"], verified: true, responseTime: "~30 min", address: "Sevoke Road, Siliguri", totalTransactions: 198 },
  { _id: "d3", name: "City Waste Solutions", owner: "Ravi Patel", distance: 3.4, rating: 4.3, totalReviews: 67, categories: ["paper", "plastic", "e-waste"], verified: false, responseTime: "~1 hour", address: "Pradhan Nagar, Siliguri", totalTransactions: 124 },
  { _id: "d4", name: "NextGen Recycling Hub", owner: "Sunita Devi", distance: 4.1, rating: 4.9, totalReviews: 203, categories: ["paper", "plastic", "metal", "e-waste"], verified: true, responseTime: "~20 min", address: "Bagdogra, Siliguri", totalTransactions: 567 },
];

export const mockOffers = [
  { _id: "o1", listingId: "2", listingTitle: "Plastic Bottles (Mixed)", dealer: mockDealers[0], offeredPrice: 160, pricePerKg: 20, estimatedPickupTime: "Today Evening", message: "Can pick up within 2 hours. We pay the best rates!", status: "pending", createdAt: "Jan 18" },
  { _id: "o2", listingId: "2", listingTitle: "Plastic Bottles (Mixed)", dealer: mockDealers[3], offeredPrice: 175, pricePerKg: 22, estimatedPickupTime: "Tomorrow Morning", message: "Premium rates for quality sorted plastic.", status: "pending", createdAt: "Jan 18" },
  { _id: "o3", listingId: "1", listingTitle: "Old Newspapers Bundle", dealer: mockDealers[0], offeredPrice: 60, pricePerKg: 4, estimatedPickupTime: "Today", message: "Competitive rate. Same day pickup available.", status: "accepted", createdAt: "Jan 15" },
];

export const monthlyData = [
  { month: "Aug", waste: 30, co2: 12, points: 60 },
  { month: "Sep", waste: 45, co2: 18, points: 90 },
  { month: "Oct", waste: 38, co2: 15, points: 76 },
  { month: "Nov", waste: 62, co2: 25, points: 124 },
  { month: "Dec", waste: 55, co2: 22, points: 110 },
  { month: "Jan", waste: 80, co2: 32, points: 160 },
];

export const categoryMeta = {
  paper:   { label: "Paper",   icon: "📰", color: "bg-amber-50 text-amber-700 border-amber-200" },
  plastic: { label: "Plastic", icon: "🧴", color: "bg-blue-50 text-blue-700 border-blue-200" },
  metal:   { label: "Metal",   icon: "🔩", color: "bg-slate-50 text-slate-700 border-slate-200" },
  "e-waste":{ label: "E-Waste",icon: "💻", color: "bg-purple-50 text-purple-700 border-purple-200" },
};

export const statusMeta = {
  open:        { label: "Open",        color: "bg-green-50 text-green-700" },
  negotiating: { label: "Negotiating", color: "bg-yellow-50 text-yellow-700" },
  scheduled:   { label: "Scheduled",   color: "bg-blue-50 text-blue-700" },
  completed:   { label: "Completed",   color: "bg-gray-100 text-gray-500" },
  cancelled:   { label: "Cancelled",   color: "bg-red-50 text-red-600" },
};
