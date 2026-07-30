import { translations } from '../translations'

export default function Hero({ language }) {
    const t = translations[language]

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1544161515-81290573da8b?w=1200&h=1200&fit=crop)',
                    filter: 'brightness(0.6)',
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <h1 className="text-6xl md:text-8xl font-bold text-bg-primary mb-6 tracking-wider">
                    Namaste
                </h1>

                <a
                    href="#contact"
                    className="inline-block px-8 py-3 bg-cta hover:opacity-90 text-bg-primary font-semibold rounded transition-opacity duration-300"
                    >
                    {t.hero.button}
                </a>
            </div>
        </section>
    )
}