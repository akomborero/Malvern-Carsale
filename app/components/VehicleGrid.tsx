"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '../../server/supabaseClient';

type Car = {
  id: string;
  name: string;
  price: string;
  year: string;
  imgs: string[];
};

interface SupabaseCar {
  id: string;
  make: string;
  model: string;
  year: number;
  price_per_day: number;
  images: string[];
}

export default function VehicleGrid() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchLiveStock();
  }, []);

  async function fetchLiveStock() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cars')
        .select('id, make, model, year, price_per_day, images')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedCars: Car[] = (data as SupabaseCar[]).map((c) => ({
          id: c.id,
          name: `${c.make} ${c.model}`,
          price: `$${c.price_per_day.toLocaleString()}`,
          year: c.year.toString(),
          imgs: c.images || [],
        }));
        setCars(formattedCars);
      }
    } catch (err) {
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-[1600px] mx-auto">
        
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
  {/* Heading */}
  <h2 className="text-4xl md:text-5xl font-black text-gray-900 italic uppercase tracking-tighter">
    Featured <span className="text-[#632197]">Stock</span>
  </h2>

  {/* Buttons Container */}
  <div className="flex flex-wrap items-center gap-3">
    {user?.isAdmin && (
      <Link 
        href="/admin" 
        className="px-6 py-3 bg-[#632197] text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-black hover:shadow-xl transition-all duration-300 active:scale-95 shadow-lg shadow-purple-100"
      >
        + Add A Car
      </Link>
    )}
    
    <Link 
      href="/cars" 
      className="inline-block px-8 py-3 border-2 border-black text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-black hover:text-white transition-all duration-300 active:scale-95"
    >
      View All Cars
    </Link>
  </div>
</div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[4/3] rounded-2xl mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {cars.map((car) => (
              <Link 
                key={car.id} 
                href={`/cars/${car.id}`} 
                className="group cursor-pointer block"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-gray-100 shadow-sm border border-gray-50">
                  {car.imgs?.[0] ? (
                    <Image
                      src={car.imgs[0]}
                      alt={car.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">No Image</div>
                  )}
                  <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] px-2 py-1 rounded-md font-bold backdrop-blur-sm">
                    {car.year}
                  </div>
                </div>

                <div className="px-1">
                  <h4 className="text-sm font-bold text-gray-900 truncate uppercase tracking-tight group-hover:text-[#632197] transition-colors">
                    {car.name}
                  </h4>
                  <p className="text-[#632197] font-black text-sm mt-0.5">
                    {car.price}
                    
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && cars.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
             <p className="text-gray-500 font-bold">Our showroom is currently empty. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}