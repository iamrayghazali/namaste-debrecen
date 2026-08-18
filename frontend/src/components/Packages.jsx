import {useState} from 'react'
import {FiChevronDown, FiPhone} from 'react-icons/fi'
import {translations} from '../translations'
import spaIcon from '../assets/icons/spa.svg'
import Parallax from './Parallax'

// A single accordion row. Each item owns its own open/closed state, so any
// number of them can be expanded at once — this is intentionally not a
// single-open accordion.
function PackageItem({id, name, duration, description, note, defaultOpen = false}) {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div className="py-5 sm:py-6">
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                aria-expanded={isOpen}
                aria-controls={id}
            >
                <span className="text-lg sm:text-xl font-semibold text-dark-gray">
                    {name}
                </span>

                <span className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
                    <span className="text-sm sm:text-base text-dark-gray/70 whitespace-nowrap">
                        {duration}
                    </span>
                    <FiChevronDown
                        size={22}
                        className={`text-dark-gray transition-transform duration-300 ease-in-out ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </span>
            </button>

            {/* Height-animated via grid-template-rows so it eases open/closed
                without needing to measure content height in JS. */}
            <div
                id={id}
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{gridTemplateRows: isOpen ? '1fr' : '0fr'}}
            >
                <div className="overflow-hidden">
                    <p className="pt-4 text-sm sm:text-base text-dark-gray/80 leading-relaxed">
                        {description}
                    </p>
                    {note && (
                        <p className="mt-2 text-xs sm:text-sm italic text-dark-gray/60">
                            {note}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function Packages({language}) {
    const t = translations[language]

    return (
        <section id="packages" className="scroll-mt-20 relative overflow-hidden py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-light-green">
            {/* Faint oversized watermark, echoing the same motif used in About */}
            <img
                src={spaIcon}
                alt=""
                aria-hidden="true"
                className="absolute -top-10 -right-10 w-64 sm:w-96 opacity-[0.1] pointer-events-none select-none"
            />

            <div className="relative max-w-3xl mx-auto">
                {/* Header */}
                <Parallax speed={0.12} max={16} className="text-center mb-12 sm:mb-16">
                    <p className="text-xs sm:text-sm font-light uppercase tracking-[0.35em] text-dark-gray/80 mb-3">
                        {t.packages.eyebrow}
                    </p>

                    <h2 className="font-kalnia text-3xl sm:text-4xl md:text-5xl font-semibold text-dark-gray">
                        {t.packages.title}
                    </h2>

                    <div className="w-10 h-px bg-dark-gray/30 mx-auto my-5 sm:my-6"/>

                    <p className="text-sm sm:text-base text-dark-gray/80 max-w-md mx-auto mb-8">
                        {t.packages.description}
                    </p>

                    <a
                        href="tel:+36703781026"
                        className="font-kalnia inline-flex items-center gap-2 px-6 py-3 bg-dark-gray hover:opacity-90 text-light-gray font-semibold rounded-[10px] transition-opacity duration-300 shadow-lg shadow-dark-gray/10"
                    >
                        <FiPhone size={20}/>
                        {t.packages.button}
                    </a>
                </Parallax>

                {/* Accordion list */}
                <Parallax speed={0.06} max={10} className="divide-y divide-dark-gray/15 border-t border-b border-dark-gray/15">
                    {t.packages.items.map((pkg, i) => (
                        <PackageItem key={i} id={`package-${i}`} defaultOpen={i === 0} {...pkg} />
                    ))}
                </Parallax>
            </div>
        </section>
    )
}
