import PropertyCard from "@/components/PropertyCard";

export default function PropertiesPage() {
  const properties = [
    {
      id: "dholera-sir-phase-1",
      name: "Dholera SIR - Phase 1",
      location: "TP 2 West, Dholera, Gujarat",
      type: "Commercial Land",
      pricePerFraction: "₹5,000",
      totalValuation: "₹40 Lacs",
      expectedCagr: "100%",
      risk: "Medium" as const,
      status: "Open" as const,
      image: "",
    },
    {
      id: "bavliyari-phase-1",
      name: "Bavliyari Investment Zone",
      location: "Bavliyari, Gujarat",
      type: "Industrial Land",
      pricePerFraction: "₹10,000",
      totalValuation: "₹85 Lacs",
      expectedCagr: "100%",
      risk: "High" as const,
      status: "Coming Soon" as const,
      image: "",
    },
    {
      id: "panchi-greens",
      name: "Panchi Greens",
      location: "Panchi, Gujarat",
      type: "Agricultural Land",
      pricePerFraction: "₹2,500",
      totalValuation: "₹25 Lacs",
      expectedCagr: "93%",
      risk: "Medium" as const,
      status: "Open" as const,
      image: "",
    },
    {
      id: "hebatpur-hac",
      name: "Hebatpur HAC",
      location: "Hebatpur, Ahmedabad",
      type: "Premium Plotting",
      pricePerFraction: "₹25,000",
      totalValuation: "₹2.5 Cr",
      expectedCagr: "106%",
      risk: "Low" as const,
      status: "Fully Funded" as const,
      image: "",
    },
    {
      id: "zhanki-reserves",
      name: "Zhanki Reserves",
      location: "Zhanki, Gujarat",
      type: "Future Development",
      pricePerFraction: "₹7,500",
      totalValuation: "₹60 Lacs",
      expectedCagr: "88%",
      risk: "High" as const,
      status: "Open" as const,
      image: "",
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Investment Opportunities</h1>
        <p className="text-gray-400 max-w-2xl">
          Exclusive access to high-growth land parcels in Gujarat's emerging corridors. 
          Verified titles, transparent valuation, and exceptional growth potential.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
