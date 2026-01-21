"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../components/AuthProvider';
import { supabase } from '../../server/supabaseClient';

// 1. New Interface to replace 'any'
interface SupabaseCar {
  id: string;
  make: string;
  model: string;
  year: number;
  price_per_day: number;
  images: string[];
  mileage?: string;
  transmission?: string;
  fuel_type?: string;
  description?: string;
  user_id?: string;
  created_at?: string;
}

type Car = {
  id: string;
  name: string;
  price: string;
  year: string; 
  imgs: string[];
  mileage: string;
  transmission: string;
  fuelType: string;
  description: string;
};

export default function AdminPage() {
  const { user } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [mileage, setMileage] = useState('');
  const [transmission, setTransmission] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [description, setDescription] = useState('');
  const [editingCarId, setEditingCarId] = useState<string | null>(null);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    // Specify the type here <SupabaseCar[]>
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
        console.error(error);
    } else if (data) {
        // Line 50 Fix: data is now typed
        const formattedCars: Car[] = (data as SupabaseCar[]).map((c) => ({
            id: c.id,
            name: `${c.make} ${c.model}`,
            price: `$${c.price_per_day}/day`,
            year: c.year.toString(),
            imgs: c.images,
            mileage: c.mileage || '',
            transmission: c.transmission || '',
            fuelType: c.fuel_type || '',
            description: c.description || ''
        }));
        setCars(formattedCars);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
      setImagePreviews(files.map(file => URL.createObjectURL(file)));
    }
  };

  const resetForm = () => {
    setName(''); setPrice(''); setYear(''); setImages([]); setImagePreviews([]);
    setMileage(''); setTransmission(''); setFuelType(''); setDescription('');
    setEditingCarId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedUrls = [...imagePreviews];

      if (images.length > 0) {
        const uploadPromises = images.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `cars/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('car-images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('car-images')
            .getPublicUrl(filePath);
          
          return publicUrl;
        });

        uploadedUrls = await Promise.all(uploadPromises);
      }

      // Line 133 Fix: Explicitly defining the payload type
      const carPayload: Partial<SupabaseCar> = {
        make: name.split(' ')[0] || name,
        model: name.split(' ').slice(1).join(' ') || '',
        price_per_day: parseFloat(price.replace(/[^0-9.]/g, '')),
        year: parseInt(year),
        images: uploadedUrls,
        mileage,
        transmission,
        fuel_type: fuelType,
        description,
        user_id: (await supabase.auth.getUser()).data.user?.id
      };

      if (editingCarId) {
        const { error } = await supabase.from('cars').update(carPayload).eq('id', editingCarId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('cars').insert([carPayload]);
        if (error) throw error;
      }

      resetForm();
      fetchCars();
    } catch (err) {
      const error = err as Error; // Type guard for catch block
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeCar = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      const { error } = await supabase.from('cars').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchCars();
    }
  };

  const startEditing = (car: Car) => {
    setEditingCarId(car.id);
    setName(car.name);
    setPrice(car.price);
    setYear(car.year);
    setMileage(car.mileage);
    setTransmission(car.transmission);
    setFuelType(car.fuelType);
    setDescription(car.description);
    setImagePreviews(car.imgs || []);
    setImages([]); 
  };

  if (!user || !user.isAdmin) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-black text-black">Access denied</h1>
        <p className="text-gray-600 mt-4">You must be an admin to view this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-6 text-black italic uppercase">Manage</h1>

      <section className="mb-8 bg-gray-50 p-6 rounded-[30px] border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold mb-4 text-black">{editingCarId ? 'Edit Car' : 'Post New Car'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required placeholder="Make & Model" value={name} onChange={(e) => setName(e.target.value)} className="p-4 rounded-2xl border border-gray-300 text-black bg-white" />
          <input required placeholder="Asking Price" value={price} onChange={(e) => setPrice(e.target.value)} className="p-4 rounded-2xl border border-gray-300 text-black bg-white" />
          <input required placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} className="p-4 rounded-2xl border border-gray-300 text-black bg-white" />
          <input required placeholder="Mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} className="p-4 rounded-2xl border border-gray-300 text-black bg-white" />
          <input required placeholder="Transmission" value={transmission} onChange={(e) => setTransmission(e.target.value)} className="p-4 rounded-2xl border border-gray-300 text-black bg-white" />
          <input required placeholder="Fuel Type" value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="p-4 rounded-2xl border border-gray-300 text-black bg-white" />
          <textarea required placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-4 rounded-2xl border border-gray-300 text-black bg-white md:col-span-2 h-32" />
          
          <div className="md:col-span-2">
            <div className="border-2 border-dashed border-gray-300 p-8 rounded-2xl text-center bg-white hover:border-[#632197] transition-colors">
              <input type="file" multiple onChange={handleImageChange} accept="image/*" className="hidden" id="car-image-upload" />
              <label htmlFor="car-image-upload" className="cursor-pointer text-[#632197] font-bold">Click to Upload Images</label>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {imagePreviews.map((src, i) => (
                // Line 192 Fix: flex-shrink-0 changed to shrink-0
                <div key={i} className="relative w-24 h-24 shrink-0 shadow-md">
                  <Image src={src} alt="preview" fill className="object-cover rounded-xl" unoptimized />
                </div>
              ))}
            </div>
          </div>

          <button disabled={loading} type="submit" className="md:col-span-2 py-4 bg-[#632197] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#4d1975] disabled:bg-gray-400 transition-all shadow-lg active:scale-[0.98]">
            {loading ? "Saving Listing..." : (editingCarId ? 'Update Listing' : 'Publish Car')}
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 text-black italic">Live Inventory</h2>
       <div className="grid gap-4">
  {cars.map((c) => (
    <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-100 p-4 rounded-3xl shadow-sm hover:shadow-md transition-all gap-4">
      
      {/* Left Side: Image and Car Info */}
      <div className="flex items-center gap-4">
        {c.imgs?.[0] && (
          <Image 
            src={c.imgs[0]} 
            alt={c.name} 
            width={100} 
            height={80} 
            className="rounded-2xl object-cover shadow-sm min-w-[100px] h-[80px]" 
            unoptimized 
          />
        )}
        <div>
          <div className="font-black text-black text-lg uppercase italic tracking-tighter leading-tight">
            {c.name}
          </div>
          <div className="text-[#632197] font-black text-xl">
            ${c.price} <span className="text-[10px] uppercase tracking-widest text-gray-400">USD</span>
          </div>
        </div>
      </div>

      {/* Right Side: Buttons (Now Responsive) */}
      <div className="flex flex-row sm:flex-row gap-2 w-full sm:w-auto">
        <button 
          onClick={() => startEditing(c)} 
          className="flex-1 sm:flex-none py-3 px-6 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-100 transition-all text-sm uppercase"
        >
          Edit
        </button>
        <button 
          onClick={() => removeCar(c.id)} 
          className="flex-1 sm:flex-none py-3 px-6 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all text-sm uppercase"
        >
          Delete
        </button>
      </div>

    </div>
  ))}
</div>
      </section>
    </div>
  );
}