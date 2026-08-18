import {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {FiMenu, FiX} from 'react-icons/fi'
import {translations} from '../translations'
import logoWhite from '../assets/logo/namaste-white-logo.png'
import Reveal from './Reveal'

const FLAGS = {
    en: '🇬🇧',
    hu: '🇭🇺',
}

const SECTION_IDS = ['home', 'about', 'packages', 'giftcard', 'contact']

const NAV_OFFSET = 110

const EDGE_FADE = 'linear-gradient(to bottom, black 0%, transparent 100%)'

export default function Navbar({language, setLanguage}) {
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState(SECTION_IDS[0])
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

    // Sliding highlights behind the active link — one for the desktop row
    // (slides horizontally), one for the mobile list (slides vertically).
    const desktopNavRef = useRef(null)
    const mobileNavRef = useRef(null)
    const desktopLinkRefs = useRef({})
    const mobileLinkRefs = useRef({})
    const [desktopIndicator, setDesktopIndicator] = useState({left: 0, width: 0})
    const [mobileIndicator, setMobileIndicator] = useState({top: 0, height: 0})

    useEffect(() => {
        let ticking = false

        const update = () => {
            let current = SECTION_IDS[0]
            for (const id of SECTION_IDS) {
                const el = document.getElementById(id)
                if (!el) continue
                if (el.getBoundingClientRect().top <= NAV_OFFSET) {
                    current = id
                } else {
                    break
                }
            }
            setActiveSection(current)
        }

        const handleScroll = () => {
            if (ticking) return
            ticking = true
            requestAnimationFrame(() => {
                update()
                ticking = false
            })
        }

        update()
        window.addEventListener('scroll', handleScroll, {passive: true})
        window.addEventListener('resize', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [])

    useLayoutEffect(() => {
        const updateIndicators = () => {
            const desktopEl = desktopLinkRefs.current[`#${activeSection}`]
            if (desktopEl) {
                setDesktopIndicator({left: desktopEl.offsetLeft, width: desktopEl.offsetWidth})
            }
            const mobileEl = mobileLinkRefs.current[`#${activeSection}`]
            if (mobileEl) {
                setMobileIndicator({top: mobileEl.offsetTop, height: mobileEl.offsetHeight})
            }
        }

        updateIndicators()
        window.addEventListener('resize', updateIndicators)
        return () => window.removeEventListener('resize', updateIndicators)
    }, [activeSection, language])


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

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <nav ref={navRef} className="sticky top-0 z-50">
            {/* Solid bar — eases down into place on first load instead of
                just being there */}
            <Reveal duration={600} distance={-12} className="relative bg-light-gray">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-18">
                        {/* Logo */}
                        <a href="#home" className="flex-shrink-0 flex items-center">
                            <img src={logoWhite} alt="Namaste" className="h-16 sm:h-15 w-auto"/>
                        </a>

                        {/* Desktop Navigation */}
                        <div ref={desktopNavRef} className="hidden md:flex relative items-center gap-2">
                            {/* Sliding highlight behind the active link */}
                            <span
                                className="absolute top-1/2 -translate-y-1/2 h-9 rounded-full bg-dark-gray/10 transition-all duration-500 ease-out pointer-events-none"
                                style={{left: desktopIndicator.left, width: desktopIndicator.width}}
                            />
                            {navItems.map((item) => {
                                const isActive = activeSection === item.href.slice(1)
                                return (
                                    <a
                                        key={item.href}
                                        ref={(el) => {
                                            desktopLinkRefs.current[item.href] = el
                                        }}
                                        href={item.href}
                                        className={`relative z-10 px-3 py-1.5 rounded-full text-sm transition-colors duration-200 ${
                                            isActive
                                                ? 'text-dark-gray font-bold'
                                                : 'text-dark-gray font-medium hover:opacity-70'
                                        }`}
                                    >
                                        {item.label}
                                    </a>
                                )
                            })}
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
            </Reveal>

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
                <div ref={mobileNavRef} className="relative px-4 py-4 space-y-1">
                    {/* Sliding highlight behind the active link */}
                    <span
                        className="absolute left-4 right-4 rounded bg-dark-gray/10 transition-all duration-500 ease-out pointer-events-none"
                        style={{top: mobileIndicator.top, height: mobileIndicator.height}}
                    />
                    {navItems.map((item) => {
                        const isActive = activeSection === item.href.slice(1)
                        return (
                            <a
                                key={item.href}
                                ref={(el) => {
                                    mobileLinkRefs.current[item.href] = el
                                }}
                                href={item.href}
                                tabIndex={isOpen ? 0 : -1}
                                className={`relative z-10 block px-3 py-3 rounded transition-colors duration-200 ${
                                    isActive ? 'text-dark-gray font-bold' : 'text-dark-gray font-normal hover:bg-dark-gray/5'
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </a>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}
