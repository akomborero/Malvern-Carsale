import VehicleGrid from '../components/VehicleGrid';

export default function CarsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-100 py-12 px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-black text-gray-900">Cars for Sale</h1>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-2">
           Bolana Clean Motors / Inventory
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-1/4">
            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-black text-gray-900 uppercase text-sm">Filter</h3>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Price</label>
                <select className="w-full p-3 bg-gray-50 rounded-xl font-bold border-none outline-none">
                  <option>All Cars</option>
                  
                </select>
              </div>
              <button className="w-full py-3 bg-[#632197] text-white rounded-xl font-bold text-sm">
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Inventory Grid */}
          <div className="w-full lg:w-3/4">
            <VehicleGrid />
          </div>
        </div>
      </div>
    </main>
  );
}