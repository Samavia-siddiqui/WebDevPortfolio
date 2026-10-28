import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import Hero from './sections/Hero.jsx';
import Services from './sections/Services.jsx';
import WhyMe from './sections/WhyMe.jsx';
import Work from './sections/Work.jsx';
import Process from './sections/Process.jsx';
import Pricing from './sections/Pricing.jsx';
import About from './sections/About.jsx';
import FAQ from './sections/FAQ.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';

export default function App() {
  const [selectedProjectType, setSelectedProjectType] = useState('');

  // Always start at top (Home) on page refresh / initial load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    window.scrollTo(0, 0);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark text-light font-sans selection:bg-accent selection:text-accent-ink">
      {/* Floating Pill Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* 2. Hero (Dark) */}
        <Hero />

        {/* 3. Services (Light) */}
        <Services onSelectService={(type) => setSelectedProjectType(type)} />

        {/* 4. Why Me (Light) */}
        <WhyMe />

        {/* 5. Selected Work (Light: 3D Circular Ring) */}
        <Work />

        {/* 6. Process (Dark: Sticky Scroll Timeline) */}
        <Process />

        {/* 7. Pricing (Light: PKR / USD) */}
        <Pricing onSelectPlan={(type) => setSelectedProjectType(type)} />

        {/* 8. About (Light: Portrait Avatar & Bio) */}
        <About />

        {/* 9. FAQ (Light: 2-Column Accordion) */}
        <FAQ />

        {/* 10. Contact (Light: Formspree & WhatsApp Tabs) */}
        <Contact preselectedType={selectedProjectType} />
      </main>

      {/* 11. Footer (Dark) */}
      <Footer />

      {/* Floating WhatsApp Action (Hides when Contact is in view) */}
      <FloatingWhatsApp />
    </div>
  );
}
