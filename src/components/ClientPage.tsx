'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Certifications from '@/components/sections/Certifications';
import Projects from '@/components/sections/Projects';
import Journey from '@/components/sections/Journey';
import Contact from '@/components/sections/Contact';

export default function ClientPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Certifications />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
