import {useEffect, useRef, useState} from 'react'
import {FiMapPin, FiClock, FiPhone, FiCopy, FiInstagram, FiFacebook, FiMail} from 'react-icons/fi'
import {translations} from '../translations'
import Parallax from './Parallax'
import googleMapsIcon from '../assets/icons/google-maps.svg'
import mapImg from '../assets/images/map.webp'

const MAPS_URL = 'https://maps.app.goo.gl/DvzDGRJZHKvEJdfc7'
const PHONE_NUMBER = '+36703781026'

const SOCIAL_LINKS = [
    {Icon: FiInstagram, href: 'https://www.instagram.com/namaste.arcmasszazs/', label: 'Instagram'},
    {Icon: FiFacebook, href: 'https://www.facebook.com/people/Namaste-Arcmassz%C3%A1zs-Studio/61589469282707/', label: 'Facebook'},
    {Icon: FiMail, href: 'mailto:barbibode@gmail.com', label: 'Email'},
]

export default function Contact({language}) {
    const t = translations[language]
    const [copied, setCopied] = useState(false)
    const copyTimeoutRef = useRef(null)

    useEffect(() => () => clearTimeout(copyTimeoutRef.current), [])

    const copyAddress = async () => {
        const text = t.contact.address

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text)
            } else {
                // Fallback for iOS Safari / non-HTTPS contexts where the async
                // Clipboard API is unavailable
                const textarea = document.createElement('textarea')
                textarea.value = text
                textarea.setAttribute('readonly', '')
                textarea.style.position = 'fixed'
                textarea.style.top = '-1000px'
                textarea.style.opacity = '0'
                document.body.appendChild(textarea)
                textarea.focus()
                textarea.select()
                document.execCommand('copy')
                document.body.removeChild(textarea)
            }
        } catch {
            return
        }

        setCopied(true)
        clearTimeout(copyTimeoutRef.current)
        copyTimeoutRef.current = setTimeout(() => setCopied(false), 2200)
    }

    return (
        <section id="contact" className="scroll-mt-20 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-dark-brown">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <Parallax speed={0.12} max={16} className="text-center mb-6 sm:mb-8">
                    <h2 className="font-kalnia text-3xl sm:text-4xl md:text-5xl font-semibold text-dark-gray">
                        {t.contact.title}
                    </h2>
                    <div className="w-10 h-px bg-dark-gray/30 mx-auto my-5 sm:my-6"/>
                    {/* Opening hours + call button stacked — flex-col forces this regardless
                        of viewport width, since two inline-flex elements would otherwise sit
                        side by side whenever there's room (desktop) and only wrap on narrow
                        (mobile) screens */}
                    <div className="flex flex-col items-center gap-5 sm:gap-6">
                        {/* Opening hours — booking is by appointment, not fixed daily slots */}
                        <div className="inline-flex items-center gap-2 text-dark-gray">
                            <FiClock size={18} className="flex-shrink-0"/>
                            <span className="text-sm sm:text-base">{t.contact.hours}</span>
                        </div>

                        {/* Call button — same style used in Hero/Packages */}
                        <a
                            href={`tel:${PHONE_NUMBER}`}
                            className="font-kalnia inline-flex items-center gap-2 px-4 py-2.5 bg-dark-gray hover:opacity-90 text-light-gray text-sm font-semibold rounded-[10px] transition-opacity duration-300"
                        >
                            <FiPhone size={18}/>
                            {t.contact.callButton}
                        </a>
                    </div>

                    {/* Social media row */}
                    <div className="flex items-center justify-center gap-4 mt-5 sm:mt-6">
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
                    </div>
                </Parallax>

                {/* Card: info pane left, map pane right — one unified surface instead of
                    two blocks floating loosely on the section background */}
                <Parallax speed={0.06} max={10}>
                    <div className="grid lg:grid-cols-2 lg:min-h-[420px] rounded-2xl overflow-hidden shadow-xl shadow-dark-gray/20 bg-light-gray">
                        {/* Info pane */}
                        <div className="flex flex-col items-center justify-center gap-5 p-8 sm:p-10 lg:p-12 text-center">
                            {/* Pin + street name */}
                            <span className="inline-flex items-center gap-2 text-dark-gray">
                                <FiMapPin size={20} className="flex-shrink-0"/>
                                <span className="text-sm sm:text-base font-bold">{t.contact.address}</span>
                            </span>

                            {/* "Open in Google Maps" + "Copy address" actions */}
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={copyAddress}
                                    className="font-kalnia inline-flex items-center gap-2 px-4 py-2.5 border border-dark-gray/30 hover:bg-dark-gray hover:text-light-gray text-dark-gray text-sm font-semibold rounded-[10px] transition-colors duration-300"
                                >
                                    <FiCopy size={18} className="flex-shrink-0"/>
                                    {t.contact.copyButton}
                                </button>

                                <a
                                    href={MAPS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-kalnia inline-flex items-center gap-2 px-4 py-2.5 bg-dark-gray hover:opacity-90 text-light-gray text-sm font-semibold rounded-[10px] transition-opacity duration-300"
                                >
                                    <img src={googleMapsIcon} alt="" className="w-[18px] h-[18px] flex-shrink-0"/>
                                    {t.contact.mapsButton}
                                </a>
                            </div>
                        </div>

                        {/* Map pane */}
                        <img
                            src={mapImg}
                            alt={t.contact.address}
                            className="w-full h-64 lg:h-full object-cover"
                        />
                    </div>
                </Parallax>
            </div>

            {/* Copy confirmation toast — the text node itself must change (not just
                CSS visibility) for aria-live to reliably announce it to screen readers */}
            <div
                role="status"
                aria-live="polite"
                className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-light-green text-dark-gray text-sm font-semibold rounded-[10px] shadow-lg shadow-dark-gray/30 transition-all duration-300 ${
                    copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
            >
                {copied ? t.contact.addressCopied : ''}
            </div>
        </section>
    )
}
