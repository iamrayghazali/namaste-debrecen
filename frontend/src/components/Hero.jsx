import {translations} from '../translations'
import {FiPhone} from 'react-icons/fi'
import namasteHero from '../assets/images/herobg.webp'
import Parallax from './Parallax'
import Reveal from './Reveal'

export default function Hero({language}) {
    const t = translations[language]

    return (
        <section id="home" className="scroll-mt-20 relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image — gently fades in on first load rather than
                appearing all at once */}
            <Reveal distance={0} duration={1400} className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${namasteHero})`,
                        filter: 'brightness(0.5)',
                    }}
                />
            </Reveal>

            {/* Content — floats above the image with a subtle parallax drift,
                and eases in on first load with a slight upward stagger */}
            <Parallax speed={0.15} max={16} className="relative z-10 text-center px-4">
                <Reveal delay={150}>
                    <h1 className="font-kalnia text-5xl sm:text-7xl md:text-8xl font-medium text-white tracking-wide">
                        {t.hero.titleMain}
                    </h1>
                </Reveal>

                <Reveal delay={350}>
                    <div className="w-10 h-px bg-light-gray/40 mx-auto my-5 sm:my-6"/>

                    <p className="text-xs sm:text-sm md:text-base font-light uppercase tracking-[0.35em] text-light-gray/90 mb-10 sm:mb-12">
                        {t.hero.titleSub}
                    </p>
                </Reveal>

                <Reveal delay={550}>
                    <a
                        href="tel:+36703781026"
                        className="font-kalnia inline-flex items-center gap-2 px-4 py-3 bg-light-green hover:opacity-90 text-dark-gray  rounded-[10px] transition-opacity duration-300"
                    >
                        <FiPhone size={20}/>
                        {t.hero.button}
                    </a>
                </Reveal>
            </Parallax>
        </section>
    )
}