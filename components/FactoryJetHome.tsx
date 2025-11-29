import React, { useState } from 'react';
import { 
  CheckCircle2, ArrowRight, Star, Globe, Zap, 
  ShoppingBag, Shield, Clock, BarChart3, ChevronDown, 
  Menu, X, Phone, Mail, MapPin, ExternalLink,
  Smartphone, Layout, Search, MousePointerClick
} from 'lucide-react';
import { PricingTier, FaqItem, ProcessStep, CaseStudy, Testimonial } from '../types';

// --- DATA CONSTANTS (Strictly from Markdown) ---

const TRUST_INDICATORS = [
  "Trusted by 500+ businesses across India",
  "25+ years of combined web expertise",
  "98% client satisfaction rate",
  "7-day delivery guarantee (Standard)",
  "Complete SEO, GEO, AEO, AIO optimization",
  "₹100+ crore business value generated"
];

const WHY_CHOOSE = [
  {
    title: "SMB-Focused Expertise",
    content: "Unlike large agencies focused on enterprise clients, we specialize in small and medium businesses. We understand budget constraints, need for quick turnaround, and measurable ROI. Better value, faster delivery.",
    icon: <Globe className="w-6 h-6 text-brand-primary" />,
    span: "col-span-1 md:col-span-2"
  },
  {
    title: "Web & E-Commerce Only",
    content: "We focus exclusively on what we do best: Deep expertise in website design and e-commerce platforms. 500+ successful projects.",
    icon: <Layout className="w-6 h-6 text-brand-secondary" />,
    span: "col-span-1"
  },
  {
    title: "7-Day Delivery Guarantee",
    content: "Standard websites in 7 days. E-commerce in 4-8 weeks. No compromises on quality despite fast turnaround. Get to market faster.",
    icon: <Clock className="w-6 h-6 text-brand-primary" />,
    span: "col-span-1"
  },
  {
    title: "Complete Optimization",
    content: "SEO (Google), GEO (AI Search), AEO (Answer Engines), and AIO (ChatGPT/Gemini) optimized. Maximum visibility across all channels.",
    icon: <Search className="w-6 h-6 text-brand-secondary" />,
    span: "col-span-1 md:col-span-2"
  },
  {
    title: "Affordable Pricing",
    content: "Competitive pricing for SMBs. Clear tiers starting at ₹29,999. No hidden fees. Predictable investment.",
    icon: <BarChart3 className="w-6 h-6 text-brand-primary" />,
    span: "col-span-1"
  },
  {
    title: "Ongoing Support",
    content: "AMCs starting at ₹2,999/month. Regular updates, security patches, and performance monitoring.",
    icon: <Shield className="w-6 h-6 text-brand-secondary" />,
    span: "col-span-1"
  }
];

const PROCESS_STEPS: ProcessStep[] = [
  { step: "01", title: "Discovery & Strategy", description: ["Understand goals", "Analyze competitors", "Define scope"], duration: "Week 1" },
  { step: "02", title: "Design & Prototyping", description: ["Wireframes", "Custom UI/UX", "Visual refinement"], duration: "Week 1-2" },
  { step: "03", title: "Development & Build", description: ["Responsive front-end", "Back-end logic", "SEO implementation"], duration: "Week 2-4" },
  { step: "04", title: "Content & Optimization", description: ["Catalog setup", "Image optimization", "Analytics config"], duration: "Week 3-4" },
  { step: "05", title: "Testing & QA", description: ["Cross-browser test", "Mobile responsiveness", "Security check"], duration: "Week 4" },
  { step: "06", title: "Launch & Deployment", description: ["Domain setup", "SSL config", "Go live!"], duration: "Week 4-5" },
  { step: "07", title: "Post-Launch Support", description: ["Performance monitor", "Training", "Maintenance"], duration: "Ongoing" },
];

