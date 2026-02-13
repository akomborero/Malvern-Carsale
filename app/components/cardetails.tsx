"use client";
import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { supabase } from '../../server/supabaseClient';
import VehicleGrid from './VehicleGrid';
import { useAuth } from './AuthProvider'; // Ensure this path matches your project

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

interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function CarDetails({ carId }: CarDetailsProps) {
  const { user } = useAuth();
  const [car, setCar] = useState<CarData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Form State
  const [reviewName, setReviewName] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length).toFixed(1)
    : null;

  const fetchCarAndReviews = useCallback(async () => {
    try {
      const { data: carData } = await supabase.from('cars').select('*').eq('id', carId).single();
      const { data: reviewData } = await supabase
        .from('reviews')
        .select('*')
        .eq('car_id', carId)
        .order('created_at', { ascending: false });

      if (carData) setCar(carData);
      if (reviewData) setReviews(reviewData);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [carId]);

  useEffect(() => {
    fetchCarAndReviews();
  }, [fetchCarAndReviews]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from('reviews').insert([{
        car_id: carId,
        user_name: reviewName,
        user_email: reviewEmail,
        rating: reviewRating,
        comment: reviewComment,
    }]);

    if (error) {
      alert(error.message);
    } else {
      setReviewName(''); setReviewEmail(''); setReviewComment('');
      fetchCarAndReviews();
    }
    setSubmitting(false);
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this customer review?')) {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) {
        alert(error.message);
      } else {
        setReviews(prev => prev.filter(r => r.id !== reviewId));
      }
    }
  };

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppDirect = () => {
    if (!car) return;
    const myNumber = "27 78 759 3914"; 
    const message = ` *New Inquiry: ${car.year} ${car.make} ${car.model}Hi Qaulity import cars.! I am interested in this vehicle.. ${window.location.href}`;
    window.location.href = `whatsapp://send?phone=${myNumber}&text=${encodeURIComponent(message)}`;
  };

  if (loading) return <div className="p-20 text-center font-bold text-black uppercase italic">Loading...</div>;
  if (!car) return <div className="p-20 text-center font-bold text-black uppercase italic">Car not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-video rounded-[30px] overflow-hidden bg-gray-100 shadow-xl">
            <Image src={car.images[activeImage]} alt={car.model} fill className="object-cover" unoptimized />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {car.images.map((img, idx) => (
              <button key={idx} onClick={() => setActiveImage(idx)} className={`relative w-24 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx ? 'border-black' : 'border-transparent'}`}>
                <Image src={img} alt="thumbnail" fill className="object-cover" unoptimized />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
                <span className="text-black font-black uppercase tracking-widest text-sm">{car.year} Model</span>
                {averageRating && (
                    <button onClick={scrollToReviews} className="flex items-center gap-1 bg-yellow-400 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase hover:scale-105 transition-transform shadow-sm">
                        ★ {averageRating} ({reviews.length})
                    </button>
                )}
            </div>
            <h1 className="text-5xl font-black text-black italic uppercase tracking-tighter leading-[0.9]">
              {car.make} <span className="text-gray-400">{car.model}</span>
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase">Mileage</p>
              <p className="font-black text-black">{car.mileage}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase">Transmission</p>
              <p className="font-black text-black">{car.transmission}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase">Fuel</p>
              <p className="font-black text-black">{car.fuel_type}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-black mb-2 uppercase text-xs tracking-widest">Description</h3>
            <p className="text-gray-700 leading-relaxed font-medium">{car.description}</p>
          </div>

          <div className="mt-auto pt-8 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1 block">Price</span>
                <div className="text-4xl font-black text-black italic">${car.price_per_day.toLocaleString()}</div>
              </div>
              <button onClick={handleWhatsAppDirect} className="px-10 py-5 bg-black text-white rounded-2xl font-black uppercase hover:bg-gray-800 transition-all shadow-xl w-full sm:w-auto active:scale-95">
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-20 border-gray-100" />

      {/* REVIEWS SECTION */}
      <div ref={reviewsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-black italic uppercase mb-6 text-black border-l-4 border-black pl-4">
            Leave a Review
          </h2>
          <form onSubmit={handleReviewSubmit} className="space-y-4 bg-gray-50 p-8 rounded-[30px] border-2 border-gray-200 shadow-sm">
            <div>
              <label className="text-[10px] font-black uppercase text-black ml-2 mb-1 block tracking-widest">Full Name</label>
              <input required placeholder="Your Name" value={reviewName} onChange={(e) => setReviewName(e.target.value)} className="w-full p-4 rounded-2xl border-2 border-gray-300 bg-white text-black font-bold focus:border-black outline-none transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-black ml-2 mb-1 block tracking-widest">Email Address</label>
              <input required type="email" placeholder="Your Email" value={reviewEmail} onChange={(e) => setReviewEmail(e.target.value)} className="w-full p-4 rounded-2xl border-2 border-gray-300 bg-white text-black font-bold focus:border-black outline-none transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-black ml-2 mb-1 block tracking-widest">Rating</label>
              <select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))} className="w-full p-4 rounded-2xl border-2 border-gray-300 bg-white text-black font-black uppercase focus:border-black outline-none transition-all">
                <option value="5">★★★★★ Excellent</option>
                <option value="4">★★★★☆ Very Good</option>
                <option value="3">★★★☆☆ Average</option>
                <option value="2">★★☆☆☆ Poor</option>
                <option value="1">★☆☆☆☆ Terrible</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-black ml-2 mb-1 block tracking-widest">Comment</label>
              <textarea required placeholder="Share your experience..." value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} className="w-full p-4 rounded-2xl border-2 border-gray-300 bg-white text-black font-bold h-32 focus:border-black outline-none transition-all" />
            </div>
            <button disabled={submitting} type="submit" className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-400 active:scale-95 shadow-lg">
              {submitting ? "Posting..." : "Submit Review"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-3xl font-black italic uppercase mb-6 text-black border-l-4 border-black pl-4">
            Customer Feedback
          </h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500 italic font-medium bg-gray-50 p-8 rounded-2xl border border-dashed border-gray-200">No reviews yet. Be the first to review this car!</p>
          ) : (
            <div className="space-y-6">
              {reviews.map((r) => (
                <div key={r.id} className="relative p-8 bg-white border border-gray-200 rounded-[30px] shadow-md transition-all group">
                  
                  {user?.isAdmin && (
                    <button 
                      onClick={() => handleDeleteReview(r.id)}
                      className="absolute top-6 right-6 py-2 px-4 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all text-[10px] uppercase tracking-widest shadow-sm"
                    >
                      Remove Review
                    </button>
                  )}

                  <div className="flex justify-between items-start mb-4 pr-32">
                    <h4 className="font-black text-xl uppercase italic text-black tracking-tight">{r.user_name}</h4>
                    <div className="flex text-amber-500 text-lg drop-shadow-sm">
                      {[...Array(r.rating)].map((_, i) => <span key={i}>★</span>)}
                    </div>
                  </div>
                  <p className="text-gray-900 font-medium italic text-xl leading-relaxed">&quot;{r.comment}&quot;</p>
                  <div className="flex items-center gap-2 mt-6">
                     <div className="h-px w-8 bg-gray-300"></div>
                     <p className="text-[11px] text-black uppercase font-black tracking-widest">{new Date(r.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-20">
        <VehicleGrid />
      </div>
    </div>
  );
}