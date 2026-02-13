export default function QuickFilters() {
  const filters = [
    " Cheap cars",
    "New cars",
    "Pre-owned cars",
    "Recently Added",
    "Fuel Efficient"
  ];

  return (
   <section className="px-6 pt-12 pb-4 bg-white">
  <div className="container mx-auto">
    <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-[0.15em] text-center lg:text-left italic">
      Find your perfect match
    </h2>
    
    {/* Added a flex wrapper to ensure it looks balanced */}
    <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
      {filters.map((name, i) => (
        <button
          key={i}
          className="
            whitespace-nowrap 
            px-8 py-3 
            rounded-full 
            text-[13px] 
            font-black 
            uppercase 
            tracking-widest
            border-2 
            border-black 
            bg-white 
            text-black
            hover:bg-black 
            hover:border-black 
            hover:text-white 
            transition-all 
            duration-300 
            active:scale-90
          "
        >
          {name}
        </button>
      ))}
    </div>
  </div>
</section>
  );
}