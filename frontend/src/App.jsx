import {useEffect, useState} from 'react'
import Navbar from './components/Navbar'
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Packages from "./components/Packages.jsx";
import GiftCard from "./components/GiftCard.jsx";
import Contact from "./components/Contact.jsx";
import {translations} from './translations'

export default function App() {
    const [language, setLanguage] = useState('hu')

    useEffect(() => {
        const t = translations[language]
        document.title = `${t.hero.titleMain} ${t.hero.titleSub}`
    }, [language])

    return (
        <div className="min-h-screen bg-bg-primary">
            <Navbar language={language} setLanguage={setLanguage}/>
            {/* Placeholder sections */}
            <Hero language={language}/>
            <About language={language}/>
            <Packages language={language}/>
            <GiftCard language={language}/>
            <Contact language={language}/>
        </div>
    )
}