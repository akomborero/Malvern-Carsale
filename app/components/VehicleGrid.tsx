"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '../../server/supabaseClient';

// 1. Defined strict types to avoid 'any'
interface ReviewData {
  rating: number;
}

interface SupabaseCarResponse {
  id: string;
  make: string;
  model: string;
  year: number;
  price_per_day: number;
  images: string[];
  reviews: ReviewData[];
}

type Car = {
  id: string;
  name: string;
  price: string;
  year: string;
  imgs: string[];
  avgRating: string | null;
};

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
        .select('id, make, model, year, price_per_day, images, reviews(rating)')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        // 2. Cast to our response interface instead of 'any'
        const rawData = data as unknown as SupabaseCarResponse[];
        
        const formattedCars: Car[] = rawData.map((c) => {
          const ratings = c.reviews || [];
          const avg = ratings.length > 0 
            ? (ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length).toFixed(1)
            : null;

          return {
            id: c.id,
            name: `${c.make} ${c.model}`,
            price: `$${c.price_per_day.toLocaleString()}`,
            year: c.year.toString(),
            imgs: c.images || [],
            avgRating: avg
          };
        });
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
      {/* 3. Updated class to max-w-7xl for standard canonical sizing */}
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-black italic uppercase tracking-tighter">
            Featured <span className="text-black">Stock</span>
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            {user?.isAdmin && (
              <Link 
                href="/admin" 
                className="px-6 py-3 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-gray-800 hover:shadow-xl transition-all duration-300 active:scale-95 shadow-lg shadow-gray-300"
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
                {/* 4. Canonical aspect ratio class */}
                <div className="bg-gray-200 aspect-video rounded-2xl mb-3"></div>
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
                {/* 5. Simplified aspect ratio class */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-3 bg-gray-100 shadow-sm border border-gray-50">
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
                  
                  {car.avgRating && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-black text-[10px] px-2 py-1 rounded-md font-black backdrop-blur-sm shadow-md">
                      ★ {car.avgRating}/5
                    </div>
                  )}

                  <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] px-2 py-1 rounded-md font-bold backdrop-blur-sm">
                    {car.year}
                  </div>
                </div>

                <div className="px-1">
                  <h4 className="text-sm font-bold text-gray-900 truncate uppercase tracking-tight group-hover:text-black transition-colors">
                    {car.name}
                  </h4>
                  <p className="text-black font-black text-sm mt-0.5">
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