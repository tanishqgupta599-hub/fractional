import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight, MapPin, ShieldCheck, TrendingUp, Download, CheckCircle, ImageIcon } from "lucide-react";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase-server";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', id)
    .single();

  if (error || !property) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Property Not Found</h1>
          <p className="text-gray-400">The property you are looking for does not exist or has been removed.</p>
          <Link href="/properties">
            <Button className="mt-6">Back to Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Helper to format currency
  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lacs`;
    return `₹${val.toLocaleString()}`;
  };

  // Check if Dholera for specific layout section
  const isDholera = property.name.includes("Dholera") || property.slug.includes("dholera");

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        
        {property.image_url ? (
          <div className="absolute inset-0">
             <img 
               src={property.image_url} 
               alt={property.name}
               className="w-full h-full object-cover opacity-60"
             />
          </div>
        ) : (
          <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
            <p className="text-white/20 text-4xl font-bold">Property Image Placeholder</p>
          </div>
        )}
        
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
                  {property.status}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-sm font-bold">
                  {property.type}
                </span>
              </div>
            </div>
            
            <Card className="p-6 bg-black/80 backdrop-blur-xl border-primary/30 min-w-[300px]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Min Investment</span>
                <span className="text-2xl font-bold text-white">₹{property.price_per_fraction}</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full mb-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${property.funding_status}%` }}></div>
              </div>
              <p className="text-xs text-right text-gray-400 mb-6">{property.funding_status}% Funded</p>
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
                {property.highlights && property.highlights.map((item: string, i: number) => (
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
              <h2 className="text-2xl font-bold text-white mb-6">Financials & Growth Projection</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-white/5 text-center">
                  <p className="text-xs text-gray-500 mb-1">Asset Value</p>
                  <p className="text-xl font-bold text-white">{formatCurrency(property.total_valuation)}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 text-center">
                  <p className="text-xs text-gray-500 mb-1">Target CAGR</p>
                  <p className="text-xl font-bold text-green-400">{property.target_irr}%</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 text-center">
                  <p className="text-xs text-gray-500 mb-1">Min Investment</p>
                  <p className="text-xl font-bold text-white">{formatCurrency(property.price_per_fraction)}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 text-center">
                  <p className="text-xs text-gray-500 mb-1">Lock-in Period</p>
                  <p className="text-xl font-bold text-white">1 Year</p>
                </div>
              </div>
              
              {/* Simple CSS Growth Chart */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <h3 className="text-sm font-semibold text-gray-400 mb-6">Projected Value Appreciation (5 Years)</h3>
                <div className="flex items-end justify-between gap-4 h-48">
                  {[1, 1.2, 1.5, 1.9, 2.4].map((multiplier, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {Math.round(multiplier * 100)}%
                      </div>
                      <div 
                        className="w-full bg-gradient-to-t from-primary/20 to-primary/60 rounded-t-md relative overflow-hidden group-hover:from-primary/40 group-hover:to-primary/80 transition-colors"
                        style={{ height: `${(multiplier / 2.5) * 100}%` }}
                      >
                         <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
                      </div>
                      <div className="text-xs text-gray-500">Year {i + 1}</div>
                    </div>
                  ))}
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
