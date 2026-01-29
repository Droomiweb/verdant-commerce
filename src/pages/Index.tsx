import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { PromoSection } from "@/components/home/PromoSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { mockProducts } from "@/data/mockData";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <FeaturedProducts products={mockProducts.slice(0, 4)} />
      <CategoriesSection />
      <PromoSection />
      <FeaturedProducts products={mockProducts.slice(4)} />
      <TestimonialsSection />
    </Layout>
  );
};

export default Index;
