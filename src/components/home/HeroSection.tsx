"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, Search } from "lucide-react";

const heroSlide1 = "/assets/hero-slider/1.jpeg";
const heroSlide2 = "/assets/hero-slider/2.jpeg";
const heroSlide3 = "/assets/hero-slider/hero.mp4";



const slides = [
  {
    image: heroSlide2,
    tag: "Future-Ready Curriculum",
    title: "Building",
    highlight: "Bright Futures",
    text: "Hands-on learning, digital skills, and strong mentorship empower students to excel.",
    cta: "Explore Programs",
    href: "/academics/pre-primary",
  },
  {
    image: heroSlide1,
    tag: "Personalized Learning Pathways",
    title: "Unlocking",
    highlight: "Student Potential",
    text: "Expert faculty, modern infrastructure, and a supportive culture help every learner thrive.",
    cta: "Apply for Admission",
    href: "/admissions",
  },
  {
    image: heroSlide3,
    tag: "Community First",
    title: "A school",
    highlight: "that feels like home",
    text: "Wellbeing, safety, and a vibrant community make every day a confident step forward.",
    cta: "Talk to Admissions",
    href: "/contact",
  },
];

const textContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.05,
    },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
 const [selectedState, setSelectedState] = useState("");
const [selectedCity, setSelectedCity] = useState("");
const [selectedBranch, setSelectedBranch] = useState("");

const cities = {
  Telangana: ["Hyderabad", "Warangal"],
  "Andhra Pradesh": ["Vijayawada", "Visakhapatnam"],
  Karnataka: ["Bengaluru"],
  "Tamil Nadu": ["Chennai"]
};

