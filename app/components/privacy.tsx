"use client";
import Link from 'next/link';

export default function Privacy() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-gray-900 italic uppercase tracking-tighter mb-8">
          Privacy <span className="text-black">Policy</span>
        </h1>
        
        <div className="space-y-10 text-gray-900">
          <div>
            <h3 className="text-xl font-black uppercase tracking-widest text-black mb-3">01. Data Collection</h3>
            <p className="font-bold leading-relaxed text-lg">
              We collect your name, phone number, and vehicle details specifically to facilitate car sales in Zimbabwe. This data is used only to generate your WhatsApp lead.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-black uppercase tracking-widest text-black mb-3">02. Photos</h3>
            <p className="font-bold leading-relaxed text-lg">
              Images uploaded to Breezecars are used to showcase your vehicle to potential buyers. We do not store these images for any other purpose.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100">
            <p className="text-sm font-black uppercase tracking-widest text-gray-500 mb-2">Contact Support</p>
            <p className="text-lg font-bold">Have questions? Message us on WhatsApp for privacy concerns.</p>
          </div>
        </div>
      </div>
    </section>
  );
}