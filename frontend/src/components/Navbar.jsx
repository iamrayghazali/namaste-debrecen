import { useState } from 'react'
import { translations } from '../translations'

export default function Navbar({ language, setLanguage }) {
    const [isOpen, setIsOpen] = useState(false)
    const t = translations[language]

    const navItems = [
        { label: t.nav.home, href: '#home' },
        { label: t.nav.about, href: '#about' },
        { label: t.nav.packages, href: '#packages' },
        { label: t.nav.giftCard, href: '#giftcard' },
        { label: t.nav.contact, href: '#contact' },
    ]

    return (
        <nav className="sticky top-0 z-50 bg-bg-primary border-b border-bg-secondary shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#home" className="text-2xl font-bold text-eucalyptus-light">
                            Spa
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                            key={item.href}
                            href={item.href}
                            className="text-text-primary hover:text-eucalyptus-light transition-colors duration-200"
                            >
                        {item.label}
                            </a>
                            ))}
                    </div>

                    {/* Language Switcher + Hamburger */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'hu' : 'en')}
                            className="px-3 py-1 rounded bg-bg-secondary text-text-primary hover:bg-eucalyptus-light hover:text-bg-primary transition-all duration-200 text-sm font-medium"
                        >
                            {language === 'en' ? 'HU' : 'EN'}
                        </button>

                        {/* Hamburger Menu */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden flex flex-col gap-1.5 p-2"
                            aria-label="Toggle menu"
                        >
              <span
                  className={`w-6 h-0.5 bg-text-primary transition-all duration-300 transform ${
                      isOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
              />
                            <span
                                className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${
                                    isOpen ? 'opacity-0' : ''
                                }`}
                            />
                            <span
                                className={`w-6 h-0.5 bg-text-primary transition-all duration-300 transform ${
                                    isOpen ? '-rotate-45 -translate-y-2' : ''
                                }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden border-t border-bg-secondary">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="block px-3 py-2 rounded text-text-primary hover:bg-bg-secondary hover:text-eucalyptus-light transition-colors duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </a>
                                ))}
                        </div>
                    </div>
                )}
</div>
</nav>
)
}