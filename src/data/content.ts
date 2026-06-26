// Tüm içerik FORA Plastik kurumsal dokümanlarından alınmıştır.

export const company = {
  name: "FORA Plastik",
  legal: "FORA Plastik Ambalaj Sanayi",
  founded: "2020",
  location: "İkitelli OSB · İstanbul",
  area: "2.000 m²",
  capacity: "400 ton",
  capacityNote: "aylık üretim kapasitesi",
  tagline: "Markanız için doğan ambalaj.",
  heroLead:
    "Ambalaj, ürününüzün müşteriye ilk temas ettiği yerdir. FORA Plastik; markanız için yüksek kapasiteli, esnek ve kaliteli ambalaj çözümleri üretir.",
  phone: "+90 212 000 00 00",
  email: "info@foraplastik.com",
};

export const stats = [
  { value: "2020", label: "Kuruluş", note: "İstanbul'da üretim yolculuğu" },
  { value: "2.000", unit: "m²", label: "Üretim Tesisi", note: "İkitelli OSB" },
  { value: "400", unit: "ton", label: "Aylık Kapasite", note: "ileri teknoloji hatları" },
  { value: "8", unit: "renk", label: "Flexo Baskı", note: "markaya özel uygulama" },
];

export const sectors = [
  "Üretim",
  "Perakende",
  "Hijyen",
  "Kargo",
  "E-ticaret",
  "Tekstil",
  "Gıda",
  "Kimya",
];

export const materials = ["LDPE", "HDPE", "MDPE", "MLDPE"];

export const productCategories = [
  {
    id: "magaza",
    name: "Mağaza Poşetleri",
    short: "El geçmeli · yumuşak saplı · takviyeli",
    desc: "Mağazalarda kullanılan el geçmeli poşet, yumuşak saplı poşet ve takviyeli poşet ürünlerinin tamamını yüksek kalite standartlarında üretiyoruz.",
    items: ["El geçmeli poşet", "Yumuşak saplı poşet", "Takviyeli poşet", "Kulplu poşet"],
    image: "/products/store-bags-grid.png",
    accent: "#15A0A0",
  },
  {
    id: "market",
    name: "Market Poşetleri",
    short: "Atlet · hışır · rulo",
    desc: "Marketlerde en çok atlet poşet, hışır poşet ve rulo poşet kullanılır. Tüm bu ürünlerde en iyi kalitede baskı makineleriyle üretim yapıyoruz.",
    items: ["Atlet poşet", "Hışır poşet", "Rulo poşet"],
    image: "/products/market-bags-grid.png",
    accent: "#0E6E6E",
  },
  {
    id: "kargo",
    name: "Kargo Poşetleri",
    short: "Logo baskılı · şeffaf · yapışkanlı · cepli",
    desc: "Firmanıza özel logo baskılı kargo poşeti imalatını yüksek kalitede sağlıyoruz. Baskılı, şeffaf, yapışkanlı, cepli ve güvenlik bantlı e-ticaret kargo poşetleri üretiyoruz.",
    items: ["Baskılı kargo poşeti", "Şeffaf kargo poşeti", "Cepli kargo poşeti", "Güvenlik bantlı / seri no.lu"],
    image: "/products/cargo-bags-grid.png",
    accent: "#15A0A0",
  },
  {
    id: "kilitli",
    name: "Kilitli Poşetler",
    short: "Standart veya özel ölçü",
    desc: "Standart ölçülerde kilitli poşet ya da size özel istediğiniz ebat ve özelliklerde imalat yapabiliyoruz.",
    items: ["Standart kilitli poşet", "Özel ölçü kilitli poşet"],
    image: "/products/cargo-bags-grid2.png",
    accent: "#0B4F4F",
  },
];

export const foodFeatures = [
  "Yüksek bariyer",
  "Düşük oksijen ve su buharı geçirgenliği",
  "Yüksek laminasyon kuvveti",
  "Kokusuz yapı",
  "Sızdırmazlık kabiliyeti",
  "Düşük COF değeri",
  "Mat lak uygulaması",
  "Paper touch uygulaması",
];

export const foodLayers = [
  { name: "Baskı katmanı", note: "8 renk flexo · markaya özel" },
  { name: "Bariyer katmanı", note: "düşük O₂ / su buharı geçirgenliği" },
  { name: "Laminasyon", note: "yüksek laminasyon kuvveti" },
  { name: "İç temas yüzeyi", note: "gıdaya uygun · sızdırmaz" },
];

export const shrink = {
  title: "Shrink & Palet Koruma",
  lead:
    "Shrink film, ürünleri ısıl işlemle sıkıca sararak korur. Paletli ürünlerde taşıma ve depolama sırasında dış etkenlere karşı kusursuz koruma sağlar.",
  points: [
    "Alçak yoğunluklu polietilenden üretilir, yüzeyine flexo baskı yapılabilir",
    "Perforeli ve delikli shrink film üretimi",
    "Toz, yağmur, yoğun güneş gibi hava şartlarına karşı koruma",
    "Darbe ve sarsıntıya karşı paletleri stabilize eder",
  ],
};

// Referans firmalar — dokümandaki REFERANS listesi.
// Logolar marka kimliği korunarak vektör olarak yeniden çizilmiştir.
export const references = [
  { id: "saray", name: "Saray Aluminium" },
  { id: "kervan", name: "Kervan" },
  { id: "sistem", name: "Sistem Alüminyum" },
  { id: "nurlu", name: "Nurlu" },
  { id: "ozyildirim", name: "Özyıldırım" },
  { id: "arged", name: "Arged Makina" },
  { id: "savas", name: "Savaş Plastik" },
  { id: "guncan", name: "Güncan Plastik" },
  { id: "teka", name: "Teka Plastik" },
  { id: "siesta", name: "Siesta" },
  { id: "hastin", name: "Hastin" },
  { id: "raftiye", name: "Raftiye" },
];

export const values = [
  "İnsana ve çevreye saygı",
  "Yüksek üretim kalitesi",
  "İleri teknoloji",
  "Verimlilik",
  "Zamanında teslimat",
  "Sürdürülebilirlik",
];

export const productTypesForQuote = [
  "Kargo poşeti",
  "Mağaza poşeti",
  "Market poşeti",
  "Kilitli poşet",
  "Gıda ambalajı",
  "Shrink rulo",
  "Shrink palet örtüsü",
  "Laminasyonlu ürün",
];

export const journey = [
  { id: "granul", label: "Granül" },
  { id: "film", label: "Film" },
  { id: "baski", label: "Baskı" },
  { id: "urun", label: "Ürün" },
  { id: "gida", label: "Gıda" },
  { id: "shrink", label: "Shrink" },
  { id: "referans", label: "Referans" },
  { id: "teklif", label: "Teklif" },
];
