"use client";
import React, { useEffect, useState, useRef } from 'react'; // Added useRef
import Image from 'next/image';
import { useAuth } from '../components/AuthProvider';
import { supabase } from '../../server/supabaseClient';
import StatusModal from '../components/StatusModal';
import ConfirmationModal from '../components/ConfirmationModal';

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
  const formRef = useRef<HTMLDivElement>(null); // Ref for auto-scroll
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
  const [status, setStatus] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const ITEMS_PER_PAGE = 5;
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; carId: string | null }>({
    isOpen: false,
    carId: null
  });

  useEffect(() => {
    fetchCars();
  }, [currentPage]);

  async function fetchCars() {
    const from = (currentPage - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    const { data, error, count } = await supabase
      .from('cars')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false });
    
    if (error) {
        console.error(error);
    } else if (data) {
        const formattedCars: Car[] = (data as SupabaseCar[]).map((c) => ({
            id: c.id,
            name: `${c.make} ${c.model}`,
            price: c.price_per_day.toString(), 
            year: c.year.toString(),
            imgs: c.images || [],
            mileage: c.mileage || '',
            transmission: c.transmission || '',
            fuelType: c.fuel_type || '',
            description: c.description || ''
        }));
        setCars(formattedCars);
        if (count !== null) setTotalCount(count);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(prev => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  // NEW: Remove image from preview list before saving
  const removePreviewImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    // Also remove from the actual files array if it was just uploaded
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setName(''); setPrice(''); setYear(''); setImages([]); setImagePreviews([]);
    setMileage(''); setTransmission(''); setFuelType(''); setDescription('');
    setEditingCarId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imagePreviews.length === 0) {
      setStatus({
        isOpen: true,
        title: 'Missing Photos',
        message: 'Please upload at least one photo of the vehicle.',
        type: 'error'
      });
      return;
    }

    setLoading(true);

    try {
      // 1. Identify which images are already URLs (existing) vs Files (new)
      let finalUrls = imagePreviews.filter(src => src.startsWith('http'));

      // 2. Upload new files
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

        const newUrls = await Promise.all(uploadPromises);
        finalUrls = [...finalUrls, ...newUrls];
      }

      const carPayload = {
        make: name.split(' ')[0] || name,
        model: name.split(' ').slice(1).join(' ') || '',
        price_per_day: parseFloat(price.replace(/[^0-9.]/g, '')),
        year: parseInt(year),
        images: finalUrls, // Now includes only the images currently in preview
        mileage,
        transmission,
        fuel_type: fuelType,
        description,
        user_id: (await supabase.auth.getUser()).data.user?.id
      };

      const isNewPost = !editingCarId;

      if (editingCarId) {
        const { error } = await supabase.from('cars').update(carPayload).eq('id', editingCarId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('cars').insert([carPayload]);
        if (error) throw error;
      }

      resetForm();
      
      if (isNewPost && currentPage !== 1) {
        setCurrentPage(1);
      } else {
        fetchCars();
      }

      setStatus({
        isOpen: true,
        title: 'Success',
        message: editingCarId ? 'Vehicle updated successfully.' : 'Vehicle listed successfully.',
        type: 'success'
      });
    } catch (err) {
      const error = err as Error;
      setStatus({
        isOpen: true,
        title: 'Operation Failed',
        message: error.message,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const removeCar = (id: string) => {
    setDeleteConfirmation({ isOpen: true, carId: id });
  };

  const executeDeleteCar = async () => {
    if (!deleteConfirmation.carId) return;
    const id = deleteConfirmation.carId;
    setDeleteConfirmation({ isOpen: false, carId: null });

    const { error } = await supabase.from('cars').delete().eq('id', id);
    if (error) {
      setStatus({
        isOpen: true,
        title: 'Delete Failed',
        message: error.message,
        type: 'error'
      });
    } else {
      fetchCars();
      // Optional: Show success for delete, or just let the list update
    }
  };

  // UPDATED: Start Editing with Auto-Scroll
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

    // Scroll to the top of the form
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!user || !user.isAdmin) {
    return <div className="p-20 text-center font-black">ACCESS DENIED</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-6 text-black italic uppercase">Manage Fleet</h1>

      {/* Added formRef here */}
      <section ref={formRef} className="mb-12 bg-gray-50 p-8 rounded-[40px] border-2 border-gray-200 shadow-sm">
        <h2 className="text-2xl font-black mb-6 text-black uppercase italic">
          {editingCarId ? 'Editing Car' : ' Post New Car'}
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required placeholder="Make & Model" value={name} onChange={(e) => setName(e.target.value)} className="p-4 rounded-2xl border border-gray-300 text-black bg-white font-bold" />
          <input required placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="p-4 rounded-2xl border border-gray-300 text-black bg-white font-bold" />
          <input required placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} className="p-4 rounded-2xl border border-gray-300 text-black bg-white font-bold" />
          <input placeholder="Mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} className="p-4 rounded-2xl border border-gray-300 text-black bg-white font-bold" />
          <input placeholder="Transmission" value={transmission} onChange={(e) => setTransmission(e.target.value)} className="p-4 rounded-2xl border border-gray-300 text-black bg-white font-bold" />
          <input placeholder="Fuel Type" value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="p-4 rounded-2xl border border-gray-300 text-black bg-white font-bold" />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-4 rounded-2xl border border-gray-300 text-black bg-white md:col-span-2 h-32 font-medium" />
          
          <div className="md:col-span-2">
            <div className="border-4 border-dashed border-gray-200 p-10 rounded-3xl text-center bg-white hover:border-black transition-all group">
              <input type="file" multiple onChange={handleImageChange} accept="image/*" className="hidden" id="car-image-upload" />
              <label htmlFor="car-image-upload" className="cursor-pointer text-black font-black uppercase tracking-widest text-sm">
                + Add Photos
              </label>
            </div>

            {/* UPDATED: Image Previews with Delete Button */}
            <div className="mt-6 flex gap-4 overflow-x-auto pb-4">
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative w-32 h-32 shrink-0 group shadow-lg rounded-2xl overflow-hidden border-2 border-white">
                  <Image src={src} alt="preview" fill className="object-cover" unoptimized />
                  {/* DELETE ICON ON IMAGE */}
                  <button 
                    type="button"
                    onClick={() => removePreviewImage(i)}
                    className="absolute top-1 right-1 bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shadow-md hover:scale-110 transition-transform"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex gap-3">
            <button disabled={loading} type="submit" className="flex-[2] py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 disabled:bg-gray-400 transition-all shadow-xl flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (editingCarId ? 'Save Changes' : 'Publish Listing')}
            </button>
            {editingCarId && (
              <button type="button" onClick={resetForm} className="flex-1 py-5 bg-gray-200 text-black rounded-2xl font-black uppercase tracking-widest hover:bg-gray-300 transition-all">
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Inventory List */}
      <section>
        <h2 className="text-2xl font-black mb-6 text-black italic uppercase border-b-4 border-black inline-block">Live Inventory</h2>
        <div className="grid gap-6 mt-6">
          {cars.map((c) => (
            <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border-2 border-gray-100 p-6 rounded-[35px] shadow-sm hover:shadow-xl transition-all gap-6">
              <div className="flex items-center gap-6">
                {c.imgs?.[0] && (
                  <div className="relative w-28 h-20 shadow-md rounded-2xl overflow-hidden">
                    <Image src={c.imgs[0]} alt={c.name} fill className="object-cover" unoptimized />
                  </div>
                )}
                <div>
                  <div className="font-black text-black text-xl uppercase italic tracking-tighter">{c.name}</div>
                  <div className="text-black font-black text-2xl">${parseFloat(c.price).toLocaleString()}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => startEditing(c)} className="py-4 px-8 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-md">
                  Edit
                </button>
                <button onClick={() => removeCar(c.id)} className="py-4 px-8 bg-red-50 text-red-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-all shadow-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalCount > ITEMS_PER_PAGE && (
          <div className="flex justify-center items-center gap-6 mt-12">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-black uppercase text-xs tracking-widest hover:border-black hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-gray-200"
            >
              Previous
            </button>
            <span className="font-black text-black text-sm">
              Page {currentPage} of {Math.ceil(totalCount / ITEMS_PER_PAGE)}
            </span>
            <button 
              disabled={currentPage >= Math.ceil(totalCount / ITEMS_PER_PAGE)} 
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-black uppercase text-xs tracking-widest hover:border-black hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-gray-200"
            >
              Next
            </button>
          </div>
        )}
      </section>

      <StatusModal 
        isOpen={status.isOpen}
        onClose={() => setStatus(prev => ({ ...prev, isOpen: false }))}
        title={status.title}
        message={status.message}
        type={status.type}
      />

      <ConfirmationModal 
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, carId: null })}
        onConfirm={executeDeleteCar}
        title="Delete Vehicle"
        message="Are you sure you want to remove this vehicle from the inventory? This action cannot be undone."
      />
    </div>
  );
}