const WEB_PRICING: PricingTier[] = [
  {
    name: "Starter Package",
    price: "₹29,999",
    features: ["5-page responsive website", "Mobile-optimized design", "Basic SEO optimization", "Contact form integration", "1 revision round", "7-day delivery", "30-day support"]
  },
  {
    name: "Professional Package",
    price: "₹79,999",
    popular: true,
    features: ["10-15 page responsive website", "Custom UI/UX design", "Advanced SEO optimization", "Google Analytics integration", "Lead capture forms", "Blog setup", "3 revision rounds", "14-day delivery", "90-day support", "3-month AMC included"]
  },
  {
    name: "Enterprise Package",
    price: "₹1,49,999",
    features: ["Unlimited pages", "Premium custom design", "Complete SEO/GEO/AEO/AIO", "Advanced animations", "Custom functionality", "Priority support", "Unlimited revisions", "21-day delivery", "180-day support", "6-month AMC included"]
  }
];

const ECOM_PRICING = [
  { name: "Shopify Store", price: "Starts ₹75,000", details: "Custom theme, 50 products, Payment/Shipping setup. 4-6 weeks." },
  { name: "WooCommerce", price: "Starts ₹60,000", details: "WordPress setup, Custom theme, 50 products. 6-8 weeks." },
  { name: "Magento Store", price: "Starts ₹5,00,000", details: "Enterprise setup, Multi-store, Advanced features. 12-16 weeks." },
  { name: "Custom E-Com", price: "Starts ₹10,00,000", details: "Fully custom platform, Scalable architecture. Timeline varies." }
];

const AMC_PRICING = [
  { name: "Basic", price: "₹2,999/mo", details: "Monthly backups, Security updates, Email support" },
  { name: "Standard", price: "₹4,999/mo", details: "Weekly backups, Performance opt, 2hr content updates" },
  { name: "Premium", price: "₹9,999/mo", details: "Daily backups, 5hr content updates, Feature enhancements" },
  { name: "Enterprise", price: "₹14,999/mo", details: "Real-time backups, Dedicated manager, Unlimited content updates" }
];

const INDUSTRIES = [
  "Retail & E-Commerce", "Food & Beverage", "Fashion & Beauty", "Healthcare & Medical",
  "Real Estate & Construction", "Education & E-Learning", "Manufacturing & B2B",
  "Professional Services", "Technology & SaaS", "Automotive"
];

const PORTFOLIO: CaseStudy[] = [
  { title: "StyleNova", client: "D2C Fashion Brand", metric: "180% Revenue Increase", description: "₹2.5 crore first-year revenue, 65% reduced marketing costs.", image: "https://picsum.photos/600/400?random=1" },
  { title: "Industrial Parts", client: "B2B Distributor", metric: "60% Order Increase", description: "B2B WooCommerce portal reduced sales team workload by 40%.", image: "https://picsum.photos/600/400?random=2" },
  { title: "Tandoori Tales", client: "Restaurant Chain", metric: "35% More Orders", description: "Custom quick-commerce app. 28% growth in delivery orders.", image: "https://picsum.photos/600/400?random=3" },
  { title: "HomeStyle", client: "Decor Marketplace", metric: "₹12 Cr Revenue", description: "Multi-vendor marketplace with 50,000+ products.", image: "https://picsum.photos/600/400?random=4" }
];

const TESTIMONIALS: Testimonial[] = [
  { text: "FactoryJet built our e-commerce store in 6 weeks and we've done ₹5 crore in revenue in the first year.", author: "Priya Sharma", role: "Founder, StyleNova Fashion" },
  { text: "We needed a professional B2B portal fast. FactoryJet delivered in 3 weeks and our distributors love it.", author: "Rajesh Kumar", role: "Sales Director, Industrial Components Ltd." },
  { text: "The website FactoryJet built for us looks world-class. We're getting 5x more inquiries than before.", author: "Dr. Amit Patel", role: "Clinic Director, HealthFirst Diagnostics" },
  { text: "Best decision we made. They understood our quick-commerce model and built exactly what we needed.", author: "Mohammed Ali", role: "CEO, Tandoori Tales" },
  { text: "Professional, fast, affordable. Our new website ranks on page 1 of Google within 3 months.", author: "Neha Gupta", role: "Marketing Manager, TechSolutions Pvt Ltd" }
];

