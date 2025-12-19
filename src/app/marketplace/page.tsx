"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TrendingUp, TrendingDown, ArrowRight, Activity, Zap, DollarSign, Search, Filter, Tag, Flame } from "lucide-react";

// Mock Data for Listings
const initialListings = [
  {
    id: 1,
    property: "Dholera SIR - Phase 1",
    seller: "User_8492",
    quantity: 5,
    nav: 5000,
    askPrice: 4800,
    dealScore: 9.8,
    isHot: true,
  },
  {
    id: 2,
    property: "Hebatpur HAC",
    seller: "Investor_X",
    quantity: 10,
    nav: 25000,
    askPrice: 26500,
    dealScore: 7.2,
    isHot: false,
  },
  {
    id: 3,
    property: "Panchi Greens",
    seller: "EarlyBird_01",
    quantity: 20,
    nav: 2500,
    askPrice: 2200,
    dealScore: 9.5,
    isHot: true,
  },
  {
    id: 4,
    property: "Zhanki Reserves",
    seller: "Crypto_RealEstate",
    quantity: 8,
    nav: 7500,
    askPrice: 7500,
    dealScore: 8.0,
    isHot: false,
  },
];

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [listings, setListings] = useState(initialListings);
  
  // Sell Form State
  const [selectedProperty, setSelectedProperty] = useState("Dholera SIR - Phase 1");
  const [sellQuantity, setSellQuantity] = useState("");
  const [sellPrice, setSellPrice] = useState("");

  const handlePostListing = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing = {
      id: listings.length + 1,
      property: selectedProperty,
      seller: "You",
      quantity: Number(sellQuantity),
      nav: 5000, // Mock NAV based on property (simplified)
      askPrice: Number(sellPrice),
      dealScore: 8.5, // Mock calculation
      isHot: Number(sellPrice) < 5000,
    };
    setListings([newListing, ...listings]);
    setActiveTab("buy");
    // Reset form
    setSellQuantity("");
    setSellPrice("");
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 pb-24">
      {/* Header & Stats */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold flex items-center gap-1">
                <Activity className="h-3 w-3" /> Live Market
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Secondary Market</h1>
            <p className="text-gray-400 max-w-xl text-lg">
              Buy and sell fractional ownership instantly. Liquidity meets opportunity.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-right hidden md:block">
              <p className="text-xs text-gray-500 uppercase tracking-wider">24h Volume</p>
              <p className="text-2xl font-bold text-white">₹ 2.4 Cr</p>
            </div>
            <div className="text-right hidden md:block pl-6 border-l border-white/10">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Active Listings</p>
              <p className="text-2xl font-bold text-primary">142</p>
            </div>
          </div>
        </div>

        {/* Ticker Tape (Static Mock) */}
        <div className="w-full bg-white/5 border-y border-white/10 overflow-hidden py-3 mb-12">
          <div className="flex gap-8 whitespace-nowrap text-sm font-mono text-gray-400 animate-pulse">
            <span className="flex items-center gap-2">Dholera <span className="text-green-400">▲ 2.4%</span></span>
            <span className="flex items-center gap-2">Hebatpur <span className="text-green-400">▲ 1.1%</span></span>
            <span className="flex items-center gap-2">Panchi <span className="text-red-400">▼ 0.5%</span></span>
            <span className="flex items-center gap-2">Zhanki <span className="text-green-400">▲ 0.8%</span></span>
            <span className="flex items-center gap-2">Bavliyari <span className="text-gray-500">- 0.0%</span></span>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 p-1 rounded-full border border-white/10 flex">
            <button
              onClick={() => setActiveTab("buy")}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                activeTab === "buy" ? "bg-primary text-black shadow-lg shadow-primary/25" : "text-gray-400 hover:text-white"
              }`}
            >
              Buy Fractions
            </button>
            <button
              onClick={() => setActiveTab("sell")}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                activeTab === "sell" ? "bg-red-500 text-white shadow-lg shadow-red-500/25" : "text-gray-400 hover:text-white"
              }`}
            >
              Sell Holdings
            </button>
          </div>
        </div>

        {activeTab === "buy" ? (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-4 rounded-xl border border-white/5">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search properties..." 
                  className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-white/10 text-gray-400">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
                <Button variant="outline" size="sm" className="border-white/10 text-gray-400">
                  <Tag className="h-4 w-4 mr-2" /> Price: Low to High
                </Button>
              </div>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => {
                const discount = ((listing.nav - listing.askPrice) / listing.nav) * 100;
                const isDiscounted = discount > 0;
                
                return (
                  <Card key={listing.id} className="group overflow-hidden border-white/10 hover:border-primary/50 transition-colors">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-white text-lg group-hover:text-primary transition-colors">{listing.property}</h3>
                          <p className="text-xs text-gray-500">Seller: {listing.seller}</p>
                        </div>
                        {listing.isHot && (
                          <div className="bg-orange-500/20 text-orange-400 p-2 rounded-lg animate-pulse">
                            <Flame className="h-5 w-5" />
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/5 p-3 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Quantity</p>
                          <p className="font-mono text-white font-bold">{listing.quantity} Units</p>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Ask Price</p>
                          <p className="font-mono text-white font-bold">₹ {listing.askPrice.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <div className="text-xs">
                          <span className="text-gray-500">vs NAV: </span>
                          <span className={`font-bold ${isDiscounted ? "text-green-400" : "text-red-400"}`}>
                            {isDiscounted ? "-" : "+"}{Math.abs(discount).toFixed(1)}%
                          </span>
                        </div>
                        <div className="text-xs flex items-center gap-1">
                          <span className="text-gray-500">Deal Score:</span>
                          <span className={`font-bold px-2 py-0.5 rounded ${
                            listing.dealScore >= 9 ? "bg-green-500 text-black" : 
                            listing.dealScore >= 7 ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"
                          }`}>
                            {listing.dealScore}
                          </span>
                        </div>
                      </div>

                      <Button className="w-full group-hover:bg-primary group-hover:text-black">
                        Buy Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 border-white/10 bg-gradient-to-b from-card to-black/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">List Your Shares</h2>
                  <p className="text-gray-400">Create a listing on the secondary market.</p>
                </div>
              </div>

              <form onSubmit={handlePostListing} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select Asset</label>
                  <select 
                    value={selectedProperty}
                    onChange={(e) => setSelectedProperty(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500/50"
                  >
                    <option>Dholera SIR - Phase 1</option>
                    <option>Hebatpur HAC</option>
                    <option>Panchi Greens</option>
                    <option>Zhanki Reserves</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Available: 50 Units</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Quantity to Sell</label>
                    <input 
                      type="number" 
                      required
                      min="1"
                      max="50"
                      value={sellQuantity}
                      onChange={(e) => setSellQuantity(e.target.value)}
                      placeholder="Ex: 5"
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Ask Price (per unit)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                      <input 
                        type="number" 
                        required
                        value={sellPrice}
                        onChange={(e) => setSellPrice(e.target.value)}
                        placeholder="Ex: 5000"
                        className="w-full bg-black/50 border border-white/10 rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-red-500/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3">
                  <Zap className="h-5 w-5 text-yellow-500 shrink-0" />
                  <p className="text-sm text-yellow-200">
                    <strong>Pro Tip:</strong> Listing below NAV (Net Asset Value) increases your Deal Score and sells 3x faster.
                  </p>
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg">
                  Post Listing
                </Button>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
