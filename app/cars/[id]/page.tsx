import CarDetails from '../../components/cardetails';

// 1. Make the function async
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  
  // 2. Await the params to unwrap the ID
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <main className="min-h-screen bg-white">
      {/* 3. Pass the unwrapped ID */}
      <CarDetails carId={id} />
    </main>
  );
}