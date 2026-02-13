import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="px-6 py-20 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 italic tracking-tighter mb-6">
            WE ARE <span className="text-black">  Bolana Clean Motors </span>
          </h1>
          <p className="text-xl text-gray-600 font-medium leading-relaxed">
            Revolutionizing the automotive experience in Zimbabwe. We don&apos;t just sell cars; 
            we build relationships through transparency, speed, and premium service.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <h3 className="text-6xl font-black text-black mb-2">500+</h3>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Cars Sold in 2025</p>
          </div>
          <div className="text-center">
            <h3 className="text-6xl font-black text-black mb-2">4.9</h3>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Google Rating</p>
          </div>
          <div className="text-center">
            <h3 className="text-6xl font-black text-black mb-2">24h</h3>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Average Sale Time</p>
          </div>
        </div>
      </section>

      {/* Mission Content */}
      <section className="py-24 px-6 bg-[#0a0a0a] text-white overflow-hidden relative">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-white font-black text-xs uppercase tracking-[0.3em]">Our Mission</span>
            <h2 className="text-4xl font-black italic mt-4 mb-8">Redefining trust in the used car market.</h2>
            <div className="space-y-6 text-gray-400 font-medium text-lg">
              <p>
                Founded with a single goal: to remove the stress of buying and selling vehicles. 
                Our digital-first approach ensures you get the best market value without the traditional dealership headache.
              </p>
              <p>
                Every vehicle in our inventory undergoes a rigorous 150-point inspection before it ever reaches our site. 
                If it isn&apos;t perfect, it isn&apos;t  Luxury.
              </p>
            </div>
          </div>
          <div className="relative aspect-square">
             <div className="bg-white/10 rounded-[60px] absolute -right-20 -top-20 w-full h-full rotate-12 blur-3xl"></div>
             <Image 
               src="https://i.pinimg.com/736x/14/01/24/1401243a39921e4f1f0363bf8f137542.jpg" 
               alt="Breezecars Office"
               fill
               className="rounded-[40px] relative z-10 shadow-2xl grayscale transition-all duration-700 object-cover"
               unoptimized
             />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Transparency", desc: "No hidden fees. No surprises. Ever." },
              { title: "Speed", desc: "Our tech-driven process gets you moving faster." },
              { title: "Quality", desc: "Only the finest hand-picked inventory." },
              { title: "Support", desc: "Dedicated experts for every step of your journey." }
            ].map((value, i) => (
              <div key={i} className="p-8 border border-gray-100 rounded-4xl hover:border-black transition-colors group">
                <h4 className="font-black text-gray-900 uppercase text-sm tracking-widest mb-4 group-hover:text-black">{value.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}