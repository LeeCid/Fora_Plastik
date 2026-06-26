import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProductionLine } from "@/components/ProductionLine";
import { Products } from "@/components/Products";
import { FoodPackaging } from "@/components/FoodPackaging";
import { Shrink } from "@/components/Shrink";
import { References } from "@/components/References";
import { QuoteForm } from "@/components/QuoteForm";
import { Footer } from "@/components/Footer";
import { StickyCTA } from "@/components/StickyCTA";
import { JourneyRail } from "@/components/JourneyRail";

export default function Home() {
  return (
    <main>
      <Nav />
      <JourneyRail />
      <Hero />
      <About />
      <ProductionLine />
      <Products />
      <FoodPackaging />
      <Shrink />
      <References />
      <QuoteForm />
      <Footer />
      <StickyCTA />
    </main>
  );
}
