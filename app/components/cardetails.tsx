"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '../../server/supabaseClient';
import VehicleGrid from './VehicleGrid';

interface CarDetailsProps {
  carId: string;
}

interface CarData {
  id: string;
  make: string;
  model: string;
  year: number;
  price_per_day: number;
  images: string[];
  description: string;
  fuel_type: string;
  transmission: string;
  mileage: string;
}

export default function CarDetails({ carId }: CarDetailsProps) {
  const [car, setCar] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    async function fetchCar() {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', carId)
        .single();

      if (error) {
        console.error("Error fetching car:", error);
      } else {
        setCar(data);
      }
      setLoading(false);
    }
    fetchCar();
  }, [carId]);

  const handleWhatsAppDirect = () => {
    if (!car) return;

    const myNumber = "263 771 716 547"; // Replace with your number
   const message = `🚀 *New Inquiry: ${car.year} ${car.make} ${car.model}*%0A%0A` +
  `Hi Breezecars! I am interested in this vehicle. Is it still available for viewing?%0A%0A` +
  
  `*Link:* ${window.location.href}`;
    
    // Deep link protocol to open the app directly
    const directLink = `whatsapp://send?phone=${myNumber}&text=${encodeURIComponent(message)}`;
    
    window.location.href = directLink;
  };

  if (loading) return <div className="p-20 text-center font-bold">Loading Car Details...</div>;
  if (!car) return <div className="p-20 text-center font-bold">Car not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-video rounded-[30px] overflow-hidden bg-gray-100 shadow-xl">
            <Image 
              src={car.images[activeImage]} 
              alt={car.model} 
              fill 
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {car.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`relative w-24 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx ? 'border-[#632197]' : 'border-transparent'}`}
              >
                <Image src={img} alt="thumbnail" fill className="object-cover" unoptimized />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Info & Booking */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="text-[#632197] font-black uppercase tracking-widest text-sm">{car.year} Model</span>
            <h1 className="text-5xl font-black text-black italic uppercase tracking-tighter">
              {car.make} <span className="text-gray-400">{car.model}</span>
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Mileage</p>
              <p className="font-black text-black">{car.mileage}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Transmission</p>
              <p className="font-black text-black">{car.transmission}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Fuel</p>
              <p className="font-black text-black">{car.fuel_type}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-black mb-2 uppercase text-xs tracking-widest">Description</h3>
            <p className="text-gray-600 leading-relaxed">{car.description}</p>
          </div>

         <div className="mt-auto pt-8 border-t border-gray-100">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
    
    {/* Price Section */}
    <div className="flex flex-col">
      <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
        Price
      </span>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black text-[#632197] italic">
          ${car.price_per_day.toLocaleString()}
        </span>
       
      </div>
    </div>

    {/* WhatsApp Button */}
    <button 
      onClick={handleWhatsAppDirect}
      className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-[#25D366] text-white rounded-2xl font-black uppercase tracking-tighter hover:bg-[#128C7E] transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(37,211,102,0.5)] active:scale-95 sm:w-auto w-full"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="group-hover:rotate-12 transition-transform"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      <span className="whitespace-nowrap">Chat on WhatsApp</span>
    </button>

  </div>
</div>
        </div>
      </div>

      <div className="mt-20">
        <VehicleGrid />
      </div>
    </div>
  );
}