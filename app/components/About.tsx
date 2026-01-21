import Image from 'next/image';
import Link from 'next/link';

const stats = [
  { label: "Vehicles Sold", value: "1,200+" },
  { label: "Happy Customers", value: "98%" },
  { label: "Inspection Points", value: "150" },
  { label: "Years Experience", value: "12" },
];

export default function About() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">
        
        {/* Top Section: Title and Mission */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 italic tracking-tighter mb-8 leading-none">
              REDEFINING THE <br /> 
              <span className="text-[#632197]">DRIVING EXPERIENCE.</span>
            </h2>
            <p className="text-lg text-gray-600 font-medium leading-relaxed mb-6">
              Breezecars started with a simple vision: to make high-quality vehicles accessible through a 
              transparent, digital-first marketplace. We believe buying or selling a car should be as 
              simple as catching a breeze.
            </p>
            <div className="flex gap-4">
               <div className="h-12 w-1 bg-[#632197]"></div>
               <p className="text-gray-500 italic font-semibold">
                 Our mission is to eliminate the stress of traditional dealerships by providing 
                 guaranteed quality and instant cash offers.
               </p>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative aspect-video lg:aspect-4/3 rounded-[40px] overflow-hidden shadow-2xl">
              <Image 
                src="https://i.pinimg.com/736x/1b/b3/ed/1bb3edff82885dceb2d1d67bafebd122.jpg"
                alt="Breezecars Team"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            {/* Floating Achievement Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl hidden md:block border border-gray-100">
               <p className="text-[#632197] font-black text-2xl">#1</p>
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ranked Auto Marketplace</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-y border-gray-100">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Culture Section */}
        <div className="mt-24 bg-[#0a0a0a] rounded-[50px] p-12 md:p-20 text-white flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="max-w-md">
              <h3 className="text-3xl font-black italic mb-6">Why Choose <span className="text-[#632197]">Breeze?</span></h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#632197]"></span>
                  <span className="font-bold text-gray-300">150-Point Certified Inspections</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#632197]"></span>
                  <span className="font-bold text-gray-300">7-Day Money Back Guarantee</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#632197]"></span>
                  <span className="font-bold text-gray-300">Direct Home Delivery</span>
                </li>
              </ul>
           </div>
           <Link href="/cars" className="px-10 py-5 bg-[#632197] rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">
              Browse Inventory
           </Link>
        </div>

      </div>
    </section>
  );
}