import {useEffect, useState} from 'react'
import Navbar from './components/Navbar'
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Packages from "./components/Packages.jsx";
import GiftCard from "./components/GiftCard.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import {translations} from './translations'

export default function App() {
    const [language, setLanguage] = useState('hu')

    useEffect(() => {
        const t = translations[language]
        document.title = `${t.hero.titleMain} ${t.hero.titleSub}`
        // Keep <html lang> in sync with the active language — it's what
        // screen readers and translation tools use to pick a voice/dictionary,
        // so it has to track the real content, not just match the static
        // index.html value the page happened to load with.
        document.documentElement.lang = language
    }, [language])

    return (
        <div className="min-h-screen bg-bg-primary">
            <Navbar language={language} setLanguage={setLanguage}/>
            <Hero language={language}/>
            <About language={language}/>
            <Packages language={language}/>
            <GiftCard language={language}/>
            <Contact language={language}/>
            <Footer language={language}/>
        </div>
    )
}