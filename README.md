# FORA Plastik — Markanızı Koruyan Ambalajın Yolculuğu

Award-level, sinematik kurumsal site. Kullanıcı scroll yaptıkça bir ambalajın
üretim yolculuğunu izler: **Granül → Film → Baskı → Ürün → Gıda → Shrink →
Referans → Teklif.**

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — tasarım token'ları (`tailwind.config.ts`)
- **GSAP + ScrollTrigger** — pinli sahneler, scrub animasyonları
- **Lenis** — smooth scroll (GSAP ticker ile senkron)
- **Framer Motion** — mikro etkileşimler (paket önizleme morph)
- **React Three Fiber / Three.js** — yalnızca hero granül sahnesi (lightweight)

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Mimari

| Bölüm | Dosya | Not |
|-------|-------|-----|
| Smooth scroll + GSAP | `src/components/SmoothScroll.tsx` | reduced-motion'da Lenis devre dışı |
| Hero (granül→film) | `src/components/Hero.tsx`, `GranuleScene.tsx` | mobil/reduced'da CSS fallback |
| Hakkımızda + istatistik | `src/components/About.tsx`, `StatCounter.tsx` | 2020 · 2.000 m² · 400 ton |
| Ekstrüzyon + Flexo | `src/components/Production.tsx` | pinli CMYK baskı build-up |
| Ürün kategorileri | `src/components/Products.tsx` | gerçek ürün görselleri |
| Gıda ambalaj anatomisi | `src/components/FoodPackaging.tsx` | scroll ile katman ayrışması |
| Shrink / palet | `src/components/Shrink.tsx` | dağınık → sarılı stabil |
| Referanslar | `src/components/References.tsx`, `ReferenceMark.tsx` | 12 marka, vektör wordmark |
| Teklif konfigüratörü | `src/components/QuoteForm.tsx`, `PackagePreview.tsx` | ürün tipi → form morph |
| Logo (yeniden çizim) | `src/components/Logo.tsx` | orijinal logodan SVG |
| İçerik (tek kaynak) | `src/data/content.ts` | tüm metin FORA dokümanlarından |

## Erişilebilirlik & Performans

- `prefers-reduced-motion` her animasyonda destekleniyor (3D ve Lenis kapanır).
- Mobilde 3D yerine hafif CSS fallback; ağır sahneler `dynamic(ssr:false)`.
- Semantik HTML, `<header>/<section>/<footer>`, SEO meta + anahtar kelimeler.
- Sticky "Teklif Al" CTA (nav'da + mobil alt bar) — B2B dönüşüm her an erişilebilir.

## İçerik & Hukuki Notlar

- Tüm metin/istatistik FORA kurumsal dokümanlarından alınmıştır.
- Sürdürülebilirlik dili temkinli: "çevreye saygılı üretim yaklaşımı" — sertifikasız
  "%100 çevreci" iddiası **yok** (greenwashing riski).
- Referans markaları site diline uygun wordmark olarak yeniden yorumlandı;
  birebir logo kopyası değil. Yayın öncesi logo kullanım izni alınmalı.

## Yapılacaklar (öneri)

- Gerçek iletişim bilgileri (`src/data/content.ts` → `company.phone/email/location`).
- Teklif formunu gerçek bir endpoint'e bağlama (şu an client-side onay ekranı).
- Ürün görsellerini tekil, yüksek çözünürlüklü WebP'lere çevirme (şu an doküman kolajları).
- SEO için ayrı ürün sayfaları (`/kargo-poseti`, `/gida-ambalaji`, …).
