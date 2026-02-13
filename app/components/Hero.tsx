import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    /* Changed min-h-[850px] to h-dvh (Dynamic Viewport Height) to fit screen perfectly */
    <section className="relative h-dvh w-full bg-[#0a0a0a] overflow-hidden flex items-center px-6">
      
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://static.vecteezy.com/system/resources/thumbnails/055/672/799/small/red-modern-red-sport-car-driving-fast-on-scenic-road-in-forest-at-sunset-automotive-background-tuning-template-auto-transport-photo.jpg" 
          alt="Lincoln Navigator Background" 
          fill
          className="object-cover object-center opacity-40 grayscale"
          priority
          unoptimized 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
      </div>

      {/* Premium White Glow */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-[160px] pointer-events-none z-10" />

      <div className="container mx-auto z-20">
        <div className="max-w-[1200px]">
          
          {/* COMPACT CARD */}
          <div className="bg-white rounded-[32px] p-8 shadow-2xl w-full max-w-[420px] transform hover:-translate-y-1 transition-transform duration-500">
            <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-black text-[9px] font-black uppercase tracking-[0.2em] mb-4">
              Qaulity cars Premium
            </div>
            
            <h2 className="text-[32px] md:text-[38px] font-black mb-3 text-gray-900 leading-[1.1] tracking-tight italic">
              ELEVATE YOUR <br /> 
              <span className="text-black">DRIVING.</span>
            </h2>
            <p className="text-gray-500 font-medium mb-6 text-base leading-snug">
              Experience luxury redefined. Explore our curated collection of high-performance vehicles.
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase ml-1">Condition</label>
                  <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl font-bold text-sm text-gray-700 outline-none focus:border-black transition-all cursor-pointer">
                    <option>Pre-Owned</option>
                    <option>Brand New</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase ml-1">Category</label>
                  <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl font-bold text-sm text-gray-700 outline-none focus:border-black transition-all cursor-pointer">
                    <option>All Categories</option>
                    <option>Auto</option>
                    <option>Manual</option>
                    <option>Pre-onwed</option>
                  </select>
                </div>
              </div>

              <Link href="/cars" className="w-full bg-[#1a1a1a] text-white py-4 rounded-xl font-black text-base hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2 group">
                Find Your Dream Car
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}