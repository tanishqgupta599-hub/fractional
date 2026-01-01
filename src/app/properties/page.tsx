"use client";

import PropertyCard from "@/components/PropertyCard";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, TrendingUp, Building2, Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { supabaseBrowser } from "@/lib/supabase";

export default function PropertiesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      const supabase = supabaseBrowser();
      const { data, error } = await supabase
        .from('properties')
        .select('*');
      
      if (error) {
        console.error('Error fetching properties:', error);
      } else {
        setProperties(data || []);
      }
      setLoading(false);
    }
    fetchProperties();
  }, []);

  const filteredProperties = activeFilter === "All" 
    ? properties 
    : properties.filter(p => p.category === activeFilter || p.type.includes(activeFilter));


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Filters */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
         
         <div className="container mx-auto px-4 md:px-6 relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="max-w-4xl mx-auto text-center mb-12"
           >
             <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
               Curated Investment <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE]">Opportunities</span>
             </h1>
             <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
               Exclusive access to high-growth land parcels in Gujarat's emerging corridors. 
               Verified titles, transparent valuation, and exceptional growth potential.
             </p>
             
             {/* Search Bar */}
             <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 max-w-xl mx-auto shadow-2xl">
               <Search className="h-5 w-5 text-gray-400 ml-4" />
               <input 
                 type="text" 
                 placeholder="Search by location or property name..." 
                 className="bg-transparent border-none outline-none text-white placeholder-gray-400 flex-1 px-4 py-2"
               />
               <Button className="rounded-full bg-[#D4AF37] text-black hover:bg-[#b3932d]">
                 Search
               </Button>
             </div>
           </motion.div>

           {/* Stats Row */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 pt-8">
             {[
               { icon: Building2, label: "Total Assets", value: "5+" },
               { icon: Wallet, label: "Avg Ticket", value: "₹5k" },
               { icon: TrendingUp, label: "Avg Returns", value: "18%" },
               { icon: MapPin, label: "Locations", value: "3 Cities" },
             ].map((stat, i) => (
               <div key={i} className="text-center">
                 <div className="flex justify-center mb-2 text-[#D4AF37]">
                   <stat.icon className="h-5 w-5" />
                 </div>
                 <div className="font-bold text-lg md:text-xl">{stat.value}</div>
                 <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
               </div>
             ))}
           </div>
         </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-black relative">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["All", "Residential", "Industrial", "Commercial"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter 
                    ? "bg-white text-black scale-105" 
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <PropertyCard property={{
                  id: property.slug || property.id,
                  name: property.name,
                  location: property.location,
                  type: property.type,
                  pricePerFraction: `₹${property.price_per_fraction}`,
                  totalValuation: `₹${(property.total_valuation / 100000).toFixed(1)} Lacs`,
                  expectedCagr: `${property.target_irr}%`,
                  risk: property.risk || "Medium",
                  status: property.status,
                  image: property.image_url || "https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop"
                }} />
              </motion.div>
            ))}
          </div>
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg">No properties found in this category.</p>
              <Button 
                variant="link" 
                className="text-[#D4AF37] mt-2"
                onClick={() => setActiveFilter("All")}
              >
                View all properties
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
