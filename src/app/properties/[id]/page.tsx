import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight, MapPin, ShieldCheck, TrendingUp, Download, CheckCircle, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import GrowthChart from "@/components/GrowthChart";
import { createServerClient } from "@/lib/supabase-server";

const SAMPLE_PROPERTIES = [
  {
    id: 'otariya-phase-1',
    slug: 'otariya-phase-1',
    name: 'Otariya - Phase 1',
    location: 'TP 3A , Dholera, Gujarat',
    type: 'Residential Project',
    category: 'Residential',
    price_per_fraction: 5000,
    total_valuation: 4000000,
    target_irr: 100,
    risk: 'Medium',
    status: 'Open',
    image_url: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Residential Zone', 'Secure Title', 'Growth Corridor', 'Proximity to Infrastructure'],
    description: 'Residential project in the Otariya locality of Dholera with strong appreciation potential and secure title.'
  },
  {
    id: 'bavliyari-phase-1',
    slug: 'bavliyari-phase-1',
    name: 'Bavliyari Investment Zone',
    location: 'Bavliyari, Gujarat',
    type: 'Industrial Land',
    category: 'Industrial',
    price_per_fraction: 10000,
    total_valuation: 8500000,
    target_irr: 100,
    risk: 'Medium',
    status: 'Upcoming',
    image_url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1992&auto=format&fit=crop',
    highlights: ['Industrial Zone', 'Logistics Hub', 'High Demand', 'Strategic Location'],
    description: 'Industrial Land opportunity near key logistic corridors.'
  },
  {
    id: 'panchi-greens',
    slug: 'panchi-greens',
    name: 'Panchi Greens',
    location: 'Panchi, Gujarat',
    type: 'Ultra Premium Plotting',
    category: 'Residential',
    price_per_fraction: 2500,
    total_valuation: 2500000,
    target_irr: 93,
    risk: 'Medium',
    status: 'Upcoming',
    image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop',
    highlights: ['Premium Location', 'High Appreciation', 'Secure Title', 'Green Surroundings'],
    description: 'Ultra Premium Plotting opportunity in a rapidly developing area.'
  },
  {
    id: 'hebatpur-hac',
    slug: 'hebatpur-hac',
    name: 'Hebatpur HAC',
    location: 'Hebatpur, Ahmedabad',
    type: 'Premium Plotting',
    category: 'Residential',
    price_per_fraction: 25000,
    total_valuation: 25000000,
    target_irr: 106,
    risk: 'Low',
    status: 'Upcoming',
    image_url: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Prime City Location', 'Established Neighborhood', 'High Value Asset', 'Excellent Connectivity'],
    description: 'Premium Plotting in one of Ahmedabad\'s most sought-after locations.'
  },
  {
    id: 'zhanki-reserves',
    slug: 'zhanki-reserves',
    name: 'Zhanki Reserves',
    location: 'Zhanki, Gujarat',
    type: 'Future Development',
    category: 'Commercial',
    price_per_fraction: 7500,
    total_valuation: 6000000,
    target_irr: 88,
    risk: 'Medium',
    status: 'Upcoming',
    image_url: 'https://images.unsplash.com/photo-1513584685908-2274653dbf29?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Strategic Investment', 'Long-term Growth', 'Emerging Zone', 'Low Entry Point'],
    description: 'Future Development zone with massive long-term potential.'
  },
  {
    id: 'dholera-sir-phase-1',
    slug: 'dholera-sir-phase-1',
    name: 'Dholera SIR - Phase 1',
    location: 'TP 2 West, Dholera Special Investment Region, Gujarat',
    type: 'Commercial Zone',
    category: 'Commercial',
    price_per_fraction: 5000,
    total_valuation: 4000000,
    target_irr: 100,
    risk: 'Medium',
    status: 'Upcoming',
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Adjacent to 250m wide expressway', '2km from Tata Semiconductor Fab plant', 'International Airport operational by 2026', 'Complete underground infrastructure ready'],
    description: 'A prime resedential land parcel located in the heart of India\'s first Platinum Rated Green Field Smart City.'
  }
];

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let property = null;

  try {
    const supabase = await createServerClient();
    const { data, error: sbError } = await supabase
      .from('properties')
      .select('*')
      .eq('slug', id)
      .single();

    if (sbError) throw sbError;
    property = data;
  } catch (e) {
    console.error("Supabase error or not configured, using fallback:", e);
    property = SAMPLE_PROPERTIES.find(p => p.slug === id || p.id === id);
  }

  if (!property) {
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
             <Image
               src={property.image_url}
               alt={property.name}
               fill
               className="object-cover opacity-60"
               sizes="100vw"
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
                   <Image
                    src="/otariya-fp167-layout.jpg"
                    alt="Otariya Layout Plan"
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1200px) 100vw, 800px"
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
              
              {/* Growth Chart */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold text-gray-400">Projected Value Appreciation (5 Years)</h3>
                  <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                    * Projections only. Not guaranteed. Market dependent.
                  </span>
                </div>
                <GrowthChart />
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