const FAQS: FaqItem[] = [
  { question: "How long does it take to build a website?", answer: "Standard websites take 7-14 days. Complex websites take 14-21 days. E-commerce stores take 4-12 weeks depending on platform and scale." },
  { question: "Do you provide hosting and domain?", answer: "Yes, we can provide hosting starting at ₹500/month or you can use your own. We help with setup either way." },
  { question: "Can I update the website myself?", answer: "Yes! We build on user-friendly platforms like WordPress, Shopify, and Webflow. We provide training and documentation." },
  { question: "Why are your prices lower than other agencies?", answer: "We're SMB specialists with streamlined processes and AI-enhanced workflows. We focus on efficiency without compromising quality." },
  { question: "Will my website be SEO-optimized?", answer: "Yes. All our websites include SEO optimization: fast loading, proper structure, meta tags, schema markup, and XML sitemap." },
  { question: "Which e-commerce platform is best for me?", answer: "Depends on your needs: Shopify for quick launch, WooCommerce for customization/cost, Magento for enterprise. We'll recommend based on your goals." }
];

// --- UI COMPONENTS ---

const GlassCard: React.FC<{ children: React.ReactNode; className?: string; hoverEffect?: boolean }> = ({ children, className = "", hoverEffect = true }) => (
  <div className={`bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 md:p-8 ${hoverEffect ? 'hover:transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300' : ''} ${className}`}>
    {children}
  </div>
);

const GradientButton: React.FC<{ children: React.ReactNode; primary?: boolean; className?: string }> = ({ children, primary = true, className = "" }) => (
  <button className={`px-8 py-4 rounded-full font-bold text-lg tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg ${
    primary 
      ? 'bg-gradient-to-r from-brand-primary to-blue-600 text-white hover:shadow-brand-primary/50' 
      : 'bg-white text-brand-primary border-2 border-brand-primary/20 hover:border-brand-primary hover:bg-slate-50'
  } ${className}`}>
    {children}
  </button>
);

const SectionHeading: React.FC<{ title: string; subtitle?: string; align?: 'left' | 'center' }> = ({ title, subtitle, align = 'center' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'} relative z-10`}>
    <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4 tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
    <div className={`h-1.5 w-24 bg-brand-secondary rounded-full mt-6 ${align === 'center' ? 'mx-auto' : ''}`}></div>
  </div>
);

const AuroraBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
    <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-brand-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold font-heading text-xl">FJ</div>
           <span className="text-2xl font-heading font-bold text-slate-900">FactoryJet</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-700">
          <a href="#services" className="hover:text-brand-primary transition-colors">Services</a>
          <a href="#process" className="hover:text-brand-primary transition-colors">Process</a>
          <a href="#portfolio" className="hover:text-brand-primary transition-colors">Portfolio</a>
          <a href="#pricing" className="hover:text-brand-primary transition-colors">Pricing</a>
          <a href="#contact" className="px-5 py-2.5 bg-brand-primary text-white rounded-full hover:bg-blue-700 transition-colors">Get Started</a>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl">
           <a href="#services" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Services</a>
           <a href="#portfolio" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Portfolio</a>
           <a href="#pricing" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Pricing</a>
           <a href="#contact" className="text-lg font-bold text-brand-primary" onClick={() => setIsOpen(false)}>Contact Us</a>
        </div>
      )}
    </nav>
  );
};

// --- MAIN PAGE COMPONENT ---

