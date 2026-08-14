import {translations} from '../translations'
import aboutIMG1 from '../assets/images/namaste1.jpg'
import aboutIMG2 from '../assets/images/namaste2.jpg'
import spaIcon from '../assets/icons/spa.svg'
import buddhismIcon from '../assets/icons/buddhism.svg'
import Parallax from './Parallax'

function renderWithEmphasis(text) {
    return text.split('**').map((part, i) =>
        i % 2 === 1
            ? <strong key={i} className="font-bold text-dark-gray">{part}</strong>
            : part
    )
}

export default function About({language}) {
    const t = translations[language]

    return (
        <section id="about" className="scroll-mt-20 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-dark-brown">
            <div className="max-w-6xl mx-auto">
                <Parallax speed={0.12} max={16}>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-gray mb-6 sm:mb-8 text-center lg:text-left">
                        {t.about.title}
                    </h2>
                </Parallax>

                {/* 2x2 grid: paragraph left, image right, on both rows */}
                <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 lg:gap-x-12 gap-y-8 sm:gap-y-12 items-center">
                    {/* Paragraph 1 — faint spa icon watermark filling the block behind the text */}
                    <Parallax speed={0.1} max={14} className="relative">
                        <img
                            src={spaIcon}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 z-0 w-full h-full object-contain opacity-[0.08] pointer-events-none select-none"
                        />
                        <p className="relative z-10 text-xs sm:text-base lg:text-lg text-dark-gray leading-relaxed">
                            {renderWithEmphasis(t.about.paragraph1)}
                        </p>
                    </Parallax>

                    <Parallax speed={0.08} max={14}>
                        <img
                            src={aboutIMG1}
                            alt="Spa treatment"
                            className="w-full h-40 sm:h-64 lg:h-96 object-cover rounded-lg shadow-lg"
                        />
                    </Parallax>

                    {/* Second image on the left, paragraph 2 on the right */}
                    <Parallax speed={0.08} max={14}>
                        <img
                            src={aboutIMG2}
                            alt="Namaste studio"
                            className="w-full h-40 sm:h-64 lg:h-96 object-cover rounded-lg shadow-lg"
                        />
                    </Parallax>

                    {/* Paragraph 2 — faint buddhism icon watermark filling the block behind the text */}
                    <Parallax speed={0.1} max={14} className="relative">
                        <img
                            src={buddhismIcon}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 z-0 w-full h-full object-contain opacity-[0.08] pointer-events-none select-none"
                        />
                        <p className="relative z-10 text-xs sm:text-base lg:text-lg text-dark-gray leading-relaxed">
                            {renderWithEmphasis(t.about.paragraph2)}
                        </p>
                    </Parallax>
                </div>
            </div>
        </section>
    )
}
