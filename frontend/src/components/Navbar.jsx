import {useEffect, useRef, useState} from 'react'
import {FiMenu, FiX} from 'react-icons/fi'
import {translations} from '../translations'
import logoWhite from '../assets/logo/namaste-white-logo.png'

const FLAGS = {
    en: '🇬🇧',
    hu: '🇭🇺',
}

// Fades from opaque at the top to fully transparent at the bottom — applied
// to the strip beneath the bar so the blur melts into the page instead of
// ending in a hard edge.
const EDGE_FADE = 'linear-gradient(to bottom, black 0%, transparent 100%)'

export default function Navbar({language, setLanguage}) {
    const [isOpen, setIsOpen] = useState(false)
    const navRef = useRef(null)
    const t = translations[language]

    const navItems = [
        {label: t.nav.home, href: '#home'},
        {label: t.nav.about, href: '#about'},
        {label: t.nav.packages, href: '#packages'},
        {label: t.nav.giftCard, href: '#giftcard'},
        {label: t.nav.contact, href: '#contact'},
    ]

    const targetLanguage = language === 'en' ? 'hu' : 'en'

    // Standard overlay behavior: close on Escape or an outside click, and
    // lock background scroll while the menu is open.
    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsOpen(false)
        }
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) setIsOpen(false)
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('mousedown', handleClickOutside)
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('mousedown', handleClickOutside)
            document.body.style.overflow = previousOverflow
        }
    }, [isOpen])

    return (
        <nav ref={navRef} className="sticky top-0 z-50">
            {/* Solid bar */}
            <div className="relative bg-light-gray">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-18">
                        {/* Logo */}
                        <a href="#home" className="flex-shrink-0 flex items-center">
                            <img src={logoWhite} alt="Namaste" className="h-16 sm:h-15 w-auto"/>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm font-medium text-dark-gray hover:opacity-70 transition-opacity duration-200"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {/* Language Switcher + Hamburger */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setLanguage(targetLanguage)}
                                className="flex items-center gap-2 px-3 py-2 rounded bg-dark-gray/5 text-dark-gray hover:opacity-70 transition-opacity duration-200 text-sm font-medium cursor-pointer"
                            >
                                {language.toUpperCase()}
                                <span className="w-7 h-5 flex items-center justify-center text-xl leading-none rounded-[20px] overflow-hidden">
                                    {FLAGS[language]}
                                </span>
                            </button>

                            {/* Hamburger Menu */}
                            <button
                                onClick={() => setIsOpen((open) => !open)}
                                className="md:hidden flex items-center justify-center w-10 h-10 text-dark-gray cursor-pointer"
                                aria-label="Toggle menu"
                                aria-expanded={isOpen}
                                aria-controls="mobile-menu"
                            >
                                {isOpen ? <FiX size={22}/> : <FiMenu size={22}/>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Soft blurred edge beneath the bar, melting into the page instead
                of ending with a hard line. */}
            <div
                className="absolute top-full inset-x-0 h-10 backdrop-blur-md pointer-events-none"
                style={{maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE}}
            />

            {/* Mobile Navigation — an absolutely positioned overlay so it never
                pushes page content (like the Hero) down. Always mounted; only
                opacity + transform toggle, so it eases in/out instead of
                popping in and out. */}
            <div
                id="mobile-menu"
                className={`md:hidden absolute top-full inset-x-0 origin-top bg-light-gray shadow-lg transition-[opacity,transform] duration-200 ease-out ${
                    isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
                aria-hidden={!isOpen}
            >
                <div className="px-4 py-4 space-y-1">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            tabIndex={isOpen ? 0 : -1}
                            className="block px-3 py-3 rounded text-dark-gray hover:bg-dark-gray/5 transition-colors duration-200"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    )
}