const FactoryJetHome: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="font-sans text-slate-900">
      <AuroraBackground />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-8 text-center overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-semibold text-sm tracking-wide uppercase">
             Trusted by 500+ Businesses
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-brand-primary to-slate-900 leading-[1.1]">
            Build World-Class Websites <br/> & E-Commerce Stores
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            FactoryJet is India's trusted partner for professional website design and e-commerce development. 
            We help 500+ small and medium businesses across India and emerging markets build high-converting 
            digital storefronts that attract customers and drive sales.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16">
            <GradientButton>Start Your Project</GradientButton>
            <GradientButton primary={false}>View Our Portfolio</GradientButton>
            <button className="text-slate-600 font-semibold hover:text-brand-primary underline underline-offset-4 decoration-2">
              Get Free Consultation
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
             {TRUST_INDICATORS.map((trust, i) => (
               <div key={i} className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/60 shadow-sm animate-float" style={{ animationDelay: `${i * 100}ms` }}>
                 <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                 <span className="text-sm font-medium text-slate-800 text-left">{trust}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 1: ABOUT */}
      <section className="py-20 px-4 md:px-8 relative">
        <div className="container mx-auto max-w-6xl">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="order-2 md:order-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-secondary blur-3xl opacity-20 transform -translate-x-10"></div>
                  <GlassCard className="relative z-10" hoverEffect={false}>
                    <h3 className="text-3xl font-heading font-bold mb-6">Who We Are</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      FactoryJet is a specialized web design and e-commerce development agency serving small and medium-sized businesses across India and emerging markets. We're not a large agency with enterprise price tags—we're SMB specialists.
                    </p>
                    <p className="font-semibold text-brand-primary italic text-lg border-l-4 border-brand-secondary pl-4 mb-6">
                      Founded on a simple principle: Every business deserves a world-class website that drives real results—without breaking the bank.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                         <div className="bg-blue-100 p-2 rounded-lg"><Layout className="w-5 h-5 text-brand-primary"/></div>
                         <div>
                           <h4 className="font-bold">Website Design & Development</h4>
                           <p className="text-sm text-slate-500">WordPress, Webflow, Custom. 7-day delivery.</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-3">
                         <div className="bg-orange-100 p-2 rounded-lg"><ShoppingBag className="w-5 h-5 text-brand-secondary"/></div>
                         <div>
                           <h4 className="font-bold">E-Commerce Store Development</h4>
                           <p className="text-sm text-slate-500">Shopify, WooCommerce, Quick-commerce. ROI focused.</p>
                         </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
             </div>
             <div className="order-1 md:order-2">
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">World-Class Tech.<br/>SMB Prices.</h2>
                <p className="text-lg text-slate-600 mb-8">
                  We specialize in two core services that form the foundation of digital success. From corporate websites to complex multi-vendor marketplaces, we build it all with a 7-day delivery guarantee for standard projects.
                </p>
                <div className="grid grid-cols-2 gap-6">
                   <div className="text-center p-4 bg-white/40 rounded-xl border border-white/50">
                     <div className="text-3xl font-bold text-brand-primary mb-1">25+</div>
                     <div className="text-sm text-slate-500">Years Experience</div>
                   </div>
                   <div className="text-center p-4 bg-white/40 rounded-xl border border-white/50">
                     <div className="text-3xl font-bold text-brand-secondary mb-1">500+</div>
                     <div className="text-sm text-slate-500">Happy Clients</div>
                   </div>
                   <div className="text-center p-4 bg-white/40 rounded-xl border border-white/50">
                     <div className="text-3xl font-bold text-brand-primary mb-1">7 Days</div>
                     <div className="text-sm text-slate-500">Delivery Guarantee</div>
                   </div>
                   <div className="text-center p-4 bg-white/40 rounded-xl border border-white/50">
                     <div className="text-3xl font-bold text-brand-secondary mb-1">₹100Cr+</div>
                     <div className="text-sm text-slate-500">Value Generated</div>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* SECTION 2: WHY CHOOSE - BENTO GRID */}
      <section className="py-20 px-4 md:px-8 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading title="Why Choose FactoryJet?" subtitle="Better value, faster delivery, solutions tailored to your actual needs and budget." />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_CHOOSE.map((item, idx) => (
              <div key={idx} className={`${item.span} bg-white rounded-3xl p-8 border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 group`}>
                <div className="mb-6 bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold font-heading mb-3 text-slate-800">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES */}
      <section id="services" className="py-24 px-4 md:px-8 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto max-w-6xl">
          <SectionHeading title="Our Services" subtitle="Specialized solutions for growth-focused businesses." />

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Service 1 */}
            <GlassCard className="border-t-4 border-t-brand-primary">
              <div className="bg-brand-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Layout className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-3xl font-heading font-bold mb-4">Website Design & Development</h3>
              <p className="text-slate-600 mb-8">
                Your website is your digital storefront. We build mobile-responsive, SEO-optimized websites that turn visitors into customers.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm font-medium"><Zap className="w-4 h-4 text-orange-500" /> Mobile-Optimized</div>
                <div className="flex items-center gap-2 text-sm font-medium"><Zap className="w-4 h-4 text-orange-500" /> SEO-Optimized</div>
                <div className="flex items-center gap-2 text-sm font-medium"><Zap className="w-4 h-4 text-orange-500" /> Fast-Loading</div>
                <div className="flex items-center gap-2 text-sm font-medium"><Zap className="w-4 h-4 text-orange-500" /> Conversion-Focused</div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-6">
                <h4 className="font-bold mb-2 text-sm uppercase text-slate-500">Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  {['WordPress', 'Webflow', 'Framer', 'Custom React/Next.js'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-slate-100 pt-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Investment</p>
                  <p className="text-2xl font-bold text-brand-primary">₹29k - ₹1.5L</p>
                </div>
                <button className="flex items-center gap-2 font-bold text-brand-primary hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4"/>
                </button>
              </div>
            </GlassCard>

            {/* Service 2 */}
            <GlassCard className="border-t-4 border-t-brand-secondary">
              <div className="bg-brand-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <ShoppingBag className="w-8 h-8 text-brand-secondary" />
              </div>
              <h3 className="text-3xl font-heading font-bold mb-4">E-Commerce Development</h3>
              <p className="text-slate-600 mb-8">
                Full-featured online stores, multi-vendor marketplaces, and quick-commerce apps. We have 25+ years of combined expertise.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm font-medium"><Star className="w-4 h-4 text-blue-500" /> DTC & B2C Stores</div>
                <div className="flex items-center gap-2 text-sm font-medium"><Star className="w-4 h-4 text-blue-500" /> B2B Portals</div>
                <div className="flex items-center gap-2 text-sm font-medium"><Star className="w-4 h-4 text-blue-500" /> Multi-Vendor Marketplaces</div>
                <div className="flex items-center gap-2 text-sm font-medium"><Star className="w-4 h-4 text-blue-500" /> Quick-Commerce Apps</div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-6">
                <h4 className="font-bold mb-2 text-sm uppercase text-slate-500">Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  {['Shopify', 'WooCommerce', 'Magento', 'Commerceflo.ai'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-slate-100 pt-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Investment</p>
                  <p className="text-2xl font-bold text-brand-secondary">₹60k - ₹25L+</p>
                </div>
                <button className="flex items-center gap-2 font-bold text-brand-secondary hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4"/>
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* SECTION 4: PROCESS */}
      <section id="process" className="py-20 px-4 md:px-8 bg-brand-dark text-white relative">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">How We Build</h2>
            <p className="text-slate-400">Transparent 7-step process from discovery to launch.</p>
          </div>

          <div className="relative">
            {/* Thread Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-primary/30 transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {PROCESS_STEPS.map((step, index) => (
                <div key={index} className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-brand-secondary rounded-full transform -translate-x-1.5 md:-translate-x-2 z-10 shadow-[0_0_10px_rgba(255,107,53,0.8)]"></div>

                  <div className="ml-12 md:ml-0 md:w-[45%]">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-brand-primary font-bold text-xl">{step.step}</span>
                         <span className="text-xs bg-brand-secondary/20 text-brand-secondary px-2 py-1 rounded">{step.duration}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                        {step.description.map((desc, i) => <li key={i}>{desc}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-[45%]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PRICING */}
      <section id="pricing" className="py-24 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <SectionHeading title="Transparent Pricing" subtitle="No hidden fees. Flexible payment terms." />
          
          {/* Website Pricing */}
          <h3 className="text-2xl font-bold mb-8 text-center text-slate-700">Website Design Packages</h3>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {WEB_PRICING.map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-3xl border ${plan.popular ? 'bg-white border-brand-primary shadow-2xl scale-105 z-10' : 'bg-white/50 border-slate-200'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}
                <h4 className="text-xl font-bold text-slate-800 mb-2">{plan.name}</h4>
                <div className="text-4xl font-extrabold text-slate-900 mb-6">{plan.price}</div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? 'bg-brand-primary text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}>
                  Select Plan
                </button>
              </div>
            ))}
          </div>

          {/* E-Commerce Pricing */}
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white mb-20">
            <h3 className="text-3xl font-bold mb-8 text-center">E-Commerce Development</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ECOM_PRICING.map((plan, i) => (
                <div key={i} className="bg-white/10 p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                  <h4 className="font-bold text-lg mb-2 text-brand-secondary">{plan.name}</h4>
                  <p className="text-2xl font-bold mb-4">{plan.price}</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{plan.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AMC Pricing Mini-Grid */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center text-slate-700">Annual Maintenance (AMC)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               {AMC_PRICING.map((amc, i) => (
                 <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                   <h5 className="font-bold text-slate-800">{amc.name}</h5>
                   <p className="text-brand-primary font-bold my-2">{amc.price}</p>
                   <p className="text-xs text-slate-500">{amc.details}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 & 7: WHY NEEDED & INDUSTRIES */}
      <section className="py-20 bg-slate-100">
         <div className="container mx-auto px-4">
            <div className="mb-20">
               <SectionHeading title="Industries We Serve" subtitle="Specialized expertise across 50+ sectors." />
               <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
                 {INDUSTRIES.map((ind, i) => (
                   <span key={i} className="px-5 py-2 bg-white rounded-full text-slate-700 font-medium shadow-sm border border-slate-200 hover:border-brand-primary cursor-default transition-colors">
                     {ind}
                   </span>
                 ))}
                 <span className="px-5 py-2 bg-slate-200 rounded-full text-slate-600 font-medium">+40 More</span>
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
               <div>
                 <h3 className="text-3xl font-heading font-bold mb-6">Why You Need a Professional Site in 2025</h3>
                 <div className="space-y-6">
                   {[
                     {t: "Customer Expectations", d: "71% research online. Mobile-first is the baseline."},
                     {t: "E-Commerce Growth", d: "Online retail grew 23%. Competitors are selling online."},
                     {t: "Visibility", d: "93% of experiences begin with a search engine."},
                     {t: "24/7 Sales", d: "Your website works while you sleep. No business hour limits."},
                     {t: "Credibility", d: "75% judge credibility by design. First impressions matter."}
                   ].map((item, i) => (
                     <div key={i} className="flex gap-4">
                       <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 font-bold text-brand-primary">{i+1}</div>
                       <div>
                         <h4 className="font-bold text-slate-800">{item.t}</h4>
                         <p className="text-sm text-slate-600">{item.d}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
               <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-slate-900">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/80 to-purple-900/80 z-10"></div>
                  <img src="https://picsum.photos/800/800?random=10" alt="Digital Growth" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8 text-center">
                     <h4 className="text-4xl font-bold mb-4">Ready to Grow?</h4>
                     <p className="mb-8 text-lg opacity-90">Join 500+ businesses who trust FactoryJet.</p>
                     <GradientButton className="bg-white text-brand-primary border-none">Get Started Now</GradientButton>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 8: PORTFOLIO */}
      <section id="portfolio" className="py-24 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <SectionHeading title="Featured Projects" subtitle="Real results for real businesses." />
          <div className="grid md:grid-cols-2 gap-8">
            {PORTFOLIO.map((study, i) => (
              <div key={i} className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all z-10"></div>
                <img src={study.image} alt={study.title} className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent text-white">
                  <div className="text-brand-secondary font-bold text-sm mb-2 uppercase tracking-wider">{study.client}</div>
                  <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                  <div className="text-3xl font-extrabold text-white mb-2">{study.metric}</div>
                  <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">{study.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all">
              View Full Portfolio <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 9: TESTIMONIALS */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
         <div className="container mx-auto max-w-6xl px-4">
           <SectionHeading title="Client Success Stories" />
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {TESTIMONIALS.map((t, i) => (
               <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
                 <div className="text-4xl text-brand-primary/20 absolute top-4 left-6">"</div>
                 <p className="text-slate-600 italic mb-6 relative z-10 pt-4">{t.text}</p>
                 <div>
                   <div className="font-bold text-slate-800">{t.author}</div>
                   <div className="text-sm text-brand-secondary font-medium">{t.role}</div>
                 </div>
               </div>
             ))}
           </div>
         </div>
      </section>

      {/* SECTION 10: FAQ */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-3xl">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <button onClick={() => toggleFaq(i)} className="w-full flex justify-between items-center p-5 text-left font-bold text-slate-800 focus:outline-none">
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: GETTING STARTED */}
      <section className="py-24 px-4 bg-brand-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
           <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">Ready to Build Your Digital Success Story?</h2>
           <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
             Whether you're launching your first website or scaling an e-commerce empire, we have the expertise to help you succeed.
           </p>
           
           <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
             <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
               <div className="text-2xl font-bold mb-2">01. Consult</div>
               <p className="text-blue-100 text-sm">Schedule a free 30-min call. No obligation.</p>
             </div>
             <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
               <div className="text-2xl font-bold mb-2">02. Proposal</div>
               <p className="text-blue-100 text-sm">Get a detailed quote and strategy plan.</p>
             </div>
             <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
               <div className="text-2xl font-bold mb-2">03. Build</div>
               <p className="text-blue-100 text-sm">We launch your site in 7-21 days.</p>
             </div>
           </div>

           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="px-8 py-4 bg-white text-brand-primary rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-xl">
               Schedule Free Consultation
             </button>
             <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
               Request Detailed Quote
             </button>
           </div>
        </div>
      </section>

      {/* SECTION 12: FOOTER */}
      <footer id="contact" className="bg-slate-950 text-slate-300 pt-20 pb-10 px-4 md:px-8 border-t border-slate-800">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                 <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">FJ</div>
                 <span className="text-2xl font-heading font-bold text-white">FactoryJet</span>
              </div>
              <p className="text-sm mb-6 leading-relaxed">
                Building world-class websites and e-commerce stores for businesses that are ready to grow. 500+ trusted clients.
              </p>
              <div className="flex gap-4">
                {/* Social Placeholders */}
                <div className="w-8 h-8 bg-slate-800 rounded-full hover:bg-brand-primary transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 bg-slate-800 rounded-full hover:bg-brand-primary transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 bg-slate-800 rounded-full hover:bg-brand-primary transition-colors cursor-pointer"></div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand-secondary shrink-0 mt-1" /> 
                  <div>
                    <div className="text-white">+91-96999-77699</div>
                    <div className="text-xs text-slate-500">Mon-Sat, 10am-7pm IST</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-secondary shrink-0 mt-1" /> 
                  <a href="mailto:hello@factoryjet.com" className="hover:text-white transition-colors">hello@factoryjet.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-secondary shrink-0 mt-1" /> 
                  <span>FactoryJet Digital Solutions<br/>India</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#services" className="hover:text-brand-primary transition-colors">Web Design</a></li>
                <li><a href="#services" className="hover:text-brand-primary transition-colors">E-Commerce</a></li>
                <li><a href="#portfolio" className="hover:text-brand-primary transition-colors">Portfolio</a></li>
                <li><a href="#pricing" className="hover:text-brand-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Client Login</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-brand-primary transition-colors">Web Design Guide</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">E-Com ROI Calculator</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">SEO Checklist 2025</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <div>&copy; 2025 FactoryJet Digital Solutions. All rights reserved.</div>
            <div>Last Updated: November 2024</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FactoryJetHome;