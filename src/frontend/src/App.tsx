import {
  ArrowUp,
  ChevronRight,
  Cake,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Share2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const PREMIUM_CAKES = [
  { name: "Oreolicious", emoji: "🍪", price500: 40, price1kg: 55 },
  { name: "Caramel Crunch", emoji: "🍮", price500: 40, price1kg: 55 },
  { name: "Pina Colada", emoji: "🍍", price500: 40, price1kg: 55 },
  { name: "Mix Fruit", emoji: "🍓", price500: 45, price1kg: 60 },
  { name: "Death by Chocolate", emoji: "🍫", price500: 45, price1kg: 60 },
  { name: "Roasted Almond Chocolate", emoji: "🌰", price500: 50, price1kg: 65 },
  { name: "Choco Hazelnut", emoji: "🫘", price500: 50, price1kg: 65 },
  { name: "Chocolate Mocha", emoji: "☕", price500: 50, price1kg: 65 },
  { name: "Truffle", emoji: "🍫", price500: 50, price1kg: 65 },
  { name: "Rasmalai", emoji: "🌸", price500: 50, price1kg: 65 },
  { name: "Gulab Jamun", emoji: "🌹", price500: 50, price1kg: 65 },
  { name: "Ferrero Rocher", emoji: "🎁", price500: 55, price1kg: 70 },
  { name: "Nutella Crunch", emoji: "🥜", price500: 55, price1kg: 70 },
  { name: "Belgium Praline", emoji: "🍬", price500: 55, price1kg: 70 },
  { name: "German Chocolate", emoji: "🇩🇪", price500: 55, price1kg: 70 },
  { name: "Red Velvet", emoji: "❤️", price500: 55, price1kg: 70 },
  {
    name: "Kunafa Pistachio Chocolate",
    emoji: "🟢",
    price500: 60,
    price1kg: 75,
  },
  {
    name: "Healthy Cake (Oats, Dates, Honey)",
    emoji: "🌿",
    price500: 70,
    price1kg: 100,
  },
];

const CLASSIC_CAKES = [
  { name: "Vanilla", emoji: "🍦", price500: 30, price1kg: 45 },
  { name: "Pineapple", emoji: "🍍", price500: 35, price1kg: 50 },
  { name: "Strawberry", emoji: "🍓", price500: 35, price1kg: 50 },
  { name: "Blueberry", emoji: "🫐", price500: 35, price1kg: 50 },
  { name: "Black Forest", emoji: "🍒", price500: 40, price1kg: 55 },
  { name: "Chocolate", emoji: "🍫", price500: 40, price1kg: 55 },
  { name: "Orange Chocolate", emoji: "🍊", price500: 40, price1kg: 55 },
  { name: "Coconut", emoji: "🥥", price500: 45, price1kg: 60 },
];

const SIDES_TREATS = [
  { name: "Cupcakes with Filling", emoji: "🧁", price: 4.0 },
  { name: "Classic Brownie", emoji: "🍫", price: 4.0 },
  { name: "Walnut Brownie", emoji: "🌰", price: 4.5 },
  { name: "Biscoff Brownie", emoji: "🍪", price: 5.0 },
  { name: "Almond Caramel Poke Brownie", emoji: "🍯", price: 5.0 },
  { name: "Nutella Crunch Brownie", emoji: "🥜", price: 5.0 },
];

// ── Sparkle Particles ─────────────────────────────────────────────────────────

const SPARKLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 5,
  static: Math.random() > 0.5,
}));

function SparkleParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {SPARKLES.map((s) => (
        <div
          key={s.id}
          className={s.static ? "sparkle-static" : "sparkle"}
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              "--duration": `${s.duration}s`,
              "--delay": `${s.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

// ── Scroll Fade-In Hook ────────────────────────────────────────────────────────

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Cake Card ─────────────────────────────────────────────────────────────────

function CakeCard({
  name,
  emoji,
  price500,
  price1kg,
  index,
}: {
  name: string;
  emoji: string;
  price500: number;
  price1kg: number;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="py-4 border-b border-border/50 flex flex-col items-center text-center gap-3"
      data-ocid={`menu.item.${index + 1}`}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-3xl">{emoji}</span>
        <h3 className="font-display font-semibold text-foreground leading-tight text-sm md:text-base">
          {name}
        </h3>
      </div>
      <div className="flex items-center justify-center gap-6 mt-1">
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">500g</span>
          <span className="font-bold text-gold text-sm">${price500}</span>
        </div>
        <div className="w-px h-6 bg-border/50"></div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">1 kg</span>
          <span className="font-bold text-gold-bright text-sm">${price1kg}</span>
        </div>
      </div>
    </motion.div>
  );
}

function TreatCard({
  name,
  emoji,
  price,
  index,
}: {
  name: string;
  emoji: string;
  price: number;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="py-4 border-b border-border/50 flex items-center justify-between gap-4"
      data-ocid={`treats.item.${index + 1}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl flex-shrink-0">{emoji}</span>
        <div className="flex flex-col">
          <h3 className="font-display font-semibold text-foreground text-sm md:text-base">{name}</h3>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
            Min. 6 pcs required
          </p>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Each</div>
        <div className="text-gold-bright font-bold text-lg">
          ${price.toFixed(2)}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState<"premium" | "classic" | "sides">(
    "premium",
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  const aboutRef = useFadeIn();
  const statsRef = useFadeIn();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }, []);

  const shareMenu = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "The CraveCoach Menu",
          text: "Check out these delicious 100% eggless cakes from CraveCoach in Moncton!",
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  }, []);

  const navLinks = [
    { label: "HOME", id: "home" },
    { label: "MENU", id: "menu" },
    { label: "ABOUT", id: "about" },
    { label: "CONTACT", id: "contact" },
  ];

  const tabs = [
    {
      key: "premium" as const,
      label: "Premium Cakes",
      count: PREMIUM_CAKES.length,
    },
    {
      key: "classic" as const,
      label: "Classic Favorites",
      count: CLASSIC_CAKES.length,
    },
    {
      key: "sides" as const,
      label: "Sides & Treats",
      count: SIDES_TREATS.length,
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#fefae0",
      }}
    >
      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navScrolled ? "navbar-blur" : ""}`}
        data-ocid="nav.panel"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex-shrink-0 focus:outline-none"
            data-ocid="nav.link"
          >
            <div
              className={`flex flex-col justify-center transition-all duration-500 ease-in-out ${navScrolled ? "scale-[0.55] sm:scale-[0.6] md:scale-[0.65] translate-y-0 origin-left" : "scale-100 translate-y-3 sm:translate-y-5 origin-left"
                }`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
              >
                {/* Premium Emblem */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex items-center justify-center mb-1.5"
                >
                  <Cake size={32} strokeWidth={1.5} className="text-gold drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
                </motion.div>

                {/* Text Group */}
                <div className="flex flex-col items-center">
                  <div className="font-display font-bold tracking-tight text-base sm:text-lg md:text-xl lg:text-2xl leading-none shimmer-text drop-shadow-sm text-center">
                    THE CRAVECOACH
                  </div>
                  <div
                    className="font-semibold tracking-[0.2em] text-[0.45rem] sm:text-[0.5rem] md:text-[0.55rem] uppercase mt-1 text-center"
                    style={{ color: "oklch(0.35 0.03 100)" }}
                  >
                    Premium Homemade Cakes
                  </div>
                </div>
              </motion.div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-xs font-semibold tracking-widest transition-all duration-200 hover:text-gold"
                style={{
                  color: "oklch(0.35 0.03 100)",
                  letterSpacing: "0.15em",
                }}
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={shareMenu}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest transition-all duration-200 hover:glow-gold"
              style={{
                border: "1px solid oklch(0.76 0.16 80 / 50%)",
                color: "oklch(0.45 0.16 65)",
                letterSpacing: "0.1em",
              }}
              data-ocid="nav.button"
            >
              <Share2 size={14} />
              SHARE
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gold"
            data-ocid="nav.toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden navbar-blur border-t"
              style={{ borderTopColor: "oklch(0.76 0.16 80 / 20%)" }}
              data-ocid="nav.modal"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="text-left text-sm font-semibold tracking-widest py-2 border-b transition-colors hover:text-gold"
                    style={{
                      color: "oklch(0.35 0.03 100)",
                      borderBottomColor: "oklch(0.76 0.16 80 / 15%)",
                      letterSpacing: "0.15em",
                    }}
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={shareMenu}
                  className="flex items-center gap-2 py-2 text-sm font-semibold tracking-widest text-gold"
                  data-ocid="nav.button"
                >
                  <Share2 size={16} /> SHARE MENU
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero Section ── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-cakes.dim_1200x700.jpg')",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Sparkles */}
        <SparkleParticles />

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest mb-8"
              style={{
                border: "1px solid oklch(0.76 0.16 80 / 40%)",
                background: "oklch(0.76 0.16 80 / 10%)",
                color: "oklch(0.45 0.16 65)",
                letterSpacing: "0.15em",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              100% EGGLESS · HANDCRAFTED · MONCTON, NB
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-6"
          >
            <span className="shimmer-text">ELEVATE YOUR</span>
            <br />
            <span className="text-foreground">SWEET</span>{" "}
            <span className="shimmer-text">CRAVINGS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base md:text-lg mb-10 max-w-xl mx-auto"
            style={{ color: "oklch(0.35 0.03 100)" }}
          >
            Crafting Sweet Memories in Moncton, NB — Fresh, Handmade with Love
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4 mb-14"
          >
            <button
              type="button"
              onClick={() => scrollTo("menu")}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-105"
              style={{
                background: "transparent",
                border: "2px solid oklch(0.55 0.14 65)",
                color: "oklch(0.45 0.16 65)",
                boxShadow: "0 0 20px oklch(0.76 0.16 80 / 30%)",
              }}
              data-ocid="hero.primary_button"
            >
              Browse Menu <ChevronRight size={16} />
            </button>
            <a
              href="https://instagram.com/the_cravecoach"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-105"
              style={{
                background: "oklch(0.55 0.14 65)",
                color: "#fefae0",
              }}
              data-ocid="hero.secondary_button"
            >
              <Instagram size={16} /> Order Now
            </a>
          </motion.div>

          {/* Info Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { icon: "📍", text: "14, Kenview Dr, Moncton NB" },
              { icon: "🥚", text: "100% Eggless" },
              { icon: "🎂", text: "Book 2-3 Days Prior" },
              { icon: "🚚", text: "Free Delivery within 1km" },
              { icon: "💲", text: "Extra charges for customization" },
            ].map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  color: "oklch(0.35 0.03 100)",
                }}
              >
                <span>{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #fefae0)",
          }}
        />
      </section>

      {/* ── About Strip ── */}
      <section id="about" className="py-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div ref={aboutRef} className="fade-in">
            <p
              className="text-xs font-semibold tracking-widest text-gold mb-4 uppercase"
              style={{ letterSpacing: "0.25em" }}
            >
              Our Story
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Handcrafted with{" "}
              <span className="gold-gradient-text">Love & Precision</span>
            </h2>
            <p
              className="text-base leading-relaxed max-w-2xl mx-auto mb-12"
              style={{ color: "oklch(0.35 0.03 100)" }}
            >
              At The CraveCoach, we believe every celebration deserves a cake
              that's as extraordinary as the moment. Operating from our
              dedicated eggless kitchen in Moncton, NB, we pour our hearts into
              every layer, every frosting swirl, and every carefully sourced
              ingredient.
            </p>
          </div>
          <div
            ref={statsRef}
            className="fade-in grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { stat: "17+", label: "Premium Flavors" },
              { stat: "100%", label: "Eggless Kitchen" },
              { stat: "Daily", label: "Handcrafted Fresh" },
            ].map((s) => (
              <div key={s.stat} className="card-light p-8 text-center">
                <div className="font-display text-4xl font-black gold-gradient-text mb-2">
                  {s.stat}
                </div>
                <div
                  className="text-sm font-medium tracking-wider"
                  style={{
                    color: "oklch(0.35 0.03 100)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Menu Section ── */}
      <section id="menu" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold tracking-widest text-gold mb-3 uppercase"
              style={{ letterSpacing: "0.25em" }}
            >
              Flavors Await
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-black uppercase shimmer-text mb-4">
              OUR DELECTABLE MENU
            </h2>
            <div className="flex justify-center">
              <div
                className="h-px w-32"
                style={{
                  background:
                    "linear-gradient(to right, transparent, oklch(0.55 0.14 65), transparent)",
                }}
              />
            </div>
            <p
              className="mt-4 text-sm"
              style={{ color: "oklch(0.35 0.03 100)" }}
            >
              <span className="text-red-400 font-medium">Note:</span> Please
              book your order 2-3 days in advance
            </p>
          </div>

          {/* Tabs */}
          <div
            className="flex flex-wrap justify-center gap-3 mb-10"
            role="tablist"
          >
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 border ${activeTab === tab.key
                  ? "tab-active"
                  : "border-transparent hover:border-gold-dim"
                  }`}
                style={
                  activeTab !== tab.key ? { color: "oklch(0.35 0.03 100)" } : {}
                }
                data-ocid="menu.tab"
              >
                {tab.label}
                <span className="ml-2 text-xs opacity-60">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "premium" && (
              <motion.div
                key="premium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {PREMIUM_CAKES.map((cake, i) => (
                    <CakeCard key={cake.name} {...cake} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
            {activeTab === "classic" && (
              <motion.div
                key="classic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {CLASSIC_CAKES.map((cake, i) => (
                    <CakeCard key={cake.name} {...cake} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
            {activeTab === "sides" && (
              <motion.div
                key="sides"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="text-center mb-6">
                  <span
                    className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      background: "oklch(0.76 0.16 80 / 15%)",
                      border: "1px solid oklch(0.76 0.16 80 / 40%)",
                      color: "oklch(0.45 0.16 65)",
                    }}
                  >
                    ⚠️ Minimum order: 6 pieces per item
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  {SIDES_TREATS.map((treat, i) => (
                    <TreatCard key={treat.name} {...treat} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Contact / Footer ── */}
      <footer id="contact" className="mt-12">
        {/* Contact strip */}
        <div
          className="py-16 px-6"
          style={{
            background:
              "linear-gradient(135deg, #f6f1d8 0%, #f1ecd0 100%)",
            borderTop: "1px solid oklch(0.76 0.16 80 / 20%)",
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
              <span className="gold-gradient-text">Get in Touch</span>
            </h2>
            <p
              className="text-sm mb-10"
              style={{ color: "oklch(0.35 0.03 100)" }}
            >
              Craving a closer look? 🎂 See our latest creations on Instagram!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <a
                href="https://instagram.com/the_cravecoach"
                target="_blank"
                rel="noopener noreferrer"
                className="card-light p-5 flex flex-col items-center gap-3 no-underline group"
                data-ocid="contact.link"
              >
                <Instagram
                  size={24}
                  className="text-gold group-hover:text-gold-bright transition-colors"
                />
                <div className="text-xs text-muted-foreground">Instagram</div>
                <div className="text-gold font-semibold text-sm">
                  @THE_CRAVECOACH
                </div>
              </a>
              <a
                href="mailto:payjalgoti@gmail.com"
                className="card-light p-5 flex flex-col items-center gap-3 no-underline group"
                data-ocid="contact.link"
              >
                <Mail
                  size={24}
                  className="text-gold group-hover:text-gold-bright transition-colors"
                />
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="text-gold font-semibold text-sm break-all">
                  payjalgoti@gmail.com
                </div>
              </a>
              <a
                href="tel:+15066889777"
                className="card-light p-5 flex flex-col items-center gap-3 no-underline group"
                data-ocid="contact.link"
              >
                <Phone
                  size={24}
                  className="text-gold group-hover:text-gold-bright transition-colors"
                />
                <div className="text-xs text-muted-foreground">Phone</div>
                <div className="text-gold font-semibold text-sm">
                  +1(506)688-9777
                </div>
              </a>
              <div className="card-light p-5 flex flex-col items-center gap-3">
                <MapPin size={24} className="text-gold" />
                <div className="text-xs text-muted-foreground">Location</div>
                <div className="text-gold font-semibold text-sm text-center">
                  14, Kenview Dr, Moncton, NB
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={shareMenu}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-105"
              style={{
                border: "2px solid oklch(0.76 0.16 80 / 60%)",
                color: "oklch(0.45 0.16 65)",
                background: "oklch(0.76 0.16 80 / 10%)",
              }}
              data-ocid="contact.button"
            >
              <Share2 size={16} /> Share Menu with Friends
            </button>
          </div>
        </div>

        {/* Copyright bar */}
        <div
          className="py-6 px-6 text-center"
          style={{
            background: "#fefae0",
            borderTop: "1px solid oklch(0.76 0.16 80 / 10%)",
          }}
        >
          <p className="text-xs" style={{ color: "oklch(0.35 0.03 100)" }}>
            © {new Date().getFullYear()} The CraveCoach. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* ── Back to Top ── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 animate-pulse-gold"
            style={{
              background: "oklch(0.55 0.14 65)",
              color: "#fefae0",
            }}
            data-ocid="nav.button"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