const branches = {
  Hyderabad: ["Jubilee Hills", "Madhapur", "Hitech City"],
  Warangal: ["Hanamkonda", "Kazipet"],
  Vijayawada: ["Benz Circle", "Patamata"],
  Visakhapatnam: ["MVP Colony", "Gajuwaka"],
  Bengaluru: ["Whitefield", "Yelahanka"],
  Chennai: ["Anna Nagar", "Velachery"]
};

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section id="home" className="relative min-h-screen w-full bg-[#0c1a2d]">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {slide.image.endsWith(".mp4") ? (
              <video
                key={`video-${current}`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/assets/hero-slider/3.jpeg"
                className="h-full w-full object-cover object-center"
              >
                <source src={slide.image} type="video/mp4" />
              </video>
            ) : (
              <motion.div
                key={`image-${current}`}
                className="absolute inset-0"
                initial={{ scale: 1.02 }}
                animate={{ scale: 1.07 }}
                transition={{ duration: 6.5, ease: "linear" }}
              >
                <Image
                  src={slide.image}
                  alt="Sri Chaitanya School"
                  fill
                  priority={current === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </motion.div>
            )}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(4,16,31,0.58)_0%,rgba(7,27,49,0.38)_30%,rgba(9,33,59,0.14)_56%,rgba(4,16,31,0)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(25deg,rgba(2,10,20,0.42)_0%,rgba(2,10,20,0.16)_36%,rgba(2,10,20,0)_72%)]" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-0 right-0 top-28 h-px bg-white/10" />
        <div className="absolute bottom-36 left-0 right-0 h-px bg-white/10" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center pb-16 pt-96 md:pb-14">
        <div className="container mx-auto grid items-center gap-10 px-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80">
                  <span className="h-px w-12 bg-[hsl(var(--accent))]" />
                  <span>Future-ready learning</span>
                </div>
                <h1 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
                  <motion.span
                    className="block font-sans"
                    variants={textContainer}
                    initial="hidden"
                    animate="show"
                    aria-label={slide.title}
                  >
                    {slide.title.split("").map((char, index) => (
                      <motion.span
                        key={`title-${char}-${index}`}
                        variants={textItem}
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.span>
                  <motion.span
                    className="block font-tomboy font-bold text-[hsl(var(--accent))]"
                    variants={textContainer}
                    initial="hidden"
                    animate="show"
                    aria-label={slide.highlight}
                  >
                    {slide.highlight.split("").map((char, index) => (
                      <motion.span
                        key={`highlight-${char}-${index}`}
                        variants={textItem}
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.span>
                </h1>

              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>

      <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 md:block">
        <button
          onClick={prev}
          className="h-11 w-11 rounded-lg border border-white/28 bg-white/10 text-white shadow-md backdrop-blur-sm transition hover:bg-white/25"
          aria-label="Previous slide"
        >
          <ChevronLeft className="mx-auto h-5 w-5" />
        </button>
      </div>
      <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 md:block">
        <button
          onClick={next}
          className="h-11 w-11 rounded-lg border border-white/28 bg-white/10 text-white shadow-md backdrop-blur-sm transition hover:bg-white/25"
          aria-label="Next slide"
        >
          <ChevronRight className="mx-auto h-5 w-5" />
        </button>
      </div>

      <div className="absolute left-0 right-0 -bottom-20 z-30">
        <div className="container mx-auto px-6">
          <div
            id="location-selector"
            className="rounded-[28px] bg-white p-6 shadow-[0_30px_80px_rgba(13,59,102,0.2),_0_18px_0_-6px_rgba(0,0,0,0.18)] border border-slate-100 md:p-8"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div />
              <div className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--primary)/0.6)] md:flex">
                <MapPin className="h-4 w-4 text-[hsl(var(--accent))]" />
                Start with your city
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">

{/* Board */}
<label className="text-sm font-semibold text-[hsl(var(--primary))]">
Select Board
<select className="mt-2 w-full rounded-lg border border-[hsl(var(--primary)/0.18)] bg-white px-4 py-2.5 text-sm text-[hsl(var(--primary))] shadow-sm">
<option>Select Board</option>
<option>CBSE</option>
<option>ICSE</option>
<option>State Board</option>
</select>
</label>

{/* State */}
<label className="text-sm font-semibold text-[hsl(var(--primary))]">
Select State
<select
value={selectedState}
onChange={(e)=>{
setSelectedState(e.target.value);
setSelectedCity("");
setSelectedBranch("");
}}
className="mt-2 w-full rounded-lg border border-[hsl(var(--primary)/0.18)] bg-white px-4 py-2.5 text-sm text-[hsl(var(--primary))]"
>
<option value="">Select State</option>
<option>Telangana</option>
<option>Andhra Pradesh</option>
<option>Karnataka</option>
<option>Tamil Nadu</option>
</select>
</label>

{/* City */}
<label className="text-sm font-semibold text-[hsl(var(--primary))]">
Select City
<select
value={selectedCity}
onChange={(e)=>{
setSelectedCity(e.target.value);
setSelectedBranch("");
}}
className="mt-2 w-full rounded-lg border border-[hsl(var(--primary)/0.18)] bg-white px-4 py-2.5 text-sm text-[hsl(var(--primary))]"
>
<option value="">Select City</option>

{selectedState &&
cities[selectedState]?.map((city)=>(
<option key={city} value={city}>{city}</option>
))}

</select>
</label>

{/* Branch */}
<label className="text-sm font-semibold text-[hsl(var(--primary))]">
Select Branch
<select
value={selectedBranch}
onChange={(e)=>setSelectedBranch(e.target.value)}
className="mt-2 w-full rounded-lg border border-[hsl(var(--primary)/0.18)] bg-white px-4 py-2.5 text-sm text-[hsl(var(--primary))]"
>
<option value="">Select Branch</option>

{selectedCity &&
branches[selectedCity]?.map((branch)=>(
<option key={branch} value={branch}>{branch}</option>
))}

</select>
</label>

{/* Button */}
<div className="flex items-end">
<button
onClick={()=>{
if(selectedBranch){
localStorage.setItem("scs-location", selectedBranch);
window.dispatchEvent(new Event("locationChange"));
}
}}
className="flex w-full items-center justify-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-6 py-3 font-semibold text-white shadow-[0_16px_35px_rgba(13,59,102,0.25)] transition hover:-translate-y-0.5 hover:bg-[hsl(var(--accent))]"
>
<Search className="h-4 w-4"/>
Find School
</button>
</div>

</div>

            {/* Popular Locations */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="text-[hsl(var(--primary))] font-semibold">
                Popular Locations:
              </span>

              {["Hyderabad", "Bengaluru", "Chennai", "Mumbai", "Delhi"].map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[hsl(var(--primary))]"
                >
                  <MapPin className="h-4 w-4 text-[hsl(var(--accent))]" />
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
