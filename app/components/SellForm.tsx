"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function SellForm() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    vehicleInfo: '',
    price: '',
    location: '',
    mileage: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    dutyStatus: 'Duty Paid',
    condition: 'Excellent',
    description: '',
    fullName: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...selectedFiles]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const myNumber = "27 78 759 3914"; 
    const message = `* NEW CAR SUBMISSION*%0A%0A*Vehicle:* ${formData.vehicleInfo}%0A*Price:* $${formData.price} USD%0A*Location:* ${formData.location}%0A*Duty:* ${formData.dutyStatus}%0A*Mileage:* ${formData.mileage}km%0A*Fuel:* ${formData.fuelType}%0A*Trans:* ${formData.transmission}%0A%0A*CONTACT*%0A*Name:* ${formData.fullName}%0A*Phone:* ${formData.phone}%0A*Photos:* ${images.length} attached`;

    window.location.href = `whatsapp://send?phone=${myNumber}&text=${message}`;
    setSubmitted(true);
  };

  const inputClass = "w-full p-4 rounded-xl border border-gray-300 bg-white text-gray-900 font-bold placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all";

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-gray-100 text-black rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">✓</div>
        <h2 className="text-4xl font-black text-gray-900 mb-4 italic uppercase tracking-tighter">Opening WhatsApp...</h2>
        <button onClick={() => { setSubmitted(false); setShowForm(false); }} className="px-10 py-4 border-2 border-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-all">BACK TO HOME</button>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-700 text-center lg:text-left">
        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight italic uppercase">Sell your car <span className="text-black">your way</span></h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0">Quickly and securely cash-in your offer from a local dealer on Breezecars.</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Get instant offer</h2>
            <ul className="space-y-4">
              {["Sell your car quickly.", "Full transparency.", "Secure payment."].map((text, i) => (
                <li key={i} className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold">✓</div>
                  <p className="text-gray-900 font-bold">{text}</p>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowForm(true)} className="px-10 py-5 bg-black text-white font-black rounded-full shadow-xl hover:scale-105 transition-all uppercase tracking-widest">
              Get your instant offer
            </button>
          </div>
          <div className="relative w-full h-[350px]">
            <Image src="https://www.cars.com/images/sell-v3/instant-offer-illustration.png" alt="Sell car" fill className="object-contain" unoptimized />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button onClick={() => setShowForm(false)} className="text-sm font-black text-black mb-8 italic uppercase tracking-widest">← BACK</button>
      <h2 className="text-4xl font-black text-gray-900 mb-10 italic uppercase tracking-tighter">Vehicle Submission</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1 */}
        <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
          <h3 className="text-sm font-black mb-6 text-black uppercase tracking-[0.2em]">1. Vehicle Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input required name="vehicleInfo" onChange={handleInputChange} placeholder="Year / Make / Model" className={inputClass} />
            <div className="relative">
              <span className="absolute left-4 top-4 font-black text-gray-400">$</span>
              <input required name="price" type="number" onChange={handleInputChange} placeholder="Asking Price (USD)" className={`${inputClass} pl-8`} />
            </div>
            <input required name="location" onChange={handleInputChange} placeholder="City (Harare, etc)" className={inputClass} />
            <input required name="mileage" type="number" onChange={handleInputChange} placeholder="Mileage (km)" className={inputClass} />
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
          <h3 className="text-sm font-black mb-6 text-black uppercase tracking-[0.2em]">2. Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <select name="dutyStatus" onChange={handleInputChange} className={inputClass}>
              <option value="Duty Paid">Duty Paid</option>
              <option value="Non-Duty">Non-Duty</option>
            </select>
            <select name="fuelType" onChange={handleInputChange} className={inputClass}>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
            <select name="transmission" onChange={handleInputChange} className={inputClass}>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
        </div>

        {/* Section 3: Photo Upload */}
        <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
          <h3 className="text-sm font-black mb-6 text-black uppercase tracking-[0.2em]">3. Photos</h3>
          <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-black transition-colors">
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleImageChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-2">
              <div className="text-4xl text-gray-400">📸</div>
              <p className="text-gray-900 font-bold">Click or drag photos to upload</p>
              <p className="text-sm text-gray-500">{images.length} files selected</p>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
          <h3 className="text-sm font-black mb-6 text-black uppercase tracking-[0.2em]">4. Contact Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input required name="fullName" onChange={handleInputChange} placeholder="Full Name" className={inputClass} />
            <input required name="phone" onChange={handleInputChange} placeholder="Phone Number" className={inputClass} />
          </div>
        </div>

        <button type="submit" className="w-full py-6 bg-black text-white font-black rounded-3xl uppercase tracking-[0.2em] shadow-xl hover:bg-gray-800 transition-all active:scale-95">
           SUBMIT TO WHATSAPP
        </button>
      </form>
    </div>
  );
}