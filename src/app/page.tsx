import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProductionLine } from "@/components/ProductionLine";
import { Marquee } from "@/components/Marquee";
import { Products } from "@/components/Products";
import { FoodPackaging } from "@/components/FoodPackaging";
import { Shrink } from "@/components/Shrink";
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
      <Marquee />
      <Products />
      <FoodPackaging />
      <Shrink />
      <QuoteForm />
      <Footer />
      <StickyCTA />
    </main>
  );
}
