import {translations} from '../translations'
import giftcardImg from '../assets/images/giftcard.png'
import Parallax from './Parallax'

export default function GiftCard({language}) {
    const t = translations[language]

    return (
        <section id="giftcard" className="scroll-mt-20 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-light-gray">
            <div className="max-w-3xl mx-auto">
                {/* Header — title + description */}
                <Parallax speed={0.12} max={16} className="text-center mb-10 sm:mb-14">
                    <h2 className="font-kalnia text-3xl sm:text-4xl md:text-5xl font-semibold text-dark-gray">
                        {t.giftCard.title}
                    </h2>

                    <div className="w-10 h-px bg-dark-gray/30 mx-auto my-5 sm:my-6"/>

                    <p className="text-sm sm:text-base text-dark-gray/80 max-w-md mx-auto">
                        {t.giftCard.description}
                    </p>
                </Parallax>

                {/* Centered image */}
                <Parallax speed={0.08} max={14} className="flex justify-center">
                    <img
                        src={giftcardImg}
                        alt={t.giftCard.title}
                        className="w-full max-w-md rounded-lg shadow-lg"
                    />
                </Parallax>
            </div>
        </section>
    )
}
