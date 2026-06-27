import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Modules from './components/Modules';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    });

    reveals.forEach(reveal => {
      observer.observe(reveal);
    });

    return () => {
      reveals.forEach(reveal => {
        observer.unobserve(reveal);
      });
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Modules />
      <CTA />
      <Footer />
    </>
  );
}

export default App;
