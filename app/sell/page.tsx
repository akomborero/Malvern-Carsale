import SellForm from '../components/SellForm';

export default function SellPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      {/* This renders the screenshot layout we just created */}
      <SellForm />

      {/* Optional: Add a 'Frequently Asked Questions' section here to match Cars.com */}
      <section className="bg-gray-50 py-20 px-6 border-t border-gray-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 text-center italic uppercase tracking-tighter">
  Frequently <span className="text-[#0c0c0c]">asked</span> questions
</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-gray-900">How long is my offer valid?</h4>
              <p className="text-gray-500 mt-2">Your  Luxury cars instant offer is valid for 7 days or an additional 500 miles.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-gray-900">Do I have to buy a car from you to sell mine?</h4>
              <p className="text-gray-500 mt-2">No! We will buy your car for cash even if you don&apos;t buy one from us.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}