import Hero from './components/Hero';
import TrendingTags from './components/TrendingTags';
import Categories from './components/About';
import VehicleGrid from './components/VehicleGrid';

import Features from './components/Features';
import NewsSection from './components/NewsSection';
import FAQ from './components/FAQ';

export default function Home() {
  return (
    <main>
      <Hero />
      <TrendingTags />
      <Categories />
      <VehicleGrid />
   
      <Features />
      <NewsSection />
      <FAQ />
    </main>
  );
}