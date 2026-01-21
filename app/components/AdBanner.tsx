export default function AdBanner() {
 

  return (
    <div className="bg-black py-4 px-6 flex items-center justify-center gap-12 overflow-hidden">
      <button className="text-white text-2xl font-bold">&lt;</button>
      
    

      <div className="flex items-center gap-6">
        <button className="bg-white text-black px-6 py-2 rounded font-bold text-xs">SHOP NOW</button>
        <div className="text-white text-xs font-bold leading-tight">
          BUICK GMC <br /> <span className="text-[8px] opacity-50">OF STUART</span>
        </div>
      </div>

      <button className="text-white text-2xl font-bold">&gt;</button>
    </div>
  );
}