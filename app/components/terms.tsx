"use client";
import Link from 'next/link';

export default function Terms() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-gray-900 italic uppercase tracking-tighter mb-8">
          Terms of <span className="text-black">Service</span>
        </h1>

        <div className="space-y-10 text-gray-900">
          <div className="border-l-4 border-black pl-6">
            <h3 className="text-xl font-black uppercase tracking-widest text-black mb-3">01. Listing Rules</h3>
            <p className="font-bold leading-relaxed text-lg">
              All vehicles must be located in Zimbabwe. You must provide accurate USD pricing and honest mileage reports.
            </p>
          </div>

          <div className="border-l-4 border-black pl-6">
            <h3 className="text-xl font-black uppercase tracking-widest text-black mb-3">02. Transactions</h3>
            <p className="font-bold leading-relaxed text-lg">
              Breezecars is a platform for connecting buyers and sellers. We are not responsible for the physical exchange of money or vehicle condition.
            </p>
          </div>

          <div className="bg-black text-white p-10 rounded-[40px] shadow-2xl">
            <h3 className="text-2xl font-black italic uppercase mb-4">Safety First</h3>
            <p className="font-bold text-gray-300">
              Never pay for a vehicle before seeing it in person and verifying the ZIMRA clearance and logbook.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}