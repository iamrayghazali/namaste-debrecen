import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";

export default function App() {
  const [language, setLanguage] = useState('en')

  return (
      <div className="min-h-screen bg-bg-primary">
        <Navbar language={language} setLanguage={setLanguage} />

        {/* Placeholder sections */}
          <Hero language={language} />
          <About language={language} />

        <section id="packages" className="h-screen flex items-center justify-center bg-bg-primary">
          <h1 className="text-4xl font-bold text-eucalyptus-light">Packages</h1>
        </section>
        <section id="giftcard" className="h-screen flex items-center justify-center bg-bg-secondary">
          <h1 className="text-4xl font-bold text-eucalyptus-light">Gift Card</h1>
        </section>
        <section id="contact" className="h-screen flex items-center justify-center bg-bg-primary">
          <h1 className="text-4xl font-bold text-eucalyptus-light">Contact</h1>
        </section>
      </div>
  )
}