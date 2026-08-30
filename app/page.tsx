import Hero from '@/components/home/Hero';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import BestSellers from '@/components/home/BestSellers';
import NewArrivalsCarousel from '@/components/home/NewArrivalsCarousel';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import InstagramSection from '@/components/home/InstagramSection';
import Newsletter from '@/components/home/Newsletter';
import { getBestSellers, getNewArrivals } from '@/lib/queries/products';
import { dbProductsToProducts } from '@/lib/adapters';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const dbBestSellers = await getBestSellers().catch(() => []);
  const dbNewArrivals = await getNewArrivals().catch(() => []);

  const bestSellers = dbProductsToProducts(dbBestSellers);
  const newArrivals = dbProductsToProducts(dbNewArrivals);

  return (
    <>
      <Hero />
      <FeaturedCollections />
      <BestSellers products={bestSellers} />
      <NewArrivalsCarousel products={newArrivals} />
      <WhyChooseUs />
      <Testimonials />
      <InstagramSection />
      <Newsletter />
    </>
  );
}

