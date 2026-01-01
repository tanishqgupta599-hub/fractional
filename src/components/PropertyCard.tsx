import Link from "next/link";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { MapPin, TrendingUp, AlertCircle, ArrowUpRight } from "lucide-react";

interface PropertyCardProps {
  id: string;
  name: string;
  location: string;
  type: string;
  pricePerFraction: string;
  totalValuation: string;
  expectedCagr: string;
  risk: "Low" | "Medium" | "High";
  status: "Open" | "Fully Funded" | "Coming Soon" | "Upcoming";
  image: string; // Placeholder for now
}

export default function PropertyCard({ property }: { property: PropertyCardProps }) {
  return (
    <Card hover className="flex flex-col h-full overflow-hidden group">
      {/* Image Placeholder */}
      <div className="h-48 bg-gray-800 relative overflow-hidden">
        {property.image && (
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        {/* In a real app, use Next Image here */}
        <div className="absolute top-4 right-4 z-20">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            property.status === 'Open' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : property.status === 'Fully Funded' 
              ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
          }`}>
            {property.status}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 z-20">
          <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">{property.type}</p>
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{property.name}</h3>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-4">
        <div className="flex items-start gap-2 text-sm text-gray-400">
          <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
          <span>{property.location}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
          <div>
            <p className="text-xs text-gray-500 mb-1">Min Investment</p>
            <p className="text-white font-semibold">{property.pricePerFraction}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Exp. CAGR</p>
            <p className="text-green-400 font-semibold flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> {property.expectedCagr}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Asset Value</p>
            <p className="text-gray-300">{property.totalValuation}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Risk Profile</p>
            <p className={`flex items-center gap-1 font-medium ${
              property.risk === 'Low' ? 'text-green-400' : 
              property.risk === 'Medium' ? 'text-yellow-400' : 'text-orange-400'
            }`}>
              <AlertCircle className="h-3 w-3" /> {property.risk}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-2">
          <Link href={`/properties/${property.id}`} className="block">
            <Button variant="secondary" className="w-full group-hover:bg-primary group-hover:text-black transition-all">
              View Details <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
