'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { RevealStyles } from '@/components/ui/Layout';
import Hero from '@/components/sections/Hero';
import Statement from '@/components/sections/Statement';
import WorkIndex from '@/components/sections/WorkIndex';
import Cases from '@/components/sections/Cases';
import Software from '@/components/sections/Software';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';

// Dark and light sections alternate; each light or dark block slides over the
// previous one. Order: who I am, the work, the detail, the person, the proof, contact.
export default function ClientPage() {
  return (
    <>
      <RevealStyles />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Statement />
        <WorkIndex />
        <Cases />
        <Software />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
