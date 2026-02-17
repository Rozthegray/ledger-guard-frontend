"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Zap, 
  Menu,
  Globe,
  Clock,
  CheckCircle2,
  Briefcase, 
  Users,
  ChevronDown,
  Quote, 
  ArrowRight
} from "lucide-react";
import { motion, Variants, useScroll, useTransform } from "framer-motion"; 
import { useState, useRef } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

// --- ANIMATION VARIANTS ---

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

// --- TESTIMONIAL DATA & COMPONENTS ---

const testimonials = [
  {
    quote: "Ledger Guard made my finances feel simple. Everything's in one place.",
    author: "Alex T.",
    role: "Product Manager",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "It's the only finance tool I open daily — and actually enjoy using.",
    author: "Marco G.",
    role: "Freelance Developer",
    img: "https://randomuser.me/api/portraits/men/12.jpg"
  },
  {
    quote: "Finally a tool that understands how I think about money.",
    author: "Sarah J.",
    role: "Digital Marketer",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "The automated categorization is a game changer for my taxes.",
    author: "David L.",
    role: "Consultant",
    img: "https://randomuser.me/api/portraits/men/86.jpg"
  },
  {
    quote: "I stopped using spreadsheets completely after one week.",
    author: "Emily R.",
    role: "Designer",
    img: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    quote: "Clean, fast, and actually beautiful to look at.",
    author: "Michael B.",
    role: "Architect",
    img: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];



const ReviewCard = ({ t }: { t: any }) => (
  <div className="flex-shrink-0 w-[90vw] md:w-[450px] bg-[#1A1F26] rounded-[32px] rounded-2xl p-8 md:rounded-[32px]  flex flex-col justify-between hover:border-[#B6FF3B]/20 transition-colors relative overflow-hidden group h-full shadow-2xl snap-center">
    
    <div className="absolute -top-10 -right-10 w-24 h-24 md:w-32 md:h-32 bg-[#B6FF3B]/5 rounded-full blur-3xl group-hover:bg-[#B6FF3B]/10 transition-colors"></div>

    <div className="relative z-10">
      <Quote className="text-[#B6FF3B]/20 h-6 w-6 md:h-8 md:w-8 mb-4 md:mb-6 fill-current" />
      <p className="text-slate-200 text-base md:text-lg font-medium leading-relaxed">
        "{t.quote}"
      </p>
    </div>

    <div className="flex items-center gap-4 mt-6 md:mt-8 relative z-10">
      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-slate-700 overflow-hidden border border-white/10">
        <img src={t.img} alt={t.author} className="w-full h-full object-cover" />
      </div>
      <div>
        <h5 className="text-white font-bold text-sm">{t.author}</h5>
        <p className="text-slate-500 text-xs">{t.role}</p>
      </div>
    </div>
  </div>
);

const MarqueeRow = ({ reviews, duration = 40, reverse = false }: { reviews: any[], duration?: number, reverse?: boolean }) => {
  return (
    <div className="relative flex overflow-hidden w-full py-4"> 
      <motion.div
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear"
        }}
        className="flex flex-row gap-6 pr-6" 
      >
        {[...reviews, ...reviews].map((t, i) => (
          <ReviewCard key={i} t={t} />
        ))}
      </motion.div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Ref for Parallax Effect attached to the HERO section
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"], // Track from top of screen to bottom of section
  });
  
  // FIXED: Parallax Y movement reversed. 
  // As scroll progress goes 0 -> 1, Y goes 0 -> -150px (moves UP)
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]); 
  
  // Opacity fade out on scroll remains the same
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);


  const toggleFaq = (i: number) => {
    setOpenFaq(openFaq === i ? null : i);
  };

  const row1 = testimonials;
  const row2 = [...testimonials].reverse(); 

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#E9EEF5] font-sans selection:bg-[#B6FF3B] selection:text-black overflow-x-hidden">
      
      {/* 1. HEADER */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0B0D10]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-[#B6FF3B] rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-black h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Ledger Guard</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link href="#solutions" className="hover:text-[#B6FF3B] transition-colors">Solutions</Link>
            <Link href="#why-us" className="hover:text-[#B6FF3B] transition-colors">Why Us?</Link>
            <Link href="#faq" className="hover:text-[#B6FF3B] transition-colors">FAQ</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-[#B6FF3B] hover:bg-transparent">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold rounded-full px-6 transition-transform hover:scale-105">
                Create Account
              </Button>
            </Link>
            <Menu className="md:hidden text-white cursor-pointer" />
          </div>
        </div>
      </header>

      <SiteHeader />

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden" ref={heroRef}>
        <div className="container mx-auto px-6">
          
          {/* Text Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B6FF3B]/10 border border-[#B6FF3B]/20 text-[#B6FF3B] text-xs font-bold uppercase tracking-wide">
              <Zap className="h-3 w-3" />
              <span>AI-Powered Auditing v1.0</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
              Secure Your <br />
              <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-[#B6FF3B] to-emerald-400">
                Financial Future
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              Stop guessing your runway. We ingest messy bank statements, audit transactions, and forecast cash flow with 99% AI precision.
            </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 mb-12">
              <Link href="/dashboard/upload">
                <Button className="h-14 px-8 bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold text-lg rounded-full w-full sm:w-auto shadow-[0_0_20px_rgba(182,255,59,0.3)] transition-transform hover:scale-105">
                  Start Audit Now
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* 3D HERO IMAGE WITH BLUR & GLOW */}
          {/*  FIXED: Increased margin-top for spacing from CTA */}
          <div className="mt-32 md:mt-40 relative max-w-5xl mx-auto" style={{ perspective: "1000px" }}> 
            
            {/* The Neon Glow Behind */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex justify-center z-20 pointer-events-none hover:bg-[#a2ff00]">
  {/* Layer 1: The Atmosphere (Wide & Soft) */}
  <div className="absolute -top-20 w-[80%] h-[400px] bg-[#B6FF3B]/30 blur-[140px] hover:bg-[#a2ff00] rounded-full"></div>
  
  {/* Layer 2: The Core (Tight & Bright) */}
  <div className="absolute -top-32 w-[60%] h-[250px] bg-[#B6FF3B] blur-[80px] hover:bg-[#a2ff00] rounded-full opacity-80 mix-blend-screen"></div>
</div>

            <motion.div 
               initial={{ opacity: 0, rotateX: 25, y: 100, scale: 0.9 }} // Start tilted back
               whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }} // Animate to flat
               viewport={{ once: true, margin: "-100px" }} // Trigger earlier
               transition={{ 
                 duration: 1.4, 
                 type: "spring", 
                 bounce: 0.1, 
                 damping: 20 
               }}
               // Apply the reversed parallax Y and opacity
               style={{ y, opacity }} 
               className="relative z-10 rounded-2xl border border-white/10 bg-[#1A1F26]/50 p-2 shadow-2xl backdrop-blur-sm"
            >
               <Image 
                 src="/dashboard-preview.png" 
                 alt="Ledger Guard Dashboard" 
                 width={1400} 
                 height={900}
                 className="w-full h-auto rounded-xl border border-white/5 shadow-inner"
                 priority
               />

               {/* The Bottom Fade Mask */}
               <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[#0B0D10] from-5% via-transparent to-transparent h-full w-full"></div>
            </motion.div>
          </div>

          {/* Metric Boxes */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            className="grid md:grid-cols-3 gap-6 pt-20 border-t border-white/10 mt-20"
          >
             <div className="bg-[#1A1F26] p-6 rounded-xl flex flex-col items-center text-center hover:border-[#B6FF3B]/50 transition-colors">
                <p className="text-slate-400 text-sm uppercase tracking-wider mb-2 text-white">AI Precision</p>
                <h3 className="text-3xl font-bold text-[#B6FF3B]">99.8%</h3>
                <p className="text-xs text-slate-500 mt-2 text-white">Accuracy in Anomaly Detection</p>
             </div>
             <div className="bg-[#1A1F26] p-6 rounded-xl flex flex-col items-center text-center hover:border-[#B6FF3B]/50 transition-colors">
                <p className="text-slate-400 text-sm uppercase tracking-wider mb-2 text-white">Processing Speed</p>
                <h3 className="text-3xl font-bold text-[#B6FF3B]">70%</h3>
                <p className="text-xs text-slate-500 mt-2 text-white">Faster than Manual Audits</p>
             </div>
             <div className="bg-[#1A1F26] p-6 rounded-xl flex flex-col items-center text-center hover:border-[#B6FF3B]/50 transition-colors">
                <p className="text-slate-400 text-sm uppercase tracking-wider mb-2 text-white">Compliance Tracking</p>
                <h3 className="text-3xl font-bold text-[#B6FF3B]">100%</h3>
                <p className="text-xs text-slate-500 mt-2 text-white">Audit Log Retention</p>
             </div>
          </motion.div>
        </div>
      </section>

     {/* 2.5 HOW IT WORKS (Updated BG #050505 & Radius) */}
      <section className="py-24 bg-[#0B0D10] relative overflow-hidden">
        <div className="container mx-auto px-6">
          
          {/* Section Header */}
          <div className="mb-20">
            <div className="flex items-center gap-2 text-[#B6FF3B] mb-6 cursor-pointer hover:opacity-80 transition-opacity w-fit">
              <div className="h-8 w-8 rounded-full bg-[#B6FF3B]/10 flex items-center justify-center border border-[#B6FF3B]/20">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <span className="font-bold text-sm tracking-wide uppercase">Watch video</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">How Ledger Guard works</h2>
          </div>

          {/* 3-Column Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="grid md:grid-cols-3 gap-8"
          >
            
            {/* --- STEP 1: CREATE ACCOUNT --- */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
              }}
              // 🟢 UPDATED: bg-[#050505] and rounded-[32px]
              className="bg-[#1A1F26] rounded-[32px] rounded-2xl p-8   hover:border-[#B6FF3B]/20 transition-colors group relative overflow-hidden flex flex-col"
            >
              {/* IMAGE CONTAINER */}
              <div className="h-[240px] w-full bg-[#0B0D10] rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden border border-white/5 p-6">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#B6FF3B]/5 to-transparent opacity-40"></div>
                 
                 <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out">
                   <Image 
                     src="/step1-card.png" 
                     alt="Create Account" 
                     width={500} 
                     height={300}
                     className="w-full h-full object-contain drop-shadow-2xl"
                     priority
                   />
                 </div>
              </div>

              <div className="mt-auto">
                <div className="inline-block px-3 py-1 rounded-full border border-[#B6FF3B]/30 text-[#B6FF3B] text-xs font-bold mb-5 shadow-[0_0_10px_-5px_#B6FF3B]">
                  Step 1
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Create account</h3>
                <p className="text-slate-400 leading-relaxed text-sm ">Sign up in seconds. Secure your workspace and invite your team members to collaborate.</p>
              </div>
            </motion.div>

            {/* --- STEP 2: UPLOAD STATEMENT --- */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
              }}
              // 🟢 UPDATED: bg-[#050505] and rounded-[32px]
              className="bg-[#1A1F26] rounded-[32px] rounded-2xl p-8   hover:border-[#B6FF3B]/20 transition-colors group relative overflow-hidden flex flex-col"
            >
              {/* IMAGE CONTAINER */}
              <div className="h-[240px] w-full bg-[#0B0D10] rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden border border-white/5 p-6">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#B6FF3B]/5 to-transparent opacity-40"></div>
                 
                 <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out">
                   <Image 
                     src="/step2-chart.png" 
                     alt="Upload Statement" 
                     width={500} 
                     height={300}
                     className="w-full h-full object-contain drop-shadow-2xl"
                   />
                 </div>
              </div>

              <div className="mt-auto">
                <div className="inline-block px-3 py-1 rounded-full border border-[#B6FF3B]/30 text-[#B6FF3B] text-xs font-bold mb-5 shadow-[0_0_10px_-5px_#B6FF3B]">
                  Step 2
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Upload bank statement</h3>
                <p className="text-slate-400 leading-relaxed text-sm">Simply drag and drop your PDF statements. We support all major Nigerian banks and generic formats.</p>
              </div>
            </motion.div>

            {/* --- STEP 3: AUDIT & FORECAST --- */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
              }}
              //  UPDATED: bg-[#050505] and rounded-[32px]
              className="bg-[#1A1F26] rounded-[32px] rounded-2xl p-8   hover:border-[#B6FF3B]/20 transition-colors group relative overflow-hidden flex flex-col"
            >
              {/* IMAGE CONTAINER */}
              <div className="h-[240px] w-full bg-[#0B0D10] rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden border border-white/5 p-6">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#B6FF3B]/5 to-transparent opacity-40"></div>
                 
                 <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out">
                   <Image 
                     src="/step3-audit.png" 
                     alt="Get Forecast" 
                     width={500} 
                     height={300}
                     className="w-full h-full object-contain drop-shadow-2xl"
                   />
                 </div>
              </div>

              <div className="mt-auto">
                <div className="inline-block px-3 py-1 rounded-full border border-[#B6FF3B]/30 text-[#B6FF3B] text-xs font-bold mb-5 shadow-[0_0_10px_-5px_#B6FF3B]">
                  Step 3
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Get audit & forecast</h3>
                <p className="text-slate-400 leading-relaxed text-sm">Instantly receive a detailed AI audit, uncover hidden fees, and see your 90-day cash flow runway.</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      <div className="py-3 border-y border-white/5 bg-[#0F1216]  overflow-hidden relative">
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#0F1216] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#0F1216] to-transparent z-10 pointer-events-none"></div>

        <div className="flex">
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex gap-16 items-center flex-shrink-0 pr-16"
          >
            {/* Render the brand list TWICE to create a seamless infinite loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="h-8 w-8 bg-emerald-500/10 rounded flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <div className="h-4 w-4 bg-emerald-500 rounded-full"></div>
                  </div>
                  <span className="text-xl font-bold text-slate-500 group-hover:text-emerald-400 transition-colors">NOVUS</span>
                </div>

                <div className="flex items-center gap-2 group cursor-pointer">
                  <Globe className="h-6 w-6 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  <span className="text-xl font-bold text-slate-500 group-hover:text-blue-400 transition-colors">APEX <span className="font-light text-slate-600">FINANCE</span></span>
                </div>

                {/* Brand 3: Echo */}
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="h-6 w-6 border-2 border-slate-600 rounded-full group-hover:border-purple-400 transition-colors"></div>
                  <span className="text-xl font-bold text-slate-500 group-hover:text-purple-400 transition-colors">echo_labs</span>
                </div>

                {/* Brand 4: Bolt */}
                <div className="flex items-center gap-2 group cursor-pointer">
                  <Zap className="h-6 w-6 text-slate-600 group-hover:text-yellow-400 transition-colors" fill="currentColor" />
                  <span className="text-xl font-bold text-slate-500 group-hover:text-yellow-400 transition-colors">BOLTSHIFT</span>
                </div>

                {/* Brand 5: Vertex */}
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="h-6 w-6 bg-slate-700 rotate-45 group-hover:bg-orange-500/80 transition-colors"></div>
                  <span className="text-xl font-bold text-slate-500 group-hover:text-orange-400 transition-colors">VERTEX</span>
                </div>

                {/* Brand 6: Orbit */}
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="flex -space-x-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="h-5 w-5 rounded-full bg-cyan-500"></div>
                    <div className="h-5 w-5 rounded-full bg-blue-600"></div>
                  </div>
                  <span className="text-xl font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">ORBIT</span>
                </div>

                {/* Brand 7: Cipher */}
                <div className="flex items-center gap-2 group cursor-pointer">
                  <span className="text-2xl font-mono font-bold text-slate-600 group-hover:text-white transition-colors">{`{ }`}</span>
                  <span className="text-xl font-bold text-slate-500 group-hover:text-white transition-colors">Cipher</span>
                </div>


              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 4. WHAT TO EXPECT */}
      <section id="expectations" className="py-24 bg-[#0B0D10]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text List */}
            <motion.div
               initial="hidden"
               whileInView="visible"
               variants={slideLeft}
               viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                What to expect from <span className="text-[#B6FF3B]">Ledger Guard</span>
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Precision Audits", text: "We analyze every single line item using LLMs." },
                  { title: "Fraud Detection", text: "Catch anomalies and spikes before they cost you." },
                  { title: "Cash Forecasting", text: "Know your exact runway down to the day." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 h-8 w-8 rounded-full bg-[#1A1F26] border border-[#B6FF3B]/30 flex items-center justify-center text-[#B6FF3B] shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{item.title}</h4>
                      <p className="text-slate-400 mt-1">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Stats Grid */}
            <motion.div 
               className="grid grid-cols-2 gap-4 sm:gap-6"
               initial="hidden"
               whileInView="visible"
               variants={slideRight}
               viewport={{ once: true }}
            >
              <div className="bg-[#1A1F26] p-4 sm:p-8 rounded-2xl border border-white/5 hover:border-[#B6FF3B] transition-colors group flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl sm:text-4xl font-bold text-white group-hover:text-[#B6FF3B]">1,000+</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 break-words">Statements/Day</p>
              </div>
              <div className="bg-[#1A1F26] p-4 sm:p-8 rounded-2xl border border-white/5 hover:border-[#B6FF3B] transition-colors group mt-0 sm:mt-8 flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl sm:text-4xl font-bold text-white group-hover:text-[#B6FF3B]">10k+</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">Active Users</p>
              </div>
              <div className="bg-[#1A1F26] p-4 sm:p-8 rounded-2xl border border-white/5 hover:border-[#B6FF3B] transition-colors group flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl sm:text-4xl font-bold text-white group-hover:text-[#B6FF3B]">5,000+</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 break-words">Anomalies Caught</p>
              </div>
              <div className="bg-[#1A1F26] p-4 sm:p-8 rounded-2xl border border-white/5 hover:border-[#B6FF3B] transition-colors group mt-0 sm:mt-8 flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl sm:text-4xl font-bold text-white group-hover:text-[#B6FF3B]">20+</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 break-words">Bank Integrations</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. SOLUTIONS SECTION */}
      <section id="solutions" className="py-24 bg-[#0B0D10] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Solutions</h2>
            <div className="h-1 w-20 bg-[#B6FF3B] mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-32">
            
            {/* SOLUTION 1 */}
            <motion.div 
               initial="hidden"
               whileInView="visible"
               variants={fadeInUp}
               className="flex flex-col gap-8"
            >
               <div>
                  <div className="mb-3 flex items-center gap-2 text-[#B6FF3B]">
                    <Briefcase className="h-5 w-5" />
                    <span className="font-bold uppercase tracking-wider text-sm">Solution 01</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Intelligent Audit Engine</h3>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">
                      Ingest thousands of transaction lines from messy PDFs. Our Llama-3 model categorizes spending, normalizes vendor names, and hunts for fraud.
                  </p>
               </div>

               <div className="w-full bg-[#1A1F26] border border-white/10 rounded-2xl h-[300px] flex flex-col relative overflow-hidden shadow-2xl p-6 group">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      </div>
                      <div className="text-xs text-slate-500 font-mono">AUDIT_LOG_V2.JSON</div>
                  </div>
                  <div className="space-y-3 font-mono text-sm">
                      <div className="flex justify-between text-slate-500 opacity-50"><span className="w-1/4">DATE</span><span className="w-1/4">VENDOR</span><span className="w-1/4 text-right">AMOUNT</span></div>
                      <div className="flex justify-between text-slate-300"><span className="w-1/4">2026-02-01</span><span className="w-1/4">AWS Services</span><span className="w-1/4 text-right">-$240.00</span></div>
                      <div className="flex justify-between text-red-300 bg-red-900/10 p-2 rounded border-l-2 border-red-500 animate-pulse">
                        <span className="w-1/4">2026-02-03</span>
                        <span className="w-1/4">Unknown Transfer</span>
                        <span className="w-1/4 text-right">-$5,000.00</span>
                        <span className="absolute right-4 text-xs font-bold bg-red-500 text-black px-2 rounded">ALERT</span>
                      </div>
                      <div className="flex justify-between text-slate-300"><span className="w-1/4">2026-02-04</span><span className="w-1/4">Uber Ride</span><span className="w-1/4 text-right">-$15.00</span></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F26] via-transparent to-transparent pointer-events-none"></div>
               </div>

               <div className="grid sm:grid-cols-3 gap-6">
                  {["Automatic Duplicate Detection", "Vendor Normalization", "High-Risk Anomaly Flags"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-[#1A1F26]/50 p-4 rounded-lg border border-white/5">
                         <CheckCircle2 className="h-5 w-5 text-[#B6FF3B] shrink-0" />
                         <span className="text-slate-300 text-sm font-medium">{item}</span>
                      </div>
                  ))}
               </div>
            </motion.div>

            {/* SOLUTION 2 */}
            <motion.div 
               initial="hidden"
               whileInView="visible"
               variants={fadeInUp}
               className="flex flex-col gap-8"
            >
               <div>
                  <div className="mb-3 flex items-center gap-2 text-[#B6FF3B]">
                    <Users className="h-5 w-5" />
                    <span className="font-bold uppercase tracking-wider text-sm">Solution 02</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Runway Forecasting</h3>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">
                      Stop flying blind. Our Prophet model analyzes your daily burn rate to predict exactly when your cash will hit zero.
                  </p>
               </div>

               <div className="w-full bg-[#1A1F26] border border-white/10 rounded-2xl h-[300px] relative overflow-hidden shadow-2xl group">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#B6FF3B]/5 via-[#0B0D10]/0 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-2/3 px-8 flex items-end gap-1">
                      {[40, 38, 35, 36, 32, 28, 25, 22, 20, 15, 10, 5, 0].map((h, i) => (
                         <motion.div 
                           key={i}
                           initial={{ height: 0 }}
                           whileInView={{ height: `${h + 20}%` }}
                           transition={{ duration: 1, delay: i * 0.05 }}
                           className="w-full bg-slate-800/50 rounded-t-sm relative"
                         >
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#B6FF3B] shadow-[0_0_10px_#B6FF3B]"></div>
                         </motion.div>
                      ))}
                  </div>
                  <div className="absolute top-6 left-8">
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Projected Runway</div>
                      <div className="text-3xl font-bold text-white">42 Days Left</div>
                  </div>
                  <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-[#B6FF3B] text-black text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer">
                        View Prophet Chart <ArrowRight className="h-3 w-3" />
                      </div>
                  </div>
               </div>

               <div className="grid sm:grid-cols-3 gap-6">
                  {["90-Day Cash Flow Projection", "Burn Rate Calculation", "Zero-Date Alerts"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-[#1A1F26]/50 p-4 rounded-lg border border-white/5">
                         <CheckCircle2 className="h-5 w-5 text-[#B6FF3B] shrink-0" />
                         <span className="text-slate-300 text-sm font-medium">{item}</span>
                      </div>
                  ))}
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6. WHY LEDGER GUARD */}
      <section id="why-us" className="py-24 bg-[#0F1216] border-y border-white/5">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Why Ledger Guard?</h2>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#0B0D10] p-8 rounded-2xl hover:border-[#B6FF3B]/50 transition-all">
                 <div className="h-12 w-12 bg-[#1A1F26] rounded-xl flex items-center justify-center mb-6 text-[#B6FF3B]">
                    <Zap className="h-6 w-6" />
                 </div>
                 <h4 className="text-xl font-bold text-white mb-3">Speed</h4>
                 <p className="text-slate-400 text-white">Process 1,000+ transaction lines in under 60 seconds.</p>
              </div>
              <div className="bg-[#0B0D10] p-8 rounded-2xl  hover:border-[#B6FF3B]/50 transition-all">
                 <div className="h-12 w-12 bg-[#1A1F26] rounded-xl flex items-center justify-center mb-6 text-[#B6FF3B]">
                    <Clock className="h-6 w-6" />
                 </div>
                 <h4 className="text-xl font-bold text-white mb-3">Flow</h4>
                 <p className="text-slate-400 text-white">Seamlessly integrates with your existing workflow via PDF upload.</p>
              </div>
              <div className="bg-[#0B0D10] p-8 rounded-2xl  hover:border-[#B6FF3B]/50 transition-all">
                 <div className="h-12 w-12 bg-[#1A1F26] rounded-xl flex items-center justify-center mb-6 text-[#B6FF3B]">
                    <CheckCircle2 className="h-6 w-6" />
                 </div>
                 <h4 className="text-xl font-bold text-white mb-3">Precision</h4>
                 <p className="text-slate-400 text-white">99.8% accuracy on categorization and anomaly detection.</p>
              </div>
           </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS (Horizontal Marquee) */}
      <section className="py-24 bg-[#0B0D10] border-b border-white/5 relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A1F26] via-[#0B0D10] to-[#0B0D10] opacity-50 pointer-events-none"></div>
        
        <div className="container mx-auto relative z-10 ">
          <div className="text-center mb-20 px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Loved by individuals and small teams</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-white">People across industries trust Ledger Guard to manage money, reduce stress, and make smarter decisions.</p>
          </div>

          {/* Marquee Container */}
          <div className="relative w-full max-w-[100vw] overflow-hidden ">
            
            {/* --- THE BLACK BLUR FADE --- */}
            {/* Left Fade Mask: WIDE, BLACK, and BLURRED */}
            <div className="absolute top-0 left-0 w-32 md:w-80 h-full bg-gradient-to-r from-[#0B0D10] via-[#0B0D10] to-transparent z-20 pointer-events-none backdrop-blur-xl"></div>
            
            {/* Right Fade Mask: WIDE, BLACK, and BLURRED */}
            <div className="absolute top-0 right-0 w-32 md:w-80 h-full bg-gradient-to-l from-[#0B0D10] via-[#0B0D10] to-transparent z-20 pointer-events-none backdrop-blur-xl"></div>

            {/* Container for the two rows with vertical spacing */}
            <div className="flex flex-col space-y-12 ">
              
              {/* Row 1: Scrolling Left */}
              <MarqueeRow reviews={row1} duration={60} />

              {/* Row 2: Scrolling Right (Reverse) */}
              <MarqueeRow reviews={row2} duration={70} reverse={true} />

            </div>
            
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section id="faq" className="py-24 bg-[#0B0D10]">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is my financial data secure?", a: "Yes. We use AES-256 encryption. Your files are processed in volatile memory and deleted immediately after analysis." },
              { q: "Does it work with Nigerian bank statements?", a: "Absolutely. Our model is trained on Opay, Moniepoint, GTBank, and Zenith Bank statement formats." },
              { q: "Can I export reports to Excel?", a: "Yes. You can download a structured CSV or a professional PDF report with one click." },
              { q: "How accurate is the AI forecasting?", a: "We use the Prophet time-series model which is 95-99% accurate for short-term (30-90 day) cash flow predictions." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                className="bg-[#1A1F26] rounded-lg border border-white/5 overflow-hidden group"
              >
                <div 
                  onClick={() => toggleFaq(i)}
                  className="p-6 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-slate-200 group-hover:text-[#B6FF3B] transition-colors">{item.q}</span>
                  <ChevronDown className={`h-5 w-5 text-[#B6FF3B] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </div>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-slate-400 text-sm animate-accordion-down">
                    {item.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <SiteFooter />
    </div>
  );
}