"use client";
import Image from 'next/image';
import Link from 'next/link';

export default function Features() {
  return (
    <section className="px-6 py-20 bg-white">
      <div className="container mx-auto grid md:grid-cols-2 gap-8">
        
        {/* Left Card: Rare Finds / Premium Inventory */}
        <div className="bg-gray-50 rounded-[40px] p-12 flex flex-col justify-between min-h-[420px] border border-gray-100 relative overflow-hidden group">
          <div className="relative z-10">
            <span className="text-black text-[10px] font-black uppercase tracking-[0.2em]">The Collection</span>
            <h2 className="text-4xl font-black text-black -900 mt-4 mb-4 tracking-tighter italic uppercase">
              Beyond <span className="text-black">Rare.</span>
            </h2>
            <p className="text-black -500 font-medium leading-relaxed max-w-[280px]">
              Step inside our vault of unlisted, high-performance icons. Sourced globally for the few who know exactly what they want.
            </p>
          </div>

          <div className="relative z-10 mt-8">
            <Link href="/cars" className="inline-flex items-center justify-center bg-black text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all transform active:scale-95 shadow-xl">
              Unlock Inventory
            </Link>
          </div>

          {/* Subtle Background Graphic */}
          <div className="absolute right-[-20px] bottom-[-20px] text-[180px] opacity-10 grayscale group-hover:opacity-20 transition-all duration-700 rotate-[-15deg]">
            
          </div>
        </div>

        {/* Right Card: Concierge / Sell Section */}
        <div className="bg-[#0a0a0a] rounded-[40px] p-12 flex flex-col justify-between min-h-[420px] relative overflow-hidden shadow-2xl group">
          <div className="relative z-10">
            <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">VIP Concierge</span>
            <h2 className="text-4xl font-black text-white mt-4 mb-4 tracking-tighter italic uppercase">
              Liquidate <span className="text-white">Instantly.</span>
            </h2>
            <p className="text-white/50 font-medium leading-relaxed max-w-[300px]">
              Bypass the public market. We provide immediate, premium liquidity for your luxury asset with zero friction and absolute privacy.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
             <Link href="/sell" className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-300 transition-all shadow-lg">
               Sell Your Car
             </Link>
             <Link href="/sell" className="inline-flex items-center justify-center border-2 border-white/10 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
               How it works
             </Link>
          </div>

          {/* Professional Illustration Placement */}
          <div className="absolute right-[-10px] bottom-[-10px] opacity-20 group-hover:opacity-40 transition-all duration-700">
             <div className="w-64 h-64 bg-gradient-to-br from-white/50 to-transparent rounded-full blur-[80px]" />
          </div>
          
        </div>

      </div>
    </section>
  );
}