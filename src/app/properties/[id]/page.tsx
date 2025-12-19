import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight, MapPin, ShieldCheck, TrendingUp, Download, CheckCircle, ImageIcon } from "lucide-react";
import Link from "next/link";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Mock Data Logic
  const isDholera = id === "dholera-sir-phase-1" || id === "dholera";
  
  const property = isDholera ? {
    name: "Dholera SIR - Phase 1",
    location: "TP 2 West, Dholera Special Investment Region, Gujarat",
    description: "A prime commercial land parcel located in the heart of India's first Platinum Rated Green Field Smart City. Dholera SIR is a dream project of the Govt. of India, strategically located near the Delhi-Mumbai Industrial Corridor (DMIC).",
    highlights: [
      "Adjacent to 250m wide expressway",
      "2km from Tata Semiconductor Fab plant",
      "International Airport operational by 2026",
      "Complete underground infrastructure ready"
    ],
    price: "₹5,000",
    totalValuation: "₹40 Lacs",
    targetIRR: "100%",
    fundingStatus: 65,
  } : {
    name: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    location: "Gujarat, India",
    description: "This is a premium investment opportunity with high growth potential. Located in a rapidly developing corridor.",
    highlights: ["Prime Location", "High Appreciation", "Secure Title", "Strategic Growth Zone"],
    price: "₹10,000",
    totalValuation: "₹85 Lacs",
    targetIRR: "95%",
    fundingStatus: 30,
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        {/* Placeholder for Hero Image */}
        <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
          <p className="text-white/20 text-4xl font-bold">Property Image Placeholder</p>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 z-20 container mx-auto px-4 md:px-6 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <div className="flex items-center gap-2 text-primary mb-2">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">{property.location}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{property.name}</h1>
              <div className="flex gap-4">
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-sm font-bold">
                  Open for Investment
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-sm font-bold">
                  Commercial Zone
                </span>
              </div>
            </div>
            
            <Card className="p-6 bg-black/80 backdrop-blur-xl border-primary/30 min-w-[300px]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Min Investment</span>
                <span className="text-2xl font-bold text-white">{property.price}</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full mb-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${property.fundingStatus}%` }}></div>
              </div>
              <p className="text-xs text-right text-gray-400 mb-6">{property.fundingStatus}% Funded</p>
              <Button className="w-full">Invest Now</Button>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">About the Opportunity</h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                {property.description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {property.highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/5">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Layout Image Section */}
            {(isDholera || property.name.includes("Dholera")) && (
              <section className="bg-card border border-white/10 rounded-2xl overflow-hidden group">
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
                  <h2 className="text-xl font-bold text-white">Master Plan Layout (Otariya)</h2>
                  <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                  </Button>
                </div>
                <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                   <img 
                    src="/otariya-fp167-layout.jpg" 
                    alt="Otariya Layout Plan" 
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
                   />
                </div>
              </section>
            )}

            {isDholera && (
              <section className="bg-gradient-to-r from-blue-900/20 to-transparent p-8 rounded-2xl border border-blue-500/20">
                <h2 className="text-2xl font-bold text-white mb-6">Why Dholera SIR?</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                      <TrendingUp className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Global Manufacturing Hub</h3>
                      <p className="text-gray-400 text-sm">
                        With Tata Electronics setting up India's first semiconductor fab, Dholera is poised to become a global electronics hub, driving massive demand for commercial and residential land.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                      <TrendingUp className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">World-Class Infrastructure</h3>
                      <p className="text-gray-400 text-sm">
                        Benchmarks against Singapore and Shanghai. Plug-and-play infrastructure with ICT enabled services.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Financials</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/5 text-center">
                  <p className="text-xs text-gray-500 mb-1">Asset Value</p>
                  <p className="text-xl font-bold text-white">{property.totalValuation}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 text-center">
                  <p className="text-xs text-gray-500 mb-1">Target CAGR</p>
                  <p className="text-xl font-bold text-green-400">{property.targetIRR}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 text-center">
                  <p className="text-xs text-gray-500 mb-1">Min Investment</p>
                  <p className="text-xl font-bold text-white">{property.price}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 text-center">
                  <p className="text-xs text-gray-500 mb-1">Lock-in Period</p>
                  <p className="text-xl font-bold text-white">1 Year</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Due Diligence
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-400">Title Search Report</span>
                  <span className="text-green-400 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Verified</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-400">Valuation Report</span>
                  <span className="text-green-400 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Verified</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-400">SPV Incorporation</span>
                  <span className="text-green-400 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Done</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <Button variant="outline" className="w-full text-xs h-9">
                  <Download className="mr-2 h-3 w-3" /> Download Documents
                </Button>
              </div>
            </Card>

            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
              <h3 className="text-lg font-bold text-white mb-2">Need help?</h3>
              <p className="text-sm text-gray-400 mb-4">
                Schedule a call with our investment expert to understand the Dholera opportunity.
              </p>
              <Button variant="outline" className="w-full">Book a Call</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
