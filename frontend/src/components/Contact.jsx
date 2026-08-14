import {FiMapPin, FiClock, FiInstagram, FiFacebook, FiMail} from 'react-icons/fi'
import {SiGooglemaps} from 'react-icons/si'
import {translations} from '../translations'
import Parallax from './Parallax'

const SOCIAL_LINKS = [
    {Icon: FiInstagram, href: 'https://instagram.com/namaste.debrecen', label: 'Instagram'},
    {Icon: FiFacebook, href: 'https://facebook.com/namaste.debrecen', label: 'Facebook'},
    {Icon: FiMail, href: 'mailto:info@namaste-debrecen.hu', label: 'Email'},
]

export default function Contact({language}) {
    const t = translations[language]
    const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.contact.address)}`

    return (
        <section id="contact" className="scroll-mt-20 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-dark-brown">
            <div className="max-w-3xl mx-auto text-center">
                <Parallax speed={0.12} max={16}>
                    <h2 className="font-kalnia text-3xl sm:text-4xl md:text-5xl font-semibold text-dark-gray mb-8 sm:mb-10">
                        {t.contact.title}
                    </h2>

                    {/* Pin + street name + primary "open in Google Maps" button */}
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                        <span className="inline-flex items-center gap-2 text-dark-gray">
                            <FiMapPin size={20} className="flex-shrink-0"/>
                            <span className="text-sm sm:text-base">{t.contact.address}</span>
                        </span>

                        <a
                            href={mapsHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-kalnia inline-flex items-center gap-2 px-4 py-2.5 bg-dark-gray hover:opacity-90 text-light-gray text-sm font-semibold rounded-[10px] transition-opacity duration-300 shadow-lg shadow-dark-gray/10"
                        >
                            <SiGooglemaps size={18} className="text-[#4285F4]"/>
                            {t.contact.mapsButton}
                        </a>
                    </div>

                    {/* Opening hours — booking is by appointment, not fixed daily slots */}
                    <div className="inline-flex items-center gap-2 text-dark-gray mt-4 sm:mt-5">
                        <FiClock size={18} className="flex-shrink-0"/>
                        <span className="text-sm sm:text-base">{t.contact.hours}</span>
                    </div>
                </Parallax>

                {/* Social media row */}
                <Parallax speed={0.1} max={14} className="flex items-center justify-center gap-4 mt-10 sm:mt-12">
                    {SOCIAL_LINKS.map(({Icon, href, label}) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="w-11 h-11 flex items-center justify-center rounded-full bg-dark-gray text-light-gray hover:opacity-90 transition-opacity duration-300"
                        >
                            <Icon size={20}/>
                        </a>
                    ))}
                </Parallax>

                {/* Map — placeholder until a Google Maps screenshot is provided */}
                <Parallax speed={0.06} max={10} className="flex justify-center mt-10 sm:mt-12">
                    <div className="w-full max-w-2xl h-64 sm:h-80 rounded-lg shadow-lg bg-light-gray/40 border border-dark-gray/15 flex flex-col items-center justify-center gap-2 text-dark-gray/60">
                        <FiMapPin size={28}/>
                        <span className="text-xs sm:text-sm uppercase tracking-[0.2em]">Map placeholder</span>
                    </div>
                </Parallax>
            </div>
        </section>
    )
}